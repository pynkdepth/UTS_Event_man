import type { Request, Response } from "express"
import multer from "multer"
import { prisma } from "../utils/prisma"
import { uploadBuffer } from "../services/cloudinary"
import type { Express } from "express"

const upload = multer({ storage: multer.memoryStorage() })

const cpUpload = upload.fields([
  { name: "memberCard", maxCount: 1 },
  { name: "payment", maxCount: 1 },
  { name: "igFollow", maxCount: 1 },
])

export const registComp = [
  cpUpload,
  async (req: Request, res: Response): Promise<void> => {
    try {
      const {
        competition,
        participantType,
        degree,
        email,
        fullName,
        teamName,
        school,
        leaderName,
        whatsapp,
        teamMembers,
      } = req.body

      const files = req.files as {
        [fieldname: string]: Express.Multer.File[]
      }

      /* upload buffer → Cloudinary */
      const memberCardUrl = (await uploadBuffer(files.memberCard[0].buffer)).secure_url
      const paymentUrl = (await uploadBuffer(files.payment[0].buffer)).secure_url
      const igFollowUrl = (await uploadBuffer(files.igFollow[0].buffer)).secure_url

      if (participantType === "TEAM") {
        const parsedMembers = Array.isArray(teamMembers) ? teamMembers : JSON.parse(teamMembers || "[]")

        if (parsedMembers.length > 3) {
          res.status(400).json({
            message: "Team members cannot exceed 3 (maximum 4 with leader)",
          })
          return
        }
      }

      const parsedTeamMembers =
        participantType === "TEAM" ? (Array.isArray(teamMembers) ? teamMembers : JSON.parse(teamMembers || "[]")) : []

      const data = await prisma.competitionRegistration.create({
        data: {
          competition,
          participantType,
          degree,
          email,
          fullName: participantType === "INDIVIDU" ? fullName : null,
          teamName: participantType === "TEAM" ? teamName : null,
          school,
          leaderName: participantType === "TEAM" ? leaderName : null,
          whatsapp,
          memberCardUrl,
          paymentUrl,
          igFollowUrl,
          teamMembers: {
            createMany: {
              data: parsedTeamMembers.map((member: any) => ({
                name: member.name,
              })),
            },
          },
        },
        include: {
          teamMembers: true,
        },
      })
      res.json({ message: "Registration success", data })
    } catch (err: any) {
      res.status(500).json({ message: err.message })
    }
  },
]

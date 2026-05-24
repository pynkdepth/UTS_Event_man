import type { Request, Response } from "express";
import { prisma } from "../utils/prisma";
import { CompetitionType } from "@prisma/client";

export const listParticipants = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { competition, degree, participantType } = req.query;
  const filters: any = {};
  if (competition) filters.competition = competition as CompetitionType; // <-- cast
  if (degree) filters.degree = degree;
  if (participantType) filters.participantType = participantType;

  const list = await prisma.competitionRegistration.findMany({
    where: filters,
    orderBy: { createdAt: "desc" },
  });
  res.json(list);
};

export const listSeminar = async (_: Request, res: Response): Promise<void> => {
  try {
    const data = await prisma.seminarRegistration.findMany({
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        createdAt: true,
        email: true,
        fullName: true,
        category: true,
        whatsapp: true,
        institution: true,
        idNumber: true,
        idCardUrl: true,
        paymentUrl: true,
        igFollowUrl: true,
        verified: true, // Status verifikasi
      },
    });
    res.json(data);
  } catch (error: any) {
    console.error("List seminar error:", error.message);
    res.status(500).json({ message: "Failed to fetch seminar registrations" });
  }
};

export const listWorkshop = async (_: Request, res: Response): Promise<void> => {
  try {
    const data = await prisma.workshopRegistration.findMany({
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        createdAt: true,
        email: true,
        fullName: true,
        workshop: true,
        category: true,
        whatsapp: true,
        institution: true,
        idNumber: true,
        idCardUrl: true,
        paymentUrl: true,
        igFollowUrl: true,
        verified: true,
      },
    });
    res.json(data);
  } catch (error: any) {
    console.error("List workshop error:", error.message);
    res.status(500).json({ message: "Failed to fetch workshop registrations" });
  }
};

export const listTalkshow = async (_: Request, res: Response): Promise<void> => {
  try {
    const data = await prisma.talkshowRegistration.findMany({
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        createdAt: true,
        email: true,
        fullName: true,
        category: true,
        whatsapp: true,
        institution: true,
        idNumber: true,
        idCardUrl: true,
        paymentUrl: true,
        igFollowUrl: true,
        verified: true,
      },
    });
    res.json(data);
  } catch (error: any) {
    console.error("List talkshow error:", error.message);
    res.status(500).json({ message: "Failed to fetch talkshow registrations" });
  }
};

export const listCompetition = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { competition } = req.params;
  const competitionEnum = competition as CompetitionType;

  const list = await prisma.competitionRegistration.findMany({
    where: { competition: competitionEnum },
    orderBy: { createdAt: "desc" },
  });

  const individual = list
    .filter((r) => r.participantType === "INDIVIDU")
    .map((r) => ({
      id: r.id,
      fullName: r.fullName!,
      leaderEmail: r.email,
      leaderPhone: r.whatsapp,
      school: r.school || "-",
      registrationType: r.participantType,
      paymentMethod: "Transfer",
      memberCard: r.memberCardUrl,
      paymentUrl: r.paymentUrl,
      igFollow: r.igFollowUrl,
    }));

  const team = list
    .filter((r) => r.participantType === "TEAM")
    .map((r) => ({
      id: r.id,
      teamName: r.teamName!,
      leaderName: r.leaderName!,
      leaderEmail: r.email,
      leaderPhone: r.whatsapp,
      school: r.school || "-",
      registrationType: r.participantType,
      paymentMethod: "Transfer",
      memberCard: r.memberCardUrl,
      paymentUrl: r.paymentUrl,
      igFollow: r.igFollowUrl,
    }));

  res.json({ individual, team });
};

export const getDashboardStats = async (
  _: Request,
  res: Response
): Promise<void> => {
  try {
    const [seminar, talkshow, workshop, poster, uiux, web] = await Promise.all([
      prisma.seminarRegistration.count(),
      prisma.talkshowRegistration.count(),
      prisma.workshopRegistration.count(),
      prisma.competitionRegistration.count({
        where: { competition: CompetitionType.POSTER },
      }),
      prisma.competitionRegistration.count({
        where: { competition: CompetitionType.UIUX },
      }),
      prisma.competitionRegistration.count({
        where: { competition: CompetitionType.WEB },
      }),
    ]);

    res.json({
      message: "OK",
      data: {
        seminar,
        talkshow,
        workshop,
        poster,
        uiux,
        webDesign: web,
      },
    });
  } catch (error: any) {
    console.error("[v0] Database connection error:", error.message);
    res.status(503).json({
      message: "Database connection error",
      error: error.message,
      data: {
        seminar: 0,
        talkshow: 0,
        workshop: 0,
        poster: 0,
        uiux: 0,
        webDesign: 0,
      },
    });
  }
};


// ~~~~~~~~~~ SEMINAR ACTIONS ~~~~~~~~~~
export const deleteSeminar = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    await prisma.seminarRegistration.delete({
      where: { id: Number(id) },
    });
    res.json({ message: "Seminar registration deleted successfully" });
  } catch (error: any) {
    console.error("Delete seminar error:", error.message);
    res.status(500).json({ message: "Failed to delete seminar registration" });
  }
};

export const verifySeminar = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const updated = await prisma.seminarRegistration.update({
      where: { id: Number(id) },
      data: { verified: true },
    });
    res.json({ message: "Seminar registration verified", data: updated });
  } catch (error: any) {
    console.error("Verify seminar error:", error.message);
    res.status(500).json({ message: "Failed to verify seminar registration" });
  }
};

// ~~~~~~~~~~ WORKSHOP ACTIONS ~~~~~~~~~~
export const deleteWorkshop = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    await prisma.workshopRegistration.delete({
      where: { id: Number(id) },
    });
    res.json({ message: "Workshop registration deleted successfully" });
  } catch (error: any) {
    console.error("Delete workshop error:", error.message);
    res.status(500).json({ message: "Failed to delete workshop registration" });
  }
};

export const verifyWorkshop = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const updated = await prisma.workshopRegistration.update({
      where: { id: Number(id) },
      data: { verified: true },
    });
    res.json({ message: "Workshop registration verified", data: updated });
  } catch (error: any) {
    console.error("Verify workshop error:", error.message);
    res.status(500).json({ message: "Failed to verify workshop registration" });
  }
};

// ~~~~~~~~~~ TALKSHOW ACTIONS ~~~~~~~~~~
export const deleteTalkshow = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    await prisma.talkshowRegistration.delete({
      where: { id: Number(id) },
    });
    res.json({ message: "Talkshow registration deleted successfully" });
  } catch (error: any) {
    console.error("Delete talkshow error:", error.message);
    res.status(500).json({ message: "Failed to delete talkshow registration" });
  }
};

export const verifyTalkshow = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const updated = await prisma.talkshowRegistration.update({
      where: { id: Number(id) },
      data: { verified: true },
    });
    res.json({ message: "Talkshow registration verified", data: updated });
  } catch (error: any) {
    console.error("Verify talkshow error:", error.message);
    res.status(500).json({ message: "Failed to verify talkshow registration" });
  }
};
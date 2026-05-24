"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { adminAPI } from "@/services/api";

type IndividualData = {
  id: string | number;
  fullName: string;
  leaderEmail: string;
  leaderPhone: string;
  paymentMethod: string;
  igFollow: string;
  registrationType: string;
  school?: string;
};

type TeamData = {
  id: string | number;
  teamName: string;
  leaderName: string;
  leaderEmail: string;
  leaderPhone: string;
  paymentMethod: string;
  igFollow: string;
  registrationType: string;
  school?: string;
};

export const PenComWeb: React.FC = () => {
  const { token, isHydrated } = useAuth();
  const [activeTab, setActiveTab] = useState<"individu" | "tim">("individu");
  const [individuData, setIndividuData] = useState<IndividualData[]>([]);
  const [timData, setTimData] = useState<TeamData[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const renderFileLink = (url?: string) => {
    if (!url) return "-";
    return (
      <a
        href={url}
        className="text-blue-600 hover:underline"
        target="_blank"
        rel="noopener noreferrer"
      >
        Lihat Bukti
      </a>
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!isHydrated || !token) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        console.log("[v0] Fetching web competition data...");
        const response = await adminAPI.getCompetition(token, "WEB");

        if (response && typeof response === "object") {
          const responseData = response as {
            individual?: IndividualData[];
            team?: TeamData[];
          };
          console.log("[v0] Web competition data:", responseData);
          setIndividuData(responseData.individual || []);
          setTimData(responseData.team || []);
          setError(null);
        } else {
          console.error("[v0] Unexpected response:", response);
          throw new Error("Invalid response format");
        }
      } catch (err) {
        const errorMsg =
          err instanceof Error ? err.message : "Gagal memuat data kompetisi";
        console.error("[v0] Error fetching web competition:", errorMsg);
        setError(errorMsg);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token, isHydrated]);

  const filteredData =
    activeTab === "individu"
      ? individuData.filter(
          (individu) =>
            individu.fullName
              .toLowerCase()
              .includes(searchTerm.toLowerCase()) ||
            (individu.school
              ?.toLowerCase()
              .includes(searchTerm.toLowerCase()) ??
              false) ||
            individu.leaderEmail
              .toLowerCase()
              .includes(searchTerm.toLowerCase()) ||
            individu.leaderPhone
              .toLowerCase()
              .includes(searchTerm.toLowerCase())
        )
      : timData.filter(
          (tim) =>
            tim.teamName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            tim.leaderName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (tim.school?.toLowerCase().includes(searchTerm.toLowerCase()) ??
              false) ||
            tim.leaderEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
            tim.leaderPhone.toLowerCase().includes(searchTerm.toLowerCase())
        );

  if (loading) {
    return (
      <div className="p-6 w-full">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 w-full">
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="p-6 w-full">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">
        Daftar Peserta Competition Web Design
      </h1>

      <div className="flex justify-between items-center border-b border-gray-300 mb-6">
        <div className="flex space-x-4">
          <button
            onClick={() => setActiveTab("individu")}
            className={`px-6 py-2 font-medium text-sm transition-colors ${
              activeTab === "individu"
                ? "border-b-2 border-blue-500 text-blue-600"
                : "text-gray-500 hover:text-blue-500"
            }`}
          >
            Individu
          </button>
          <button
            onClick={() => setActiveTab("tim")}
            className={`px-6 py-2 font-medium text-sm transition-colors ${
              activeTab === "tim"
                ? "border-b-2 border-blue-500 text-blue-600"
                : "text-gray-500 hover:text-blue-500"
            }`}
          >
            Team
          </button>
        </div>

        <div className="mb-2">
          <input
            type="text"
            placeholder="Search..."
            className="border border-gray-300 rounded-md px-3 py-2 w-full sm:w-72 focus:ring-2 focus:ring-blue-400 focus:outline-none text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg shadow-md bg-white">
        <table className="min-w-full text-sm border border-gray-200">
          <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
            {activeTab === "individu" ? (
              <tr>
                <th className="px-4 py-3 border-b text-left">No</th>
                <th className="px-4 py-3 border-b text-left">Kategori</th>
                <th className="px-4 py-3 border-b text-left">Nama</th>
                <th className="px-4 py-3 border-b text-left">Asal Sekolah</th>
                <th className="px-4 py-3 border-b text-left">Email</th>
                <th className="px-4 py-3 border-b text-left">Telepon</th>
                <th className="px-4 py-3 border-b text-left">
                  Metode Pembayaran
                </th>
                <th className="px-4 py-3 border-b text-left">Follow IG</th>
              </tr>
            ) : (
              <tr>
                <th className="px-4 py-3 border-b text-left">No</th>
                <th className="px-4 py-3 border-b text-left">Kategori</th>
                <th className="px-4 py-3 border-b text-left">Nama Tim</th>
                <th className="px-4 py-3 border-b text-left">Asal Sekolah</th>
                <th className="px-4 py-3 border-b text-left">Nama Ketua</th>
                <th className="px-4 py-3 border-b text-left">Email</th>
                <th className="px-4 py-3 border-b text-left">Telepon</th>
                <th className="px-4 py-3 border-b text-left">
                  Metode Pembayaran
                </th>
                <th className="px-4 py-3 border-b text-left">Follow IG</th>
              </tr>
            )}
          </thead>

          <tbody>
            {filteredData.length > 0 ? (
              activeTab === "individu" ? (
                (filteredData as typeof individuData).map((individu, index) => (
                  <tr
                    key={individu.id}
                    className="hover:bg-gray-50 border-b last:border-none"
                  >
                    <td className="px-4 py-2">{index + 1}</td>
                    <td className="px-4 py-2">{individu.registrationType}</td>
                    <td className="px-4 py-2">{individu.fullName}</td>
                    <td className="px-4 py-2">{individu.school ?? "-"}</td>
                    <td className="px-4 py-2">{individu.leaderEmail}</td>
                    <td className="px-4 py-2">{individu.leaderPhone}</td>
                    <td className="px-4 py-2">{individu.paymentMethod}</td>
                    <td className="px-4 py-2">
                      {renderFileLink(individu.igFollow)}
                    </td>
                  </tr>
                ))
              ) : (
                (filteredData as typeof timData).map((tim, index) => (
                  <tr
                    key={tim.id}
                    className="hover:bg-gray-50 border-b last:border-none"
                  >
                    <td className="px-4 py-2">{index + 1}</td>
                    <td className="px-4 py-2">{tim.registrationType}</td>
                    <td className="px-4 py-2">{tim.teamName}</td>
                    <td className="px-4 py-2">{tim.school ?? "-"}</td>
                    <td className="px-4 py-2">{tim.leaderName}</td>
                    <td className="px-4 py-2">{tim.leaderEmail}</td>
                    <td className="px-4 py-2">{tim.leaderPhone}</td>
                    <td className="px-4 py-2">{tim.paymentMethod}</td>
                    <td className="px-4 py-2">
                      {renderFileLink(tim.igFollow)}
                    </td>
                  </tr>
                ))
              )
            ) : (
              <tr>
                <td
                  colSpan={activeTab === "tim" ? 9 : 8}
                  className="text-center py-6 text-gray-500"
                >
                  Tidak ada data ditemukan
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

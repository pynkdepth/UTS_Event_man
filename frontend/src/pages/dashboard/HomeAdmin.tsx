"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { CardStats } from "@/components/admin/CardStats";
import { MdCoPresent, MdDesignServices } from "react-icons/md";
import { FaMicrophoneAlt, FaWrench } from "react-icons/fa";
import { RiImageEditLine } from "react-icons/ri";
import { FaGlobe } from "react-icons/fa6";
import { BarChartStats } from "@/components/admin/BarChartStats";
import { PieChartStats } from "@/components/admin/PieChartStats";
import { useAuth } from "@/hooks/useAuth";
import { adminAPI } from "@/services/api";

interface DashboardStats {
  seminar: number;
  talkshow: number;
  workshop: number;
  poster: number;
  uiux: number;
  webDesign: number;
}

interface ApiResponse {
  message: string;
  data?: DashboardStats;
  error?: string;
}

export const HomeAdmin: React.FC = () => {
  const { token, isHydrated } = useAuth();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = async () => {
    if (!isHydrated || !token) {
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      setError(null);
      console.log("[v0] Fetching dashboard stats...");
      const response = (await adminAPI.getDashboardStats(token)) as
        | ApiResponse
        | DashboardStats;

      if (
        response &&
        typeof response === "object" &&
        "data" in response &&
        response.data
      ) {
        console.log("[v0] Dashboard data received:", response.data);
        setStats(response.data);
      } else if (
        response &&
        typeof response === "object" &&
        "seminar" in response
      ) {
        console.log("[v0] Dashboard data (direct):", response);
        setStats(response as DashboardStats);
      } else {
        console.error("[v0] Invalid response format:", response);
        throw new Error("Invalid response format from server");
      }
    } catch (err) {
      const errorMsg =
        err instanceof Error ? err.message : "Failed to fetch data";
      console.error("[v0] Error fetching stats:", errorMsg);
      setError(errorMsg);
      setStats(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, [token, isHydrated]);

  const chartData = [
    { name: "Seminar", total: stats?.seminar ?? 0 },
    { name: "Talkshow", total: stats?.talkshow ?? 0 },
    { name: "Workshop", total: stats?.workshop ?? 0 },
    { name: "Poster", total: stats?.poster ?? 0 },
    { name: "UI/UX", total: stats?.uiux ?? 0 },
    { name: "Web Design", total: stats?.webDesign ?? 0 },
  ];

  if (loading) {
    return (
      <div className="min-h-screen p-1">
        <p className="text-gray-500">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-1">
      <h2 className="text-2xl font-bold mb-8 text-gray-800">
        Selamat Datang di Dashboard Admin
      </h2>

      {error && (
        <div className="mb-4 p-4 bg-red-100 border border-red-300 text-red-800 rounded-lg">
          <p className="text-sm mb-3">{error}</p>
          <button
            onClick={fetchStats}
            className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700"
          >
            Coba Lagi
          </button>
        </div>
      )}

      {stats ? (
        <>
          {/* Statistik Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <CardStats
              title="Pendaftar Seminar"
              icon={<MdCoPresent />}
              value={stats?.seminar ?? 0}
              color="bg-blue-500"
              url="dashboard/seminar"
            />
            <CardStats
              title="Pendaftar Talkshow"
              icon={<FaMicrophoneAlt />}
              value={stats?.talkshow ?? 0}
              color="bg-purple-500"
              url="dashboard/talkshow"
            />
            <CardStats
              title="Pendaftar Workshop"
              icon={<FaWrench />}
              value={stats?.workshop ?? 0}
              color="bg-emerald-500"
              url="dashboard/workshop"
            />
            <CardStats
              title="Pendaftar Competition Poster Design"
              icon={<RiImageEditLine />}
              value={stats?.poster ?? 0}
              color="bg-rose-500"
              url="dashboard/competition/poster"
            />
            <CardStats
              title="Pendaftar Competition UI/UX Design"
              icon={<MdDesignServices />}
              value={stats?.uiux ?? 0}
              color="bg-indigo-500"
              url="dashboard/competition/uiux"
            />
            <CardStats
              title="Pendaftar Competition Web Design"
              icon={<FaGlobe />}
              value={stats?.webDesign ?? 0}
              color="bg-teal-600"
              url="dashboard/competition/web-design"
            />
          </div>

          {/* Grafik */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <BarChartStats data={chartData} />
            <PieChartStats data={chartData} />
          </div>
        </>
      ) : (
        <div className="text-center py-8 text-gray-500">
          <p>Tidak dapat memuat data. Pastikan backend sedang berjalan.</p>
        </div>
      )}
    </div>
  );
};

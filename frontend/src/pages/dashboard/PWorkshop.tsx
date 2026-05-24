"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { adminAPI } from "@/services/api";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

// =========================
// WhatsApp Group Links
// =========================
const WHATSAPP_GROUP_LINKS_WORKSHOP = {
  "CYBER_SECURITY": "https://chat.whatsapp.com/Bu0CzMaFn5e5ZHdHhDRLUV?mode=hqrc",
  "ARTIFICIAL_INTELLIGENCE": "https://chat.whatsapp.com/KqqIKPGxGr0FdTSTmaLBqn?mode=hqrc",
  "MOBILE_DEV": "https://chat.whatsapp.com/KQQtzWBC4ekENTazO4kq2w?mode=hqrc",
  DEFAULT: "https://chat.whatsapp.com/GANTI_LINK_GRUP_WORKSHOP_UMUM"
};

const formatWhatsappNumber = (phone?: string) => {
  if (!phone) return "";
  return phone.replace(/^0/, "62").replace(/\D/g, "");
};

const createWhatsappLink = (phone?: string, name?: string, workshopType?: string) => {
  if (!phone || !name) return "#";

  const number = formatWhatsappNumber(phone);

  const groupLink =
    WHATSAPP_GROUP_LINKS_WORKSHOP[
    (workshopType as keyof typeof WHATSAPP_GROUP_LINKS_WORKSHOP) || "DEFAULT"
    ] || WHATSAPP_GROUP_LINKS_WORKSHOP.DEFAULT;

  const message = `Halo ${name}, terima kasih telah mendaftar Workshop Invofest 2025.

Silakan bergabung di grup WhatsApp peserta melalui link berikut:
${groupLink}

Terima kasih.`;

  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
};

// =========================
// Interfaces
// =========================
interface WorkshopData {
  id?: number;
  fullName?: string;
  workshop?: string;
  category?: string;
  whatsapp?: string;
  institution?: string;
  paymentUrl?: string;
  igFollowUrl?: string;
  idNumber?: string;
  idCardUrl?: string;
  status?: string;
}

interface ApiResponse {
  message: string;
  data?: WorkshopData[];
  error?: string;
}

// =========================
// MAIN COMPONENT
// =========================
export const PenWorkshop: React.FC = () => {
  const { token, isHydrated } = useAuth();
  const [workshopData, setWorkshopData] = useState<WorkshopData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("semua");
  const [workshopFilter, setWorkshopFilter] = useState("semua");

  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 15;

  const [isUpdating, setIsUpdating] = useState(false);

  // =========================
  // Fetch Data
  // =========================
  useEffect(() => {
    const fetchData = async () => {
      if (!isHydrated || !token) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const response = (await adminAPI.getWorkshop(token)) as ApiResponse | WorkshopData[];

        if (Array.isArray(response)) {
          setWorkshopData(response.sort((a, b) => (a.id || 0) - (b.id || 0)));
        } else if (response?.data) {
          setWorkshopData(response.data.sort((a, b) => (a.id || 0) - (b.id || 0)));
        } else {
          setError("Data format tidak valid");
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Gagal memuat data workshop");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token, isHydrated]);

  // =========================
  // Filtering & Searching
  // =========================
  const filteredData = workshopData
    .filter((item) =>
      categoryFilter === "semua"
        ? true
        : item.category?.toUpperCase() === categoryFilter.toUpperCase()
    )
    .filter((item) =>
      workshopFilter === "semua"
        ? true
        : item.workshop?.toUpperCase() === workshopFilter.toUpperCase()
    )
    .filter((item) => {
      const s = searchTerm.toLowerCase();
      return (
        item.fullName?.toLowerCase().includes(s) ||
        item.workshop?.toLowerCase().includes(s) ||
        item.category?.toLowerCase().includes(s) ||
        item.whatsapp?.toLowerCase().includes(s) ||
        item.institution?.toLowerCase().includes(s) ||
        item.idNumber?.toLowerCase().includes(s)
      );
    });

  // Pagination
  const totalPages = Math.max(Math.ceil(filteredData.length / rowsPerPage), 1);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  // =========================
  // PDF EXPORT
  // =========================
  const handleExportPDF = () => {
    const doc = new jsPDF();

    doc.text("Daftar Peserta Workshop - Invofest 2025", 14, 20);

    autoTable(doc, {
      head: [
        [
          "No",
          "Nama",
          "Jenis Workshop",
          "Kategori",
          "WhatsApp",
          "Institusi",
          "NIM",
          "Bukti Bayar",
          "Bukti Follow",
          "Bukti KTM"
        ]
      ],
      body: filteredData.map((item, index) => [
        index + 1,
        item.fullName || "-",
        item.workshop || "-",
        item.category || "-",
        item.whatsapp || "-",
        item.institution || "-",
        item.idNumber || "-",
        item.paymentUrl ? "Ada" : "-",
        item.igFollowUrl ? "Ada" : "-",
        item.idCardUrl ? "Ada" : "-"
      ]),
      startY: 26,
      theme: "striped"
    });

    doc.save("Daftar_Peserta_Workshop.pdf");
  };

  // =========================
  // Update / Delete
  // =========================
  const handleVerify = async (id: number) => {
    if (isUpdating || !token) return;

    setIsUpdating(true);
    try {
      await adminAPI.verifyWorkshop(id, token);

      setWorkshopData((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, status: "VERIFIED" } : item
        )
      );
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (isUpdating || !token) return;
    if (!confirm("Yakin ingin menghapus peserta ini?")) return;

    setIsUpdating(true);
    try {
      await adminAPI.deleteWorkshop(id, token);
      setWorkshopData((prev) => prev.filter((item) => item.id !== id));
    } finally {
      setIsUpdating(false);
    }
  };

  // =========================
  // RENDER
  // =========================
  return (
    <div className="p-1 w-full">
      <h1 className="text-3xl font-semibold mb-4 text-gray-800">
        Daftar Peserta Workshop
      </h1>

      {error && (
        <div className="mb-4 p-3 bg-red-100 border text-red-800 rounded">
          {error}
        </div>
      )}

      {/* FILTER BAR */}
      <div className="flex flex-col sm:flex-row gap-3 mb-4 justify-end">
        <select
          className="border rounded px-3 py-2"
          value={workshopFilter}
          onChange={(e) => {
            setWorkshopFilter(e.target.value);
            setCurrentPage(1);
          }}
        >
          <option value="semua">Semua Workshop</option>
          <option value="CYBER_SECURITY">CYBER SECURITY</option>
          <option value="ARTIFICIAL_INTELLIGENCE">ARTIFICIAL INTELLIGENCE</option>
          <option value="MOBILE_DEV">MOBILE DEV</option>
        </select>

        <select
          className="border rounded px-3 py-2"
          value={categoryFilter}
          onChange={(e) => {
            setCategoryFilter(e.target.value);
            setCurrentPage(1);
          }}
        >
          <option value="semua">Semua Kategori</option>
          <option value="MAHASISWA">Mahasiswa</option>
          <option value="UMUM">Umum</option>
        </select>

        <input
          type="text"
          placeholder="Search nama / WA / institusi / NIM..."
          className="border rounded px-3 py-2 sm:w-72"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
        />

        <button
          onClick={handleExportPDF}
          disabled={loading || filteredData.length === 0}
          className="px-4 py-2 bg-green-600 text-white rounded disabled:opacity-50"
        >
          Export PDF
        </button>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto bg-white shadow rounded">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100 text-gray-700 text-xs uppercase">
            <tr>
              <th className="px-4 py-3">No</th>
              <th className="px-4 py-3">Nama</th>
              <th className="px-4 py-3">Workshop</th>
              <th className="px-4 py-3">Kategori</th>
              <th className="px-4 py-3">WhatsApp</th>
              <th className="px-4 py-3">Institusi</th>
              <th className="px-4 py-3">NIM</th>
              <th className="px-4 py-3">Bukti Bayar</th>
              <th className="px-4 py-3">Bukti Follow</th>
              <th className="px-4 py-3">Bukti KTM</th>
              <th className="px-4 py-3">Aksi</th>
            </tr>
          </thead>

          <tbody>
            {paginatedData.length ? (
              paginatedData.map((item, index) => (
                <tr
                  key={item.id}
                  className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                >
                  <td className="px-4 py-2">
                    {(currentPage - 1) * rowsPerPage + index + 1}
                  </td>

                  <td className="px-4 py-2 font-medium">{item.fullName}</td>

                  <td className="px-4 py-2">{item.workshop}</td>

                  <td className="px-4 py-2">{item.category}</td>

                  <td className="px-4 py-2">
                    {item.whatsapp ? (
                      <a
                        href={createWhatsappLink(
                          item.whatsapp,
                          item.fullName,
                          item.workshop
                        )}
                        className="text-blue-600 underline"
                        target="_blank"
                      >
                        {item.whatsapp}
                      </a>
                    ) : (
                      "-"
                    )}
                  </td>

                  <td className="px-4 py-2">{item.institution}</td>

                  <td className="px-4 py-2">{item.idNumber}</td>

                  <td className="px-4 py-2">
                    {item.paymentUrl ? (
                      <a
                        href={item.paymentUrl}
                        target="_blank"
                        className="text-blue-600 underline"
                      >
                        Lihat Bukti
                      </a>
                    ) : (
                      "-"
                    )}
                  </td>

                  <td className="px-4 py-2">
                    {item.igFollowUrl ? (
                      <a
                        href={item.igFollowUrl}
                        target="_blank"
                        className="text-blue-600 underline"
                      >
                        Lihat Bukti
                      </a>
                    ) : (
                      "-"
                    )}
                  </td>

                  <td className="px-4 py-2">
                    {item.idCardUrl ? (
                      <a
                        href={item.idCardUrl}
                        target="_blank"
                        className="text-blue-600 underline"
                      >
                        Lihat Bukti
                      </a>
                    ) : (
                      "-"
                    )}
                  </td>

                  <td className="px-4 py-2 flex gap-2">
                    <button
                      onClick={() => handleVerify(item.id!)}
                      disabled={item.status === "VERIFIED" || isUpdating}
                      className={`px-3 py-1 rounded text-xs ${item.status === "VERIFIED"
                          ? "bg-green-200 text-green-700"
                          : "bg-blue-200 text-blue-700"
                        }`}
                    >
                      {item.status === "VERIFIED" ? "Checked" : "Verify"}
                    </button>

                    <button
                      onClick={() => handleDelete(item.id!)}
                      disabled={isUpdating}
                      className="px-3 py-1 rounded text-xs bg-red-200 text-red-700"
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={11}
                  className="text-center py-4 text-gray-500"
                >
                  {loading ? "Loading..." : "Tidak ada data ditemukan"}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      <div className="flex justify-between mt-4 text-sm">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((p) => p - 1)}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          ← Sebelumnya
        </button>

        <span>
          Halaman {currentPage} dari {totalPages}
        </span>

        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((p) => p + 1)}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Selanjutnya →
        </button>
      </div>
    </div>
  );
};

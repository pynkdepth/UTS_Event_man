"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { adminAPI } from "@/services/api"; // Asumsi punya .deleteSeminar dan .verifySeminar
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

// --- (BARU) Helper WA ---
// PENTING: Ganti dengan link grup WA Anda
const WHATSAPP_GROUP_LINK_SEMINAR = "https://chat.whatsapp.com/HmlfIonZGLlK8WtJtkgVCD?mode=hqrc";

const formatWhatsappNumber = (phone?: string) => {
  if (!phone) return '';
  return phone.replace(/^0/, '62').replace(/\D/g, '');
}

const createWhatsappLink = (phone?: string, name?: string) => {
  if (!phone || !name) return "#";

  const number = formatWhatsappNumber(phone);
  const message = `Halo ${name}, terima kasih telah mendaftar Seminar Invofest 2025.

Silakan bergabung di grup WhatsApp peserta melalui link berikut:
${WHATSAPP_GROUP_LINK_SEMINAR}

Terima kasih.`;
  
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${number}?text=${encodedMessage}`;
};
// --- Akhir Helper WA ---


// --- (1) Interface diperbarui ---
interface SeminarData {
  id?: number;
  fullName?: string;
  category?: string;
  whatsapp?: string;
  institution?: string;
  paymentUrl?: string;
  igFollowUrl?: string;
  idNumber?: string;
  idCardUrl?: string;
  status?: string; // <-- Ditambahkan
}

interface ApiResponse {
  message: string;
  data?: SeminarData[];
  error?: string;
}

export const PenSeminar: React.FC = () => {
  const { token, isHydrated } = useAuth();
  const [seminarData, setSeminarData] = useState<SeminarData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("semua");
  
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 15;

  // --- (BARU) 2: State untuk disable tombol saat API call ---
  const [isUpdating, setIsUpdating] = useState(false);

  // useEffect (Pengurutan sudah ada)
  useEffect(() => {
    const fetchData = async () => {
      if (!isHydrated || !token) {
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        setError(null);
        console.log("[v0] Fetching seminar data...");
        const response = (await adminAPI.getSeminar(token)) as
          | ApiResponse
          | SeminarData[];

        if (Array.isArray(response)) {
          const sortedData = response.sort((a, b) => (a.id || 0) - (b.id || 0));
          setSeminarData(sortedData);
        } else if (response?.data && Array.isArray(response.data)) {
          const sortedData = response.data.sort((a, b) => (a.id || 0) - (b.id || 0));
          setSeminarData(sortedData);
        } else {
          console.error("[v0] Unexpected response format:", response);
          setSeminarData([]);
          setError("Data format tidak valid");
        }
      } catch (err) {
        const errorMsg =
          err instanceof Error ? err.message : "Gagal memuat data seminar";
        console.error("[v0] Error fetching seminar:", errorMsg);
        setSeminarData([]);
        setError(errorMsg);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [token, isHydrated]);

  // Logika filter (Tidak berubah)
  const filteredData = seminarData
    .filter((item) => {
      if (categoryFilter === "semua") return true;
      return item.category?.toUpperCase() === categoryFilter.toUpperCase();
    })
    .filter((item) => {
      const lowerSearch = searchTerm.toLowerCase();
      return (
        item.fullName?.toLowerCase().includes(lowerSearch) ||
        item.category?.toLowerCase().includes(lowerSearch) ||
        item.whatsapp?.toLowerCase().includes(lowerSearch) ||
        item.institution?.toLowerCase().includes(lowerSearch) ||
        item.idNumber?.toLowerCase().includes(lowerSearch)
      );
    });

  // Paginasi (Perbaikan totalPages sudah ada)
  const totalPages = Math.max(Math.ceil(filteredData.length / rowsPerPage), 1);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  // PDF Export (Kolom 'Kehadiran' sudah ada)
  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.text("Daftar Peserta Seminar - Invofest 2025", 14, 20);
    doc.setFontSize(10);
    doc.text(`Filter Kategori: ${categoryFilter.toUpperCase()}`, 14, 26);
    doc.text(`Total Peserta: ${filteredData.length}`, 14, 32);
    const tableColumns = [
      "No", "Nama", "Kategori", "WhatsApp", "Institusi", "NIM",
      "Bukti Bayar", "Bukti Follow", "Bukti KTM", "Kehadiran",
    ];
    const tableRows = filteredData.map((item, index) => [
      index + 1, item.fullName || "-", item.category || "-", item.whatsapp || "-",
      item.institution || "-", item.idNumber || "-",
      item.paymentUrl ? "Ada" : "-", item.igFollowUrl ? "Ada" : "-",
      item.idCardUrl ? "Ada" : "-", " ",
    ]);
    autoTable(doc, {
      head: [tableColumns], body: tableRows, startY: 38,
      theme: "striped", styles: { fontSize: 8 },
      headStyles: { fillColor: [133, 46, 78] },
    });
    doc.save("Daftar_Peserta_Seminar.pdf");
  };

  // --- (BARU) 3: Fungsi untuk Verifikasi Peserta ---
  const handleVerify = async (id: number) => {
    if (isUpdating || !token) return; // <-- DITAMBAHKAN PENGECEKAN TOKEN
    const currentStatus = seminarData.find(s => s.id === id)?.status;
    if (currentStatus === 'VERIFIED') return;

    setIsUpdating(true);
    try {
      await adminAPI.verifySeminar(id, token); // Panggil API
      setSeminarData((prevData) =>
        prevData.map((item) =>
          item.id === id ? { ...item, status: "VERIFIED" } : item
        )
      );
    } catch (err) {
      console.error("Gagal verifikasi:", err);
      alert("Gagal memverifikasi peserta.");
    } finally {
      setIsUpdating(false);
    }
  };

  // --- (BARU) 4: Fungsi untuk Hapus Peserta ---
  const handleDelete = async (id: number) => {
    if (isUpdating || !token) return; // <-- DITAMBAHKAN PENGECEKAN TOKEN
    if (!window.confirm("Apakah Anda yakin ingin menghapus peserta ini?")) {
      return;
    }

    setIsUpdating(true);
    try {
      await adminAPI.deleteSeminar(id, token); // Panggil API
      setSeminarData((prevData) =>
        prevData.filter((item) => item.id !== id)
      );
    } catch (err) {
      console.error("Gagal hapus:", err);
      alert("Gagal menghapus peserta.");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="p-1 w-full">
      {/* ... (Header, Error) ... */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold text-gray-800">
          Daftar Peserta Seminar
        </h1>
      </div>
       {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-300 text-red-800 rounded-lg text-sm">
          {error}
        </div>
      )}

      {/* Kontrol Filter, Search, dan Ekspor */}
      <div className="w-full flex flex-col sm:flex-row justify-end mt-3 mb-3 gap-3">
        <select
          className="border border-gray-300 rounded-md px-3 py-2 w-full sm:w-auto focus:ring-2 focus:ring-blue-400 focus:outline-none text-sm"
          value={categoryFilter}
          onChange={(e) => { setCategoryFilter(e.target.value); setCurrentPage(1); }}
        >
          <option value="semua">Semua Kategori</option>
          <option value="MAHASISWA">Mahasiswa</option>
          <option value="UMUM">Umum</option>
        </select>
        <input
          type="text"
          placeholder="Search (Nama, WA, Institusi, NIM...)"
          className="border border-gray-300 rounded-md px-3 py-2 w-full sm:w-72 focus:ring-2 focus:ring-blue-400 focus:outline-none text-sm"
          value={searchTerm}
          onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
        />
        <button
          onClick={handleExportPDF}
          disabled={loading || filteredData.length === 0}
          className="px-4 py-2 bg-green-600 text-white rounded-md text-sm font-medium hover:bg-green-700 transition-colors
                     disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Export PDF
        </button>
      </div>

      {loading && (
        <div className="text-center py-4 text-gray-500">Loading data...</div>
      )}

      <div className="overflow-x-auto rounded-lg shadow-md bg-white">
        <table className="min-w-full text-sm border border-gray-200">
          <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
            <tr>
              {/* --- (BARU) 5: Header Tabel diperbarui --- */}
              <th className="px-4 py-3 border-b text-left">No</th>
              <th className="px-4 py-3 border-b text-left">Nama</th>
              <th className="px-4 py-3 border-b text-left">Kategori</th>
              <th className="px-4 py-3 border-b text-left">WhatsApp</th>
              <th className="px-4 py-3 border-b text-left">Institusi</th>
              <th className="px-4 py-3 border-b text-left">NIM</th>
              <th className="px-4 py-3 border-b text-left">Bukti Bayar</th>
              <th className="px-4 py-3 border-b text-left">Bukti Follow</th>
              <th className="px-4 py-3 border-b text-left">Bukti KTM</th>
              <th className="px-4 py-3 border-b text-left">Aksi</th> {/* <-- BARU */}
            </tr>
          </thead>
          <tbody>
            {paginatedData.length > 0 ? (
              paginatedData.map((seminar, index) => (
                <tr
                  key={seminar.id || index}
                  className={`${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  } hover:bg-blue-50 transition-colors`}
                >
                  <td className="px-4 py-2 border-b">
                    {(currentPage - 1) * rowsPerPage + index + 1}
                  </td>
                  <td className="px-4 py-2 border-b font-medium text-gray-800">
                    {seminar.fullName || "-"}
                  </td>
                  <td className="px-4 py-2 border-b">
                    {seminar.category || "-"}
                  </td>
                  
                  {/* --- (INI YANG DIPERBARUI) --- */}
                  <td className="px-4 py-2 border-b">
                    {seminar.whatsapp ? (
                      <a
                        href={createWhatsappLink(seminar.whatsapp, seminar.fullName)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        {seminar.whatsapp}
                      </a>
                    ) : (
                      "-"
                    )}
                  </td>
                  {/* --- AKHIR PEMBARUAN --- */}

                  <td className="px-4 py-2 border-b">
                    {seminar.institution || "-"}
                  </td>
                  <td className="px-4 py-2 border-b">
                    {seminar.idNumber || "-"}
                  </td>
                  <td className="px-4 py-2 border-b">
                    {seminar.paymentUrl ? (
                      <a href={seminar.paymentUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Lihat Bukti</a>
                    ) : ( "-" )}
                  </td>
                  <td className="px-4 py-2 border-b">
                    {seminar.igFollowUrl ? (
                      <a href={seminar.igFollowUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Lihat Bukti</a>
                    ) : ( "-" )}
                  </td>
                  <td className="px-4 py-2 border-b">
                    {seminar.idCardUrl ? (
                      <a href={seminar.idCardUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Lihat Bukti</a>
                    ) : ( "-" )}
                  </td>
                  
                  {/* --- (BARU) 6: Kolom Aksi dengan Tombol --- */}
                  <td className="px-4 py-2 border-b">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleVerify(seminar.id!)}
                        disabled={isUpdating || seminar.status === "VERIFIED"}
                        className={`px-3 py-1 rounded text-xs font-medium
                          ${ seminar.status === "VERIFIED"
                            ? "bg-green-100 text-green-700 cursor-not-allowed"
                            : "bg-blue-100 text-blue-700 hover:bg-blue-200"
                          } disabled:opacity-50`}
                      >
                        {seminar.status === "VERIFIED" ? "Checked" : "Correct"}
                      </button>
                      <button
                        onClick={() => handleDelete(seminar.id!)}
                        disabled={isUpdating}
                        className="px-3 py-1 rounded text-xs font-medium
                                   bg-red-100 text-red-700 hover:bg-red-200
                                   disabled:opacity-50"
                      >
                        Hapus
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                {/* --- (BARU) 7: colSpan diperbarui --- */}
                <td colSpan={10} className="text-center py-4 text-gray-500">
                  {loading ? "Loading..." : "Tidak ada data ditemukan."}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Paginasi (Tidak berubah) */}
      <div className="flex justify-between items-center mt-4 text-sm">
        {/* ... (Tombol Paginasi Anda di sini) ... */}
         <button
          className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 disabled:opacity-50"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        >
          ← Sebelumnya
        </button>
        <span className="text-gray-700">
          Halaman {currentPage} dari {totalPages}
        </span>
        <button
          className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 disabled:opacity-50"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
        >
          Selanjutnya →
        </button>
      </div>
    </div>
  );
};
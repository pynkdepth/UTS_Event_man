import React, { useEffect } from "react";
import AOS from "aos";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const SuccessModal: React.FC<Props> = ({ isOpen, onClose, title, children }) => {
  useEffect(() => {
    // Refresh AOS untuk memastikan animasi modal berjalan
    AOS.refresh();
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    // Overlay Latar Belakang
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 transition-opacity duration-300"
      onClick={onClose} // Menutup modal saat klik di luar
    >
      {/* Konten Modal */}
      <div
        data-aos="zoom-in"
        data-aos-duration="300"
        className="relative w-full max-w-md p-6 mx-4 bg-white rounded-2xl shadow-xl"
        onClick={(e) => e.stopPropagation()} // Mencegah modal tertutup saat klik di dalam
      >
        {/* Ikon Sukses (Checklist) */}
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
          <svg
            className="h-6 w-6 text-green-600"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 12.75l6 6 9-13.5"
            />
          </svg>
        </div>

        {/* Teks Konten */}
        <div className="mt-3 text-center sm:mt-5">
          <h3 className="text-xl font-semibold leading-6 text-[#852e4e]">
            {title}
          </h3>
          <div className="mt-2">
            <p className="text-sm text-slate-600">{children}</p>
          </div>
        </div>

        {/* Tombol Tutup */}
        <div className="mt-5 sm:mt-6">
          <button
            type="button"
            className="inline-flex w-full justify-center rounded-md bg-[#852e4e] px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#4c1d3d] transition-colors"
            onClick={onClose}
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;
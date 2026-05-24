import { useEffect, useState } from "react";

type Biodata = {
  nama: string;
  nim: string;
  prodi: string;
  instansi?: string;
  deskripsi?: string;
};

const defaultBiodata: Biodata = {
  nama: "Mahasiswa Invofest",
  nim: "24090034",
  prodi: "Teknik Informatika",
  instansi: "---",
  deskripsi: "Biodata pembuat website Invofest 2026.",
};

export const Biodata = () => {
  const [data, setData] = useState<Biodata>(defaultBiodata);

  useEffect(() => {
    // Jika nanti ingin dari config/API, tinggal ganti logika di sini.
    setData(defaultBiodata);
  }, []);

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm p-6 space-y-4">
      <h1 className="text-2xl font-bold">Biodata</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1">
          <p className="text-sm text-slate-500">Nama</p>
          <p className="font-semibold">{data.nama}</p>
        </div>
        <div className="space-y-1">
          <p className="text-sm text-slate-500">NIM</p>
          <p className="font-semibold">{data.nim}</p>
        </div>
        <div className="space-y-1">
          <p className="text-sm text-slate-500">Program Studi</p>
          <p className="font-semibold">{data.prodi}</p>
        </div>
        <div className="space-y-1">
          <p className="text-sm text-slate-500">Instansi</p>
          <p className="font-semibold">{data.instansi ?? "-"}</p>
        </div>
      </div>

      {data.deskripsi && (
        <div className="pt-2">
          <p className="text-sm text-slate-500">Deskripsi</p>
          <p className="mt-1 text-slate-800">{data.deskripsi}</p>
        </div>
      )}
    </div>
  );
};


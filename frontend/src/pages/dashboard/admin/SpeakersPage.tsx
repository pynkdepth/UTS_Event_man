import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";

type Pembicara = {
  id: number;
  nama: string;
  jabatan?: string | null;
  fotoUrl?: string | null;
  bio?: string | null;
  createdAt?: string;
};

export const SpeakersPage = () => {
  const { token, isHydrated } = useAuth();
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState<Pembicara[]>([]);

  const [nama, setNama] = useState("");
  const [jabatan, setJabatan] = useState("");
  const [fotoUrl, setFotoUrl] = useState("");
  const [bio, setBio] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);

  const fetchAll = async () => {
    if (!token) return;
    setLoading(true);
    try {
      const res = await fetch(`https://uts-event-man-sjc8.vercel.app/admin-crud/speakers`, {
        headers: { Authorization: `Bearer ${token}` },
      }).then((r) => r.json());
      setItems(res);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isHydrated) return;
    fetchAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, isHydrated]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    if (!nama.trim()) return;

    const base = `${import.meta.env.VITE_API_URL}/admin-crud/speakers`;
    const url = editingId ? `${base}/${editingId}` : base;
    const method = editingId ? "PUT" : "POST";

    await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        nama,
        jabatan: jabatan.trim() || null,
        fotoUrl: fotoUrl.trim() || null,
        bio: bio.trim() || null,
      }),
    }).then(async (r) => {
      if (!r.ok) throw new Error(await r.text());
    });

    setNama("");
    setJabatan("");
    setFotoUrl("");
    setBio("");
    setEditingId(null);
    await fetchAll();
  };

  const handleEdit = (it: Pembicara) => {
    setEditingId(it.id);
    setNama(it.nama || "");
    setJabatan(it.jabatan ?? "");
    setFotoUrl(it.fotoUrl ?? "");
    setBio(it.bio ?? "");
  };

  const handleDelete = async (id: number) => {
    if (!token) return;
    if (!confirm("Hapus pembicara ini?")) return;

    await fetch(`${import.meta.env.VITE_API_URL}/admin-crud/speakers/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    }).then(async (r) => {
      if (!r.ok) throw new Error(await r.text());
    });

    if (editingId === id) {
      setEditingId(null);
      setNama("");
      setJabatan("");
      setFotoUrl("");
      setBio("");
    }

    await fetchAll();
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Pembicara</h1>

      <form onSubmit={handleSubmit} className="bg-white p-4 rounded-xl shadow-sm space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-slate-700">Nama</label>
            <input
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              className="mt-1 w-full px-3 py-2 border rounded-lg"
              placeholder="Nama pembicara"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">Jabatan</label>
            <input
              value={jabatan}
              onChange={(e) => setJabatan(e.target.value)}
              className="mt-1 w-full px-3 py-2 border rounded-lg"
              placeholder="Contoh: CTO"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-slate-700">Foto URL</label>
            <input
              value={fotoUrl}
              onChange={(e) => setFotoUrl(e.target.value)}
              className="mt-1 w-full px-3 py-2 border rounded-lg"
              placeholder="https://..."
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-slate-700">Bio</label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="mt-1 w-full px-3 py-2 border rounded-lg"
              placeholder="Deskripsi singkat"
              rows={3}
            />
          </div>
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            className="px-4 py-2 bg-[#852e4e] text-white rounded-lg font-semibold"
            disabled={loading}
          >
            {editingId ? "Update" : "Tambah"}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={() => {
                setEditingId(null);
                setNama("");
                setJabatan("");
                setFotoUrl("");
                setBio("");
              }}
              className="px-4 py-2 bg-slate-200 rounded-lg font-semibold"
            >
              Batal
            </button>
          )}
        </div>
      </form>

      <div className="bg-white p-4 rounded-xl shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold">List</h2>
          {loading && <span className="text-sm text-slate-500">Loading...</span>}
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-left">
                <th className="py-2">ID</th>
                <th className="py-2">Nama</th>
                <th className="py-2">Jabatan</th>
                <th className="py-2">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {items.map((it) => (
                <tr key={it.id} className="border-t">
                  <td className="py-2">{it.id}</td>
                  <td className="py-2">{it.nama}</td>
                  <td className="py-2">{it.jabatan ?? "-"}</td>
                  <td className="py-2 space-x-2">
                    <button
                      onClick={() => handleEdit(it)}
                      className="px-3 py-1 bg-blue-50 text-blue-700 rounded-lg font-semibold"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(it.id)}
                      className="px-3 py-1 bg-red-50 text-red-700 rounded-lg font-semibold"
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
              {items.length === 0 && (
                <tr>
                  <td colSpan={4} className="py-6 text-center text-slate-500">
                    Tidak ada data
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};


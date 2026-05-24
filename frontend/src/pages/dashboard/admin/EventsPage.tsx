import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";

type CategoryEvent = { id: number; name: string };
type Pembicara = { id: number; nama: string };

type Event = {
  id: number;
  judul: string;
  deskripsi?: string | null;
  tanggalWaktu?: string | null;
  lokasi?: string | null;
  categoryEventId: number;
  pembicaraId: number;
  categoryEvent?: CategoryEvent;
  pembicara?: Pembicara;
};

export const EventsPage = () => {
  const { token, isHydrated } = useAuth();
  const [loading, setLoading] = useState(false);

  const [events, setEvents] = useState<Event[]>([]);
  const [categoryEvents, setCategoryEvents] = useState<CategoryEvent[]>([]);
  const [speakers, setSpeakers] = useState<Pembicara[]>([]);

  const [judul, setJudul] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [tanggalWaktu, setTanggalWaktu] = useState("");
  const [lokasi, setLokasi] = useState("");
  const [categoryEventId, setCategoryEventId] = useState<number | "">("");
  const [pembicaraId, setPembicaraId] = useState<number | "">("");
  const [editingId, setEditingId] = useState<number | null>(null);

  const fetchAll = async () => {
    if (!token) return;
    setLoading(true);
    try {
      const [ev, cats, sp] = await Promise.all([
        fetch(`http://localhost:3005/admin-crud/events`, {
          headers: { Authorization: `Bearer ${token}` },
        }).then((r) => r.json()),
        fetch(`http://localhost:3005/admin-crud/category-events`, {
          headers: { Authorization: `Bearer ${token}` },
        }).then((r) => r.json()),
        fetch(`http://localhost:3005/admin-crud/speakers`, {
          headers: { Authorization: `Bearer ${token}` },
        }).then((r) => r.json()),
      ]);

      setEvents(ev);
      setCategoryEvents(cats);
      setSpeakers(sp);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isHydrated) return;
    fetchAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, isHydrated]);

  const resetForm = () => {
    setEditingId(null);
    setJudul("");
    setDeskripsi("");
    setTanggalWaktu("");
    setLokasi("");
    setCategoryEventId("");
    setPembicaraId("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;

    if (!judul.trim()) return;
    if (categoryEventId === "" || pembicaraId === "") return;

    const base = `http://localhost:3005/admin-crud/events`;
    const url = editingId ? `${base}/${editingId}` : base;
    const method = editingId ? "PUT" : "POST";

    await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        judul,
        deskripsi: deskripsi.trim() || null,
        tanggalWaktu: tanggalWaktu || null,
        lokasi: lokasi.trim() || null,
        categoryEventId,
        pembicaraId,
      }),
    }).then(async (r) => {
      if (!r.ok) throw new Error(await r.text());
    });

    resetForm();
    await fetchAll();
  };

  const handleEdit = (it: Event) => {
    setEditingId(it.id);
    setJudul(it.judul ?? "");
    setDeskripsi(it.deskripsi ?? "");
    setTanggalWaktu(it.tanggalWaktu ? new Date(it.tanggalWaktu).toISOString().slice(0, 16) : "");
    setLokasi(it.lokasi ?? "");
    setCategoryEventId(it.categoryEventId);
    setPembicaraId(it.pembicaraId);
  };

  const handleDelete = async (id: number) => {
    if (!token) return;
    if (!confirm("Hapus event ini?")) return;

    await fetch(`http://localhost:3005/admin-crud/events/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    }).then(async (r) => {
      if (!r.ok) throw new Error(await r.text());
    });

    await fetchAll();
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Event</h1>

      <form onSubmit={handleSubmit} className="bg-white p-4 rounded-xl shadow-sm space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-slate-700">Judul</label>
            <input
              value={judul}
              onChange={(e) => setJudul(e.target.value)}
              className="mt-1 w-full px-3 py-2 border rounded-lg"
              placeholder="Judul event"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-slate-700">Deskripsi</label>
            <textarea
              value={deskripsi}
              onChange={(e) => setDeskripsi(e.target.value)}
              className="mt-1 w-full px-3 py-2 border rounded-lg"
              placeholder="Deskripsi singkat"
              rows={3}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700">Tanggal & Jam</label>
            <input
              type="datetime-local"
              value={tanggalWaktu}
              onChange={(e) => setTanggalWaktu(e.target.value)}
              className="mt-1 w-full px-3 py-2 border rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700">Lokasi</label>
            <input
              value={lokasi}
              onChange={(e) => setLokasi(e.target.value)}
              className="mt-1 w-full px-3 py-2 border rounded-lg"
              placeholder="Lokasi event"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700">Kategori Event</label>
            <select
              value={categoryEventId}
              onChange={(e) => setCategoryEventId(e.target.value === "" ? "" : Number(e.target.value))}
              className="mt-1 w-full px-3 py-2 border rounded-lg"
            >
              <option value="">-- pilih kategori --</option>
              {categoryEvents.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700">Pembicara</label>
            <select
              value={pembicaraId}
              onChange={(e) => setPembicaraId(e.target.value === "" ? "" : Number(e.target.value))}
              className="mt-1 w-full px-3 py-2 border rounded-lg"
            >
              <option value="">-- pilih pembicara --</option>
              {speakers.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.nama}
                </option>
              ))}
            </select>
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
            <button type="button" onClick={resetForm} className="px-4 py-2 bg-slate-200 rounded-lg font-semibold">
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
                <th className="py-2">Judul</th>
                <th className="py-2">Kategori</th>
                <th className="py-2">Pembicara</th>
                <th className="py-2">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {events.map((it) => (
                <tr key={it.id} className="border-t">
                  <td className="py-2">{it.id}</td>
                  <td className="py-2">{it.judul}</td>
                  <td className="py-2">{it.categoryEvent?.name ?? it.categoryEventId}</td>
                  <td className="py-2">{it.pembicara?.nama ?? it.pembicaraId}</td>
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
              {events.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-6 text-center text-slate-500">
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


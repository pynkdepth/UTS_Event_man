import { useEffect, useState } from "react";
import { } from "@/services/api";
import { useAuth } from "@/hooks/useAuth";

type CategoryEvent = {
  id: number;
  name: string;
  createdAt?: string;
};



export const CategoryEventsPage = () => {
  const { token, isHydrated } = useAuth();
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState<CategoryEvent[]>([]);

  const [name, setName] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);

  const fetchAll = async () => {
    if (!token) return;
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:3005/admin-crud/category-events`, {
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

    if (!name.trim()) return;

    const base = `http://localhost:3005/admin-crud/category-events`;
    const url = editingId ? `${base}/${editingId}` : base;
    const method = editingId ? "PUT" : "POST";

    await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name }),
    }).then(async (r) => {
      if (!r.ok) throw new Error(await r.text());
    });

    setName("");
    setEditingId(null);
    await fetchAll();
  };

  const handleEdit = (it: CategoryEvent) => {
    setEditingId(it.id);
    setName(it.name);
  };

  const handleDelete = async (id: number) => {
    if (!token) return;
    if (!confirm("Hapus category event ini?")) return;

    await fetch(`http://localhost:3005/admin-crud/category-events/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    }).then(async (r) => {
      if (!r.ok) throw new Error(await r.text());
    });

    if (editingId === id) {
      setEditingId(null);
      setName("");
    }

    await fetchAll();
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Category Events</h1>

      <form onSubmit={handleSubmit} className="bg-white p-4 rounded-xl shadow-sm space-y-3">
        <div className="flex gap-3 items-end">
          <div className="flex-1">
            <label className="block text-sm font-medium text-slate-700">Nama</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 w-full px-3 py-2 border rounded-lg"
              placeholder="Contoh: Seminar"
            />
          </div>
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
                setName("");
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
                <th className="py-2">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {items.map((it) => (
                <tr key={it.id} className="border-t">
                  <td className="py-2">{it.id}</td>
                  <td className="py-2">{it.name}</td>
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
                  <td colSpan={3} className="py-6 text-center text-slate-500">
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


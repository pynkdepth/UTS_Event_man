# TODO - Implementasi CategoryEvent, Pembicara, Event + CRUD + Auth & UI

## Langkah 1: Prisma Schema & Migrasi

- [ ] Ubah `backend/prisma/schema.prisma`:
  - [ ] set `datasource db provider` sesuai Supabase (Postgres)
  - [ ] tambah model: `CategoryEvent`, `Pembicara`, `Event` dengan FK
- [ ] Buat migrasi Prisma dan verifikasi berhasil

## Langkah 2: Backend CRUD API

- [ ] Buat controller CRUD untuk 3 entitas
- [ ] Tambahkan routes admin untuk CRUD
- [ ] Pastikan `Event` menerima `categoryEventId` dan `speakerId`

## Langkah 3: Auth NIM/Password + Protected Routes

- [ ] Buat endpoint backend untuk login NIM/Password dan menghasilkan JWT admin
- [ ] Ubah `frontend/src/pages/LoginPage.tsx` menjadi input NIM & Password
- [ ] Ubah `frontend/src/hooks/useAuth.ts` supaya login via NIM/Password dan simpan token
- [ ] Implementasikan `ProtectedRoute` untuk mengunci halaman `/dashboard/*`

## Langkah 4: Frontend CRUD UI

- [ ] Tambah halaman dashboard:
  - [ ] `dashboard/admin/categories-events`
  - [ ] `dashboard/admin/speakers`
  - [ ] `dashboard/admin/events`
- [ ] Buat UI list + form tambah/edit + delete
- [ ] Implement dropdown dinamis untuk form Event (kategori & pembicara)

## Langkah 5: Menu Biodata

- [ ] Buat halaman `Biodata` dan routing + menu di sidebar

## Testing

- [ ] Jalankan backend dan lakukan smoke test endpoint CRUD
- [ ] Jalankan frontend dan uji flow login -> masuk dashboard -> CRUD

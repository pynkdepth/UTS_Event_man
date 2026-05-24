Prisma config untuk migrasi.

Jika Prisma CLI mengeluh datasource.url tidak didukung di schema.prisma, pastikan:

- datasource url sudah dihapus dari backend/prisma/schema.prisma
- prisma.config.ts ada di backend/prisma.config.ts (atau set --config)

Silakan jalankan:

- npx prisma migrate dev --name <nama>

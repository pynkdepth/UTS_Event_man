import 'dotenv/config'; // <-- PAKSA LOAD DI BARIS PALING ATAS
import { defineConfig } from '@prisma/config';

export default defineConfig({
  // Kita daftarkan secara eksplisit ke config Prisma v6
  datasource: {
    url: process.env.DATABASE_URL as string,
  },
  migrations: {
    seed: 'node seed.js', // Kita sekalian luruskan jalur seed-nya ke root backend
  },
});
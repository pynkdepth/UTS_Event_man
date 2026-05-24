const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('password123', 10); 

  const admin = await prisma.admin.upsert({
    // Tetap cari berdasarkan email bawaannya agar Prisma tidak error
    where: { email: 'admin@example.com' }, 
    update: {
      // Jika sudah ada, kita paksa update NIM dan password-nya ke yang baru
      nim: '24090034',
      password: hashedPassword,
    },
    create: {
      email: 'admin@example.com',
      nim: '24090034',
      password: hashedPassword,
    },
  });

  console.log('Admin sukses di-update dengan NIM:', admin);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
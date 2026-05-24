-- CreateTable
CREATE TABLE "CategoryEvent" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CategoryEvent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pembicara" (
    "id" SERIAL NOT NULL,
    "nama" TEXT NOT NULL,
    "jabatan" TEXT,
    "fotoUrl" TEXT,
    "bio" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Pembicara_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Event" (
    "id" SERIAL NOT NULL,
    "judul" TEXT NOT NULL,
    "deskripsi" TEXT,
    "tanggalWaktu" TIMESTAMP(3),
    "lokasi" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "categoryEventId" INTEGER NOT NULL,
    "pembicaraId" INTEGER NOT NULL,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Event_categoryEventId_idx" ON "Event"("categoryEventId");

-- CreateIndex
CREATE INDEX "Event_pembicaraId_idx" ON "Event"("pembicaraId");

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_categoryEventId_fkey" FOREIGN KEY ("categoryEventId") REFERENCES "CategoryEvent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_pembicaraId_fkey" FOREIGN KEY ("pembicaraId") REFERENCES "Pembicara"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

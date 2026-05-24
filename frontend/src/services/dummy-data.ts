// File ini berisi data dummy untuk testing UI dashboard
// Anda bisa mengubah/menambah data di sini sesuai kebutuhan

/* ------------------------------------------------------------------ */
/* INTERFACE (Berdasarkan komponen dashboard Anda)                      */
/* ------------------------------------------------------------------ */

interface TalkshowData {
  id: number;
  fullName: string;
  category: "MAHASISWA" | "UMUM";
  whatsapp: string;
  institution: string;
  paymentUrl: string;
  igFollowUrl: string;
  nim: string;
  ktmUrl: string;
  status: "PENDING" | "VERIFIED";
}

interface SeminarData {
  id: number;
  fullName: string;
  category: "MAHASISWA" | "UMUM";
  whatsapp: string;
  institution: string;
  paymentUrl: string;
  igFollowUrl: string;
  nim: string;
  ktmUrl: string;
  status: "PENDING" | "VERIFIED";
}

interface WorkshopData {
  id: number;
  fullName: string;
  workshop: "UI/UX" | "WEB";
  category: "MAHASISWA" | "UMUM";
  whatsapp: string;
  institution: string;
  paymentUrl: string;
  igFollowUrl: string;
  nim: string;
  ktmUrl: string;
  status: "PENDING" | "VERIFIED";
}

/* ------------------------------------------------------------------ */
/* DATA DUMMY                                                         */
/* ------------------------------------------------------------------ */

export const dummyTalkshowData: TalkshowData[] = [
  {
    id: 1,
    fullName: "Agus Setiawan",
    category: "MAHASISWA",
    whatsapp: "081234567890",
    institution: "Universitas Negeri",
    paymentUrl: "https://placehold.co/600x400.png?text=BuktiBayar1",
    igFollowUrl: "https://placehold.co/600x400.png?text=BuktiFollow1",
    nim: "2100018100",
    ktmUrl: "https://placehold.co/600x400.png?text=BuktiKTM1",
    status: "PENDING",
  },
  {
    id: 2,
    fullName: "Budi Santoso",
    category: "UMUM",
    whatsapp: "082234567891",
    institution: "PT. Maju Jaya",
    paymentUrl: "https://placehold.co/600x400.png?text=BuktiBayar2",
    igFollowUrl: "https://placehold.co/600x400.png?text=BuktiFollow2",
    nim: "",
    ktmUrl: "",
    status: "VERIFIED",
  },
  {
    id: 3,
    fullName: "Citra Lestari",
    category: "MAHASISWA",
    whatsapp: "083234567892",
    institution: "Universitas Swasta",
    paymentUrl: "https://placehold.co/600x400.png?text=BuktiBayar3",
    igFollowUrl: "https://placehold.co/600x400.png?text=BuktiFollow3",
    nim: "2100018102",
    ktmUrl: "https://placehold.co/600x400.png?text=BuktiKTM3",
    status: "PENDING",
  },
];

export const dummySeminarData: SeminarData[] = [
  {
    id: 1,
    fullName: "Diana Permata",
    category: "UMUM",
    whatsapp: "081111111111",
    institution: "Umum",
    paymentUrl: "https://placehold.co/600x400.png?text=BuktiBayar1",
    igFollowUrl: "https://placehold.co/600x400.png?text=BuktiFollow1",
    nim: "",
    ktmUrl: "",
    status: "VERIFIED",
  },
  {
    id: 2,
    fullName: "Eko Prasetyo",
    category: "MAHASISWA",
    whatsapp: "082222222222",
    institution: "Universitas Merdeka",
    paymentUrl: "https://placehold.co/600x400.png?text=BuktiBayar2",
    igFollowUrl: "https://placehold.co/600x400.png?text=BuktiFollow2",
    nim: "3100018100",
    ktmUrl: "https://placehold.co/600x400.png?text=BuktiKTM2",
    status: "PENDING",
  },
];

export const dummyWorkshopData: WorkshopData[] = [
  {
    id: 1,
    fullName: "Fajar Nugroho",
    workshop: "UI/UX",
    category: "MAHASISWA",
    whatsapp: "081333333333",
    institution: "Universitas Koding",
    paymentUrl: "https://placehold.co/600x400.png?text=BuktiBayar1",
    igFollowUrl: "https://placehold.co/600x400.png?text=BuktiFollow1",
    nim: "4100018100",
    ktmUrl: "https://placehold.co/600x400.png?text=BuktiKTM1",
    status: "PENDING",
  },
  {
    id: 2,
    fullName: "Gita Cahyani",
    workshop: "WEB",
    category: "MAHASISWA",
    whatsapp: "081444444444",
    institution: "Universitas Koding",
    paymentUrl: "https://placehold.co/600x400.png?text=BuktiBayar2",
    igFollowUrl: "https://placehold.co/600x400.png?text=BuktiFollow2",
    nim: "4100018101",
    ktmUrl: "https://placehold.co/600x400.png?text=BuktiKTM2",
    status: "VERIFIED",
  },
  {
    id: 3,
    fullName: "Hendra Wijaya",
    workshop: "UI/UX",
    category: "UMUM",
    whatsapp: "081555555555",
    institution: "Desain Studio",
    paymentUrl: "https://placehold.co/600x400.png?text=BuktiBayar3",
    igFollowUrl: "https://placehold.co/600x400.png?text=BuktiFollow3",
    nim: "",
    ktmUrl: "",
    status: "PENDING",
  },
];
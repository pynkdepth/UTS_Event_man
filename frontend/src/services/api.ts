const API_BASE_URL = "" + import.meta.env.VITE_API_URL;

const handleResponse = async (res: Response) => {
  const text = await res.text(); // baca sekali

  if (!res.ok) {
    let msg = `HTTP ${res.status}`;
    try {
      const json = JSON.parse(text);
      msg = json.message ?? json.error ?? msg;
    } catch {
      msg = text.slice(0, 200) || msg;
    }
    throw new Error(msg);
  }

  if (!text) return null;

  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
};

/* ------------------------------------------------------------------ */
/* Auth API                                                           */
/* ------------------------------------------------------------------ */
export const authAPI = {
  login: (email: string, password: string) =>
    fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    }).then(handleResponse),
};

/* ------------------------------------------------------------------ */
/* Competition API (public)                                           */
/* ------------------------------------------------------------------ */
export const competitionAPI = {
  register: (formData: FormData) =>
    fetch(`${API_BASE_URL}/competition/regist`, {
      method: "POST",
      body: formData,
    }).then(handleResponse),
};

/* ------------------------------------------------------------------ */
/* Event API (public)                                                 */
/* ------------------------------------------------------------------ */
export const eventAPI = {
  registerSeminar: (formData: FormData) =>
    fetch(`${API_BASE_URL}/event/seminar`, {
      method: "POST",
      body: formData,
    }).then(handleResponse),

  registerWorkshop: (formData: FormData) =>
    fetch(`${API_BASE_URL}/event/workshop`, {
      method: "POST",
      body: formData,
    }).then(handleResponse),

  registerTalkshow: (formData: FormData) =>
    fetch(`${API_BASE_URL}/event/talkshow`, {
      method: "POST",
      body: formData,
    }).then(handleResponse),
};

/* ------------------------------------------------------------------ */
/* Admin API                                                          */
/* ------------------------------------------------------------------ */
const adminHeader = (token: string) => ({ Authorization: `Bearer ${token}` });

export const adminAPI = {
  login: (email: string, password: string) =>
    fetch(`${API_BASE_URL}/auth-admin/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    }).then(handleResponse),

  logout: (token: string) =>
    fetch(`${API_BASE_URL}/auth-admin/logout`, {
      method: "POST",
      headers: adminHeader(token),
    }).then(handleResponse),

  getParticipants: (
    token: string,
    competition?: string,
    degree?: string,
    participantType?: string
  ) => {
    const q = new URLSearchParams();
    if (competition) q.set("competition", competition);
    if (degree) q.set("degree", degree);
    if (participantType) q.set("participantType", participantType);
    return fetch(`${API_BASE_URL}/admin/participants?${q}`, {
      headers: adminHeader(token),
    }).then(handleResponse);
  },

  getSeminar: (token: string) =>
    fetch(`${API_BASE_URL}/admin/seminar`, {
      headers: adminHeader(token),
    }).then(handleResponse),

  getWorkshop: (token: string) =>
    fetch(`${API_BASE_URL}/admin/workshop`, {
      headers: adminHeader(token),
    }).then(handleResponse),

  getTalkshow: (token: string) =>
    fetch(`${API_BASE_URL}/admin/talkshow`, {
      headers: adminHeader(token),
    }).then(handleResponse),

  /* --- (BARU) Fungsi Aksi (Delete & Verify) --- */
  // Seminar Actions
  deleteSeminar: (id: number, token: string) =>
    fetch(`${API_BASE_URL}/admin/seminar/${id}`, {
      method: "DELETE",
      headers: adminHeader(token),
    }).then(handleResponse),

  verifySeminar: (id: number, token: string) =>
    fetch(`${API_BASE_URL}/admin/seminar/${id}/verify`, { // Asumsi endpoint
      method: "PATCH",
      headers: adminHeader(token),
    }).then(handleResponse),

  // Workshop Actions
  deleteWorkshop: (id: number, token: string) =>
    fetch(`${API_BASE_URL}/admin/workshop/${id}`, {
      method: "DELETE",
      headers: adminHeader(token),
    }).then(handleResponse),

  verifyWorkshop: (id: number, token: string) =>
    fetch(`${API_BASE_URL}/admin/workshop/${id}/verify`, { // Asumsi endpoint
      method: "PATCH",
      headers: adminHeader(token),
    }).then(handleResponse),

  // Talkshow Actions
  deleteTalkshow: (id: number, token: string) =>
    fetch(`${API_BASE_URL}/admin/talkshow/${id}`, {
      method: "DELETE",
      headers: adminHeader(token),
    }).then(handleResponse),

  verifyTalkshow: (id: number, token: string) =>
    fetch(`${API_BASE_URL}/admin/talkshow/${id}/verify`, { // Asumsi endpoint
      method: "PATCH",
      headers: adminHeader(token),
    }).then(handleResponse),
  /* --- Akhir Fungsi Aksi --- */

  /* ---------------------------------------------------------- */
  /*  Perbaikan utama: pakai enum value POSTER / UIUX / WEB     */
  /* ---------------------------------------------------------- */
  getCompetition: (token: string, competition: "POSTER" | "UIUX" | "WEB") =>
    fetch(`${API_BASE_URL}/admin/competition/${competition}`, {
      headers: adminHeader(token),
    }).then(handleResponse),

  getDashboardStats: (token: string) =>
    fetch(`${API_BASE_URL}/admin/dashboard`, {
      headers: adminHeader(token),
    }).then(handleResponse),
};
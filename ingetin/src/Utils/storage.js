const STORAGE_KEY = "ingetin_hafalan";

// Hafalan sekarang berbentuk object: { surat, ayatMulai, ayatAkhir, tipe }
// Ambil semua hafalan
export function getHafalan() {
  return JSON.parse(localStorage.getItem("hafalanList") || "[]");
}

// Tambah hafalan baru dengan id unik
export function saveHafalan(hafalan) {
  const list = JSON.parse(localStorage.getItem("hafalanList") || "[]");
  list.push({ ...hafalan, id: Date.now() });
  localStorage.setItem("hafalanList", JSON.stringify(list));
}

// Hapus hafalan pakai id
export function deleteHafalan(id) {
  let list = JSON.parse(localStorage.getItem("hafalanList") || "[]");
  list = list.filter(h => h.id !== id);
  localStorage.setItem("hafalanList", JSON.stringify(list));
}

// Update hafalan pakai id
export function updateHafalan(id, updatedHafalan) {
  let list = JSON.parse(localStorage.getItem("hafalanList") || "[]");
  list = list.map(h => (h.id === id ? { ...h, ...updatedHafalan } : h));
  localStorage.setItem("hafalanList", JSON.stringify(list));
}

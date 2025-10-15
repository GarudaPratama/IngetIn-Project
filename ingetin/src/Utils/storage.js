const STORAGE_KEY = "ingetin_hafalan";

// Hafalan sekarang berbentuk object: { surat, ayatMulai, ayatAkhir, tipe }
export function saveHafalan(hafalanObj) {
  const existing = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  existing.push(hafalanObj);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
}

export function getHafalan() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

export function deleteHafalan(index) {
  const existing = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  existing.splice(index, 1);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
}

export function updateHafalan(index, newHafalanObj) {
  const existing = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  if (index >= 0 && index < existing.length) {
    existing[index] = newHafalanObj;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
  }
}

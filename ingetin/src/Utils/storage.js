const KEY = "hafalan_list_ingetin"; // semua fungsi pakai ini!

export const getHafalan = () => {
  const data = localStorage.getItem(KEY);
  return data ? JSON.parse(data) : [];
};

export const saveHafalan = (hafalan) => {
  const list = getHafalan();
  const updated = [...list, hafalan];
  localStorage.setItem(KEY, JSON.stringify(updated));
};

export const deleteHafalan = (id) => {
  const list = getHafalan().filter((item) => item.id !== id);
  localStorage.setItem(KEY, JSON.stringify(list));
};

export const updateHafalan = (id, updatedData) => {
  const list = getHafalan().map((item) =>
    item.id === id ? { ...item, ...updatedData } : item
  );
  localStorage.setItem(KEY, JSON.stringify(list));
};

// 🔽 Tambahkan export/import biar App bisa pakai
export const exportHafalan = () => {
  const list = getHafalan();
  const blob = new Blob([JSON.stringify(list, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "hafalan_backup.json";
  a.click();
  URL.revokeObjectURL(url);
};

export const importHafalan = (file, callback) => {
  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const data = JSON.parse(e.target.result);
      if (Array.isArray(data)) {
        localStorage.setItem(KEY, JSON.stringify(data));
        callback(true);
      } else callback(false);
    } catch {
      callback(false);
    }
  };
  reader.readAsText(file);
};

import React, { useState } from "react";
import { saveHafalan } from "../Utils/storage.js";
import toast, { Toaster } from "react-hot-toast";

function HafalanForms({ onAdd }) {
  // Ziyadah
  const [suratMulai, setSuratMulai] = useState("");
  const [ayatMulai, setAyatMulai] = useState("");
  const [suratAkhir, setSuratAkhir] = useState("");
  const [ayatAkhir, setAyatAkhir] = useState("");

  // Murojaah
  const [juzMulai, setJuzMulai] = useState("");
  const [juzAkhir, setJuzAkhir] = useState("");
  const [extraMurojaah, setExtraMurojaah] = useState("1/4");

  const handleSubmitZiyadah = (e) => {
    e.preventDefault();
    if (!suratMulai || !ayatMulai || !suratAkhir || !ayatAkhir) return toast.error("Semua field Ziyadah harus diisi!");
    saveHafalan({ type: "Ziyadah", suratMulai, ayatMulai, suratAkhir, ayatAkhir });
    setSuratMulai(""); setAyatMulai(""); setSuratAkhir(""); setAyatAkhir("");
    toast.success("Hafalan Ziyadah berhasil ditambahkan!");
    if (onAdd) onAdd();
  };

  const handleSubmitMurojaah = (e) => {
    e.preventDefault();
    if (!juzMulai || !juzAkhir) return toast.error("Semua field Murojaah harus diisi!");
    saveHafalan({ type: "Murojaah", juzMulai, juzAkhir, extraMurojaah });
    setJuzMulai(""); setJuzAkhir(""); setExtraMurojaah("1/4");
    toast.success("Hafalan Murojaah berhasil ditambahkan!");
    if (onAdd) onAdd();
  };

  return (
    <div className="flex flex-col gap-6">
      <Toaster position="top-right" reverseOrder={false} />

      {/* Ziyadah */}
      <form onSubmit={handleSubmitZiyadah} className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-shadow flex flex-col gap-4">
        <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-green-400">
          Tambah Hafalan Ziyadah
        </h2>
        <div className="grid grid-cols-2 gap-2">
          <input type="text" value={suratMulai} onChange={(e) => setSuratMulai(e.target.value)} placeholder="Surat Mulai" className="border border-gray-300 dark:border-gray-700 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400" />
          <input type="number" value={ayatMulai} onChange={(e) => setAyatMulai(e.target.value)} placeholder="Ayat Mulai" className="border border-gray-300 dark:border-gray-700 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400" />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <input type="text" value={suratAkhir} onChange={(e) => setSuratAkhir(e.target.value)} placeholder="Surat Akhir" className="border border-gray-300 dark:border-gray-700 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400" />
          <input type="number" value={ayatAkhir} onChange={(e) => setAyatAkhir(e.target.value)} placeholder="Ayat Akhir" className="border border-gray-300 dark:border-gray-700 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400" />
        </div>
        <button type="submit" className="bg-emerald-600 text-white px-5 py-2 rounded-xl hover:bg-emerald-700 dark:hover:bg-emerald-500 transition-colors font-semibold text-lg">Simpan Ziyadah</button>
      </form>

      {/* Murojaah */}
      <form onSubmit={handleSubmitMurojaah} className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-shadow flex flex-col gap-4">
        <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-green-400">
          Tambah Hafalan Murojaah
        </h2>
        <div className="flex gap-2">
          <input type="number" value={juzMulai} onChange={(e) => setJuzMulai(e.target.value)} placeholder="Juz Mulai" className="border border-gray-300 dark:border-gray-700 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400 flex-1" />
          <input type="number" value={juzAkhir} onChange={(e) => setJuzAkhir(e.target.value)} placeholder="Juz Akhir" className="border border-gray-300 dark:border-gray-700 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400 flex-1" />
        </div>
        {juzMulai && juzAkhir && (parseFloat(juzAkhir) - parseFloat(juzMulai) < 1) && (
          <select value={extraMurojaah} onChange={(e) => setExtraMurojaah(e.target.value)} className="border border-gray-300 dark:border-gray-700 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400 w-32">
            <option value="1/4">1/4 Juz</option>
            <option value="1/2">1/2 Juz</option>
          </select>
        )}
        <button type="submit" className="bg-emerald-600 text-white px-5 py-2 rounded-xl hover:bg-emerald-700 dark:hover:bg-emerald-500 transition-colors font-semibold text-lg">Simpan Murojaah</button>
      </form>
    </div>
  );
}

export default HafalanForms;

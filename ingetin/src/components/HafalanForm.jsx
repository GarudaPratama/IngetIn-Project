import React, { useState } from "react";
import { saveHafalan } from "../Utils/storage.js";
import toast, { Toaster } from "react-hot-toast";

function HafalanForm({ onAdd }) {
  const [surat, setSurat] = useState("");
  const [ayatMulai, setAyatMulai] = useState("");
  const [ayatAkhir, setAyatAkhir] = useState("");
  const [tipe, setTipe] = useState("Murojaah");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!surat.trim() || !ayatMulai || !ayatAkhir) {
      return toast.error("Semua field harus diisi!");
    }
    if (parseInt(ayatMulai) > parseInt(ayatAkhir)) {
      return toast.error("Ayat mulai tidak boleh lebih besar dari ayat akhir!");
    }

    saveHafalan({ surat, ayatMulai, ayatAkhir, tipe });
    setSurat(""); setAyatMulai(""); setAyatAkhir(""); setTipe("Murojaah");
    toast.success("Hafalan berhasil ditambahkan!");
    if (onAdd) onAdd();
  };

  return (
    <div className="mb-6">
      <Toaster position="top-right" reverseOrder={false} />
      <form
        onSubmit={handleSubmit}
        className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-shadow flex flex-col gap-4"
      >
        {/* <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-green-400">
          Tambah Hafalan Baru
        </h2> */}
        <input
          type="text"
          value={surat}
          onChange={(e) => setSurat(e.target.value)}
          placeholder="Surat"
          className="border border-gray-300 dark:border-gray-700 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400"
        />
        <div className="flex gap-2">
          <input
            type="number"
            value={ayatMulai}
            onChange={(e) => setAyatMulai(e.target.value)}
            placeholder="Ayat Mulai"
            className="border border-gray-300 dark:border-gray-700 rounded-lg p-2 flex-1 focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400"
          />
          <input
            type="number"
            value={ayatAkhir}
            onChange={(e) => setAyatAkhir(e.target.value)}
            placeholder="Ayat Akhir"
            className="border border-gray-300 dark:border-gray-700 rounded-lg p-2 flex-1 focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400"
          />
        </div>
        <select
          value={tipe}
          onChange={(e) => setTipe(e.target.value)}
          className="border border-gray-300 dark:border-gray-700 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400"
        >
          <option value="Murojaah">Murojaah</option>
          <option value="Ziyadah">Ziyadah</option>
        </select>
        <button
          type="submit"
          className="bg-emerald-600 text-white px-5 py-2 rounded-xl hover:bg-emerald-700 dark:hover:bg-emerald-500 transition-colors font-semibold text-lg"
        >
          Simpan Hafalan
        </button>
      </form>
    </div>
  );
}

export default HafalanForm;

import React, { useState } from "react";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import { saveHafalan } from "../Utils/storage.js";

function HafalanForms({ onAdd }) {
  const [ziyadah, setZiyadah] = useState({
    suratMulai: "",
    ayatMulai: "",
    suratAkhir: "",
    ayatAkhir: "",
    reminder: "", // ADDED
  });

  const [murojaah, setMurojaah] = useState({
    juzMulai: "",
    juzAkhir: "",
    extraMurojaah: "",
    reminder: "", // ADDED
  });

  const handleSubmitZiyadah = (e) => {
    e.preventDefault();
    const data = {
      id: Date.now(),
      type: "Ziyadah",
      ...ziyadah,
      status: "belum", // ADDED
      date: new Date().toISOString(),
    };
    saveHafalan(data);
    onAdd();
    setZiyadah({
      suratMulai: "",
      ayatMulai: "",
      suratAkhir: "",
      ayatAkhir: "",
      reminder: "",
    });
    Swal.fire({
      icon: "success",
      title: "Ziyadah ditambahkan!",
      confirmButtonColor: "#10B981",
    });
  };

  const handleSubmitMurojaah = (e) => {
    e.preventDefault();
    let finalData = { ...murojaah };
    if (murojaah.juzMulai !== murojaah.juzAkhir) {
      finalData.extraMurojaah = "";
    }

    const data = {
      id: Date.now(),
      type: "Murojaah",
      ...finalData,
      status: "belum", // ADDED
      date: new Date().toISOString(),
    };

    saveHafalan(data);
    onAdd();
    setMurojaah({
      juzMulai: "",
      juzAkhir: "",
      extraMurojaah: "",
      reminder: "",
    });
    Swal.fire({
      icon: "success",
      title: "Murojaah ditambahkan!",
      confirmButtonColor: "#10B981",
    });
  };

  const isSameJuz = murojaah.juzMulai === murojaah.juzAkhir && murojaah.juzMulai !== "";

  const inputClass =
    "w-full p-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-emerald-500 outline-none transition-all";

  const labelClass = "text-sm font-medium text-gray-700 dark:text-gray-300 mb-1";

  return (
    <div className="grid md:grid-cols-2 gap-6 mt-6">
      {/* ---------------- Ziyadah Form ---------------- */}
      <motion.form
        onSubmit={handleSubmitZiyadah}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-850 p-6 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700"
      >
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
          🕋 Tambah Ziyadah
        </h2>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Surat Mulai</label>
            <input
              type="text"
              value={ziyadah.suratMulai}
              onChange={(e) => setZiyadah({ ...ziyadah, suratMulai: e.target.value })}
              className={inputClass}
              required
            />
          </div>
          <div>
            <label className={labelClass}>Surat Akhir</label>
            <input
              type="text"
              value={ziyadah.suratAkhir}
              onChange={(e) => setZiyadah({ ...ziyadah, suratAkhir: e.target.value })}
              className={inputClass}
              required
            />
          </div>
          <div>
            <label className={labelClass}>Ayat Mulai</label>
            <input
              type="number"
              value={ziyadah.ayatMulai}
              onChange={(e) => setZiyadah({ ...ziyadah, ayatMulai: e.target.value })}
              className={inputClass}
              required
            />
          </div>
          <div>
            <label className={labelClass}>Ayat Akhir</label>
            <input
              type="number"
              value={ziyadah.ayatAkhir}
              onChange={(e) => setZiyadah({ ...ziyadah, ayatAkhir: e.target.value })}
              className={inputClass}
              required
            />
          </div>

          {/* ADDED: Waktu Pengingat */}
          <div className="col-span-2">
            <label className={labelClass}>Waktu Pengingat</label>
            <input
              type="datetime-local"
              value={ziyadah.reminder}
              onChange={(e) => setZiyadah({ ...ziyadah, reminder: e.target.value })}
              className={inputClass}
              required
            />
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          className="w-full mt-5 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg font-medium shadow-sm hover:shadow-md transition-all"
        >
          Simpan Ziyadah
        </motion.button>
      </motion.form>

      {/* ---------------- Murojaah Form ---------------- */}
      <motion.form
        onSubmit={handleSubmitMurojaah}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-850 p-6 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700"
      >
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
          📖 Tambah Murojaah
        </h2>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Juz Mulai</label>
            <input
              type="number"
              value={murojaah.juzMulai}
              onChange={(e) => setMurojaah({ ...murojaah, juzMulai: e.target.value })}
              className={inputClass}
              required
            />
          </div>
          <div>
            <label className={labelClass}>Juz Akhir</label>
            <input
              type="number"
              value={murojaah.juzAkhir}
              onChange={(e) => setMurojaah({ ...murojaah, juzAkhir: e.target.value })}
              className={inputClass}
              required
            />
          </div>
        </div>

        <div className="mt-4">
          <label className={labelClass}>Tambahan (Opsional)</label>
          <select
            value={murojaah.extraMurojaah}
            onChange={(e) => {
              if (!isSameJuz) {
                Swal.fire({
                  icon: "info",
                  text: "Tambahan hanya bisa dipilih jika Juz Mulai dan Akhir sama!",
                  confirmButtonColor: "#10B981",
                });
                return;
              }
              setMurojaah({ ...murojaah, extraMurojaah: e.target.value });
            }}
            disabled={!isSameJuz}
            className={`${inputClass} ${!isSameJuz ? "opacity-60 cursor-not-allowed" : ""}`}
          >
            <option value="">Pilih</option>
            <option value="1/4">1/4 Juz</option>
            <option value="1/2">1/2 Juz</option>
          </select>
        </div>

        {/* ADDED: Waktu Pengingat */}
        <div className="mt-4">
          <label className={labelClass}>Waktu Pengingat</label>
          <input
            type="datetime-local"
            value={murojaah.reminder}
            onChange={(e) => setMurojaah({ ...murojaah, reminder: e.target.value })}
            className={inputClass}
            required
          />
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          className="w-full mt-5 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg font-medium shadow-sm hover:shadow-md transition-all"
        >
          Simpan Murojaah
        </motion.button>
      </motion.form>
    </div>
  );
}

export default HafalanForms;

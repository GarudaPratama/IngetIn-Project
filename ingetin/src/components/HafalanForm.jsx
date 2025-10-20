import React, { useState } from "react";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import ZiyadahWizard from "./ZiyadahWizard";
import { saveHafalan } from "../Utils/storage";

function HafalanForm({ onAdd }) {
  const [murojaah, setMurojaah] = useState({
    juzMulai: "",
    juzAkhir: "",
    extraMurojaah: "",
    reminder: "",
  });

  const handleSubmitMurojaah = (e) => {
    e.preventDefault();

    if (!murojaah.juzMulai || !murojaah.juzAkhir) {
      Swal.fire({
        icon: "error",
        title: "Juz belum lengkap",
        text: "Isi Juz mulai dan Juz akhir dengan benar!",
        confirmButtonColor: "#ef4444",
      });
      return;
    }

    const data = {
      id: Date.now(),
      type: "Murojaah",
      ...murojaah,
      status: "belum",
      date: new Date().toISOString(),
    };

    saveHafalan(data);
    onAdd && onAdd();

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

  return (
    <div className="grid md:grid-cols-2 gap-6 mt-6">
      {/* ---------------- Ziyadah Wizard ---------------- */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl bg-white dark:bg-gray-800 shadow-md border border-gray-200 dark:border-gray-700 p-6"
      >
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
          🕋 Tambah Ziyadah
        </h2>

        <ZiyadahWizard onAdd={onAdd} />
      </motion.div>

      {/* ---------------- Murojaah Form ---------------- */}
      <motion.form
        onSubmit={handleSubmitMurojaah}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl bg-white dark:bg-gray-800 shadow-md border border-gray-200 dark:border-gray-700 p-6"
      >
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
          📖 Tambah Murojaah
        </h2>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Juz Mulai
            </label>
            <input
              type="number"
              min="1"
              max="30"
              value={murojaah.juzMulai}
              onChange={(e) =>
                setMurojaah({ ...murojaah, juzMulai: e.target.value })
              }
              className="w-full p-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 outline-none focus:ring-2 focus:ring-emerald-500"
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Juz Akhir
            </label>
            <input
              type="number"
              min="1"
              max="30"
              value={murojaah.juzAkhir}
              onChange={(e) =>
                setMurojaah({ ...murojaah, juzAkhir: e.target.value })
              }
              className="w-full p-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 outline-none focus:ring-2 focus:ring-emerald-500"
              required
            />
          </div>
        </div>

        <div className="mt-4">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Tambahan (Opsional)
          </label>
          <select
            value={murojaah.extraMurojaah}
            onChange={(e) =>
              setMurojaah({ ...murojaah, extraMurojaah: e.target.value })
            }
            className="w-full p-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="">Pilih</option>
            <option value="1/4">1/4 Juz</option>
            <option value="1/2">1/2 Juz</option>
          </select>
        </div>

        <div className="mt-4">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Waktu Pengingat
          </label>
          <input
            type="datetime-local"
            value={murojaah.reminder}
            onChange={(e) =>
              setMurojaah({ ...murojaah, reminder: e.target.value })
            }
            className="w-full p-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 outline-none focus:ring-2 focus:ring-emerald-500"
            required
          />
        </div>

        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="w-full mt-5 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg font-medium shadow-sm hover:shadow-md transition-all"
        >
          Simpan Murojaah
        </motion.button>
      </motion.form>
    </div>
  );
}

export default HafalanForm;

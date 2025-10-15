import React from "react";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import { deleteHafalan, updateHafalan } from "../Utils/storage.js";

function HafalanItem({ hafalan, index, onDelete }) {
  const handleDelete = () => {
    Swal.fire({
      title: "Hapus hafalan?",
      text: `${hafalan.surat} ayat ${hafalan.ayatMulai}-${hafalan.ayatAkhir} akan dihapus.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, hapus!",
      cancelButtonText: "Batal",
      customClass: { confirmButton: "swal-confirm", cancelButton: "swal-cancel" },
      background: document.documentElement.classList.contains("dark") ? "#1f2937" : "#ffffff",
      color: document.documentElement.classList.contains("dark") ? "#f9fafb" : "#111827",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteHafalan(index);
        if (onDelete) onDelete();
        Swal.fire({ title: "Dihapus!", icon: "success", confirmButtonColor: "#16a34a" });
      }
    });
  };

  const handleEdit = () => {
    Swal.fire({
      title: "Edit Hafalan",
      html: `
        <input id="swal-surat" class="swal2-input" placeholder="Surat" value="${hafalan.surat}">
        <input id="swal-ayatMulai" type="number" class="swal2-input" placeholder="Ayat Mulai" value="${hafalan.ayatMulai}">
        <input id="swal-ayatAkhir" type="number" class="swal2-input" placeholder="Ayat Akhir" value="${hafalan.ayatAkhir}">
        <select id="swal-tipe" class="swal2-select">
          <option value="Murojaah" ${hafalan.tipe==="Murojaah"?"selected":""}>Murojaah</option>
          <option value="Ziyadah" ${hafalan.tipe==="Ziyadah"?"selected":""}>Ziyadah</option>
        </select>
      `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: "Simpan",
      cancelButtonText: "Batal",
      preConfirm: () => {
        const surat = document.getElementById("swal-surat").value;
        const ayatMulai = document.getElementById("swal-ayatMulai").value;
        const ayatAkhir = document.getElementById("swal-ayatAkhir").value;
        const tipe = document.getElementById("swal-tipe").value;
        if (!surat || !ayatMulai || !ayatAkhir) Swal.showValidationMessage("Semua field harus diisi!");
        if (parseInt(ayatMulai) > parseInt(ayatAkhir)) Swal.showValidationMessage("Ayat mulai > Ayat akhir!");
        return { surat, ayatMulai, ayatAkhir, tipe };
      },
      customClass: { confirmButton: "swal-confirm", cancelButton: "swal-cancel" },
      background: document.documentElement.classList.contains("dark") ? "#1f2937" : "#ffffff",
      color: document.documentElement.classList.contains("dark") ? "#f9fafb" : "#111827",
    }).then((result) => {
      if (result.isConfirmed) {
        updateHafalan(index, result.value);
        if (onDelete) onDelete();
        Swal.fire({ title: "Tersimpan!", icon: "success", confirmButtonColor: "#16a34a" });
      }
    });
  };

  const badgeColor = hafalan.tipe === "Murojaah" ? "bg-emerald-500 text-white" : "bg-green-300 text-gray-900";

  return (
    <motion.li
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      whileHover={{ scale: 1.03, boxShadow: "0 15px 30px rgba(0,0,0,0.2)" }}
      className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border border-gray-200 dark:border-gray-700 rounded-2xl p-6 flex flex-col justify-between text-gray-900 dark:text-gray-100 transition-all"
    >
      {/* Header Card */}
      <div className="mb-4">
        <h3 className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 tracking-tight mb-1">{hafalan.surat}</h3>
        <p className="text-gray-700 dark:text-gray-300">Ayat: {hafalan.ayatMulai} - {hafalan.ayatAkhir}</p>
        <span
          className={`inline-block mt-2 px-3 py-1 rounded-full text-sm font-semibold ${badgeColor} transition-all duration-300 transform hover:scale-105`}
        >
          {hafalan.tipe}
        </span>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-3 mt-4">
        <motion.button
          onClick={handleEdit}
          whileHover={{ scale: 1.1 }}
          className="bg-blue-500 text-white px-4 py-2 rounded-xl font-semibold hover:bg-blue-600 transition-colors"
        >
          Edit
        </motion.button>
        <motion.button
          onClick={handleDelete}
          whileHover={{ scale: 1.1 }}
          className="bg-red-500 text-white px-4 py-2 rounded-xl font-semibold hover:bg-red-600 transition-colors"
        >
          Hapus
        </motion.button>
      </div>
    </motion.li>
  );
}

export default HafalanItem;

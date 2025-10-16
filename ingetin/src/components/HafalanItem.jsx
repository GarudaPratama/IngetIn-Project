import React from "react";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import { deleteHafalan, updateHafalan } from "../Utils/storage.js";

function HafalanItem({ hafalan, onDelete }) {
  const handleDelete = () => {
    Swal.fire({
      title: "Hapus hafalan?",
      text: `${hafalan.type} akan dihapus.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, hapus!",
      cancelButtonText: "Batal",
      background: document.documentElement.classList.contains("dark") ? "#1f2937" : "#ffffff",
      color: document.documentElement.classList.contains("dark") ? "#f9fafb" : "#111827",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteHafalan(hafalan.id);
        if (onDelete) onDelete();
        Swal.fire({ title: "Dihapus!", icon: "success", confirmButtonColor: "#16a34a" });
      }
    });
  };

  const handleEdit = () => {
    Swal.fire({
      title: `Edit Hafalan ${hafalan.type}`,
      html:
        hafalan.type === "Ziyadah"
          ? `
        <input id="swal-suratMulai" class="swal2-input" placeholder="Surat Mulai" value="${hafalan.suratMulai}">
        <input id="swal-ayatMulai" type="number" class="swal2-input" placeholder="Ayat Mulai" value="${hafalan.ayatMulai}">
        <input id="swal-suratAkhir" class="swal2-input" placeholder="Surat Akhir" value="${hafalan.suratAkhir}">
        <input id="swal-ayatAkhir" type="number" class="swal2-input" placeholder="Ayat Akhir" value="${hafalan.ayatAkhir}">
      `
          : `
        <input id="swal-juzMulai" type="number" class="swal2-input" placeholder="Juz Mulai" value="${hafalan.juzMulai}">
        <input id="swal-juzAkhir" type="number" class="swal2-input" placeholder="Juz Akhir" value="${hafalan.juzAkhir}">
        <select id="swal-extra" class="swal2-select">
          <option value="1/4" ${hafalan.extraMurojaah==="1/4"?"selected":""}>1/4 Juz</option>
          <option value="1/2" ${hafalan.extraMurojaah==="1/2"?"selected":""}>1/2 Juz</option>
        </select>
      `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: "Simpan",
      cancelButtonText: "Batal",
      preConfirm: () => {
        if (hafalan.type === "Ziyadah") {
          const suratMulai = document.getElementById("swal-suratMulai").value;
          const ayatMulai = document.getElementById("swal-ayatMulai").value;
          const suratAkhir = document.getElementById("swal-suratAkhir").value;
          const ayatAkhir = document.getElementById("swal-ayatAkhir").value;
          return { type: "Ziyadah", suratMulai, ayatMulai, suratAkhir, ayatAkhir };
        } else {
          const juzMulai = document.getElementById("swal-juzMulai").value;
          const juzAkhir = document.getElementById("swal-juzAkhir").value;
          const extraMurojaah = document.getElementById("swal-extra").value;
          return { type: "Murojaah", juzMulai, juzAkhir, extraMurojaah };
        }
      },
      background: document.documentElement.classList.contains("dark") ? "#1f2937" : "#ffffff",
      color: document.documentElement.classList.contains("dark") ? "#f9fafb" : "#111827",
    }).then((result) => {
      if (result.isConfirmed) {
        updateHafalan(hafalan.id, result.value);
        if (onDelete) onDelete();
        Swal.fire({ title: "Tersimpan!", icon: "success", confirmButtonColor: "#16a34a" });
      }
    });
  };

  const badgeColor = hafalan.type === "Ziyadah" ? "bg-emerald-500 text-white" : "bg-green-300 text-gray-900";

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      whileHover={{ scale: 1.03, boxShadow: "0 15px 30px rgba(0,0,0,0.2)" }}
      className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border border-gray-200 dark:border-gray-700 rounded-2xl p-6 flex flex-col justify-between text-gray-900 dark:text-gray-100 transition-all"
    >
      <div className="mb-4">
        <h3 className="text-xl font-bold text-emerald-600 dark:text-emerald-400 tracking-tight mb-1">{hafalan.type}</h3>
        {hafalan.type === "Ziyadah" ? (
          <p className="text-gray-700 dark:text-gray-300">{hafalan.suratMulai} ayat {hafalan.ayatMulai} &rarr; {hafalan.suratAkhir} ayat {hafalan.ayatAkhir}</p>
        ) : (
          <p className="text-gray-700 dark:text-gray-300">Juz {hafalan.juzMulai} &rarr; {hafalan.juzAkhir} {hafalan.extraMurojaah ? `(${hafalan.extraMurojaah})` : ""}</p>
        )}
        <span className={`inline-block mt-2 px-3 py-1 rounded-full text-sm font-semibold ${badgeColor} transition-all duration-300 transform hover:scale-105`}>
          {hafalan.type}
        </span>
      </div>
      <div className="flex justify-end gap-3 mt-4">
        <motion.button onClick={handleEdit} whileHover={{ scale: 1.1 }} className="bg-blue-500 text-white px-4 py-2 rounded-xl font-semibold hover:bg-blue-600 transition-colors">Edit</motion.button>
        <motion.button onClick={handleDelete} whileHover={{ scale: 1.1 }} className="bg-red-500 text-white px-4 py-2 rounded-xl font-semibold hover:bg-red-600 transition-colors">Hapus</motion.button>
      </div>
    </motion.div>
  );
}

export default HafalanItem;

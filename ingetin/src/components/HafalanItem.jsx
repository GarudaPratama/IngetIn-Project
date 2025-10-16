import React from "react";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import { deleteHafalan, updateHafalan } from "../Utils/storage.js";
import { Edit3, Trash2, ArrowRight } from "lucide-react";

function HafalanItem({ hafalan, onDelete }) {
  const handleDelete = () => {
    Swal.fire({
      title: "Hapus hafalan?",
      text: `${hafalan.type} ini akan dihapus.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, hapus!",
      cancelButtonText: "Batal",
      confirmButtonColor: "#10B981",
      background: document.documentElement.classList.contains("dark")
        ? "#1f2937"
        : "#ffffff",
      color: document.documentElement.classList.contains("dark")
        ? "#f9fafb"
        : "#111827",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteHafalan(hafalan.id);
        if (onDelete) onDelete();
        Swal.fire({
          title: "Dihapus!",
          icon: "success",
          confirmButtonColor: "#10B981",
        });
      }
    });
  };

  const handleEdit = () => {
    Swal.fire({
      title: `Edit ${hafalan.type}`,
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
          <option value="">Pilih tambahan</option>
          <option value="1/4" ${hafalan.extraMurojaah === "1/4" ? "selected" : ""}>1/4 Juz</option>
          <option value="1/2" ${hafalan.extraMurojaah === "1/2" ? "selected" : ""}>1/2 Juz</option>
        </select>
      `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: "Simpan",
      cancelButtonText: "Batal",
      confirmButtonColor: "#10B981",
      background: document.documentElement.classList.contains("dark")
        ? "#1f2937"
        : "#ffffff",
      color: document.documentElement.classList.contains("dark")
        ? "#f9fafb"
        : "#111827",
      preConfirm: () => {
        if (hafalan.type === "Ziyadah") {
          return {
            type: "Ziyadah",
            suratMulai: document.getElementById("swal-suratMulai").value,
            ayatMulai: document.getElementById("swal-ayatMulai").value,
            suratAkhir: document.getElementById("swal-suratAkhir").value,
            ayatAkhir: document.getElementById("swal-ayatAkhir").value,
          };
        } else {
          return {
            type: "Murojaah",
            juzMulai: document.getElementById("swal-juzMulai").value,
            juzAkhir: document.getElementById("swal-juzAkhir").value,
            extraMurojaah: document.getElementById("swal-extra").value,
          };
        }
      },
    }).then((result) => {
      if (result.isConfirmed) {
        updateHafalan(hafalan.id, result.value);
        if (onDelete) onDelete();
        Swal.fire({
          title: "Tersimpan!",
          icon: "success",
          confirmButtonColor: "#10B981",
        });
      }
    });
  };

  const headerColor =
    hafalan.type === "Ziyadah" ? "bg-emerald-500" : "bg-sky-500";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{
        scale: 1.02,
        boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
      }}
      className="rounded-2xl overflow-hidden shadow-md bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 transition-all"
    >
      {/* Header Card */}
      <div
        className={`${headerColor} text-white font-semibold px-4 py-2 flex justify-between items-center`}
      >
        <span>{hafalan.type}</span>
        <span className="text-sm opacity-80">
          {new Date(hafalan.date).toLocaleDateString("id-ID")}
        </span>
      </div>

      {/* Body Card */}
      <div className="p-4 flex flex-col justify-between">
        <div>
          {hafalan.type === "Ziyadah" ? (
            <p className="text-gray-900 dark:text-gray-100 font-semibold text-lg flex items-center gap-2">
              <span>
                {hafalan.suratMulai} {hafalan.ayatMulai}
              </span>
              <motion.span whileHover={{ x: 3 }}>
                <ArrowRight size={18} className="text-emerald-500" />
              </motion.span>
              <span>
                {hafalan.suratAkhir} {hafalan.ayatAkhir}
              </span>
            </p>
          ) : (
            <p className="text-gray-900 dark:text-gray-100 font-semibold text-lg flex items-center gap-2">
              <span>Juz {hafalan.juzMulai}</span>
              <motion.span whileHover={{ x: 3 }}>
                <ArrowRight size={18} className="text-sky-500" />
              </motion.span>
              <span>
                Juz {hafalan.juzAkhir}
                {hafalan.extraMurojaah && ` (${hafalan.extraMurojaah})`}
              </span>
            </p>
          )}
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
            {hafalan.type === "Ziyadah"
              ? "Tambahan hafalan baru"
              : "Pengulangan hafalan"}
          </p>
        </div>

        {/* Tombol Aksi */}
        <div className="flex justify-end gap-2 mt-4">
          <motion.button
            whileHover={{ scale: 1.1 }}
            onClick={handleEdit}
            className="p-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-all"
          >
            <Edit3 size={16} />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            onClick={handleDelete}
            className="p-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-all"
          >
            <Trash2 size={16} />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

export default HafalanItem;

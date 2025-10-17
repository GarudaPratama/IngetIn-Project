import React, { useEffect } from "react";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import { deleteHafalan, updateHafalan } from "../Utils/storage.js";
import { Edit3, Trash2, ArrowRight, CheckCircle2, AlertTriangle } from "lucide-react";

function HafalanItem({ hafalan, onDelete, onRefresh }) {
  // 🔁 Trigger refresh di parent
  const triggerRefresh = () => {
    if (typeof onRefresh === "function") onRefresh();
    if (typeof onDelete === "function") onDelete();
    window.dispatchEvent(new Event("hafalan-updated"));
  };

  // ⏰ Cek otomatis jika waktu reminder sudah lewat
  useEffect(() => {
    if (hafalan.status === "belum" && hafalan.reminder) {
      const now = new Date();
      const reminderTime = new Date(hafalan.reminder);
      if (now > reminderTime) {
        updateHafalan(hafalan.id, { status: "gagal" });
        triggerRefresh();
      }
    }
  }, []);

  // ⏰ Tampilkan notifikasi saat pengingat waktunya tiba
  useEffect(() => {
    if (hafalan.status === "belum" && hafalan.reminder) {
      const now = new Date();
      const reminderTime = new Date(hafalan.reminder);
      const diff = reminderTime - now;
      if (diff > 0) {
        const timer = setTimeout(() => {
          Swal.fire({
            icon: "info",
            title: `⏰ Waktunya ${hafalan.type}!`,
            text: hafalan.type === "Ziyadah"
              ? `Ziyadah: ${hafalan.suratMulai} ${hafalan.ayatMulai} → ${hafalan.suratAkhir} ${hafalan.ayatAkhir}`
              : `Murojaah: Juz ${hafalan.juzMulai} → ${hafalan.juzAkhir}`,
            confirmButtonColor: "#10B981",
          });
        }, diff);
        return () => clearTimeout(timer);
      }
    }
  }, [hafalan]);

  // 🗑️ Hapus hafalan
  const handleDelete = () => {
    Swal.fire({
      title: "Hapus hafalan?",
      text: `${hafalan.type} ini akan dihapus.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, hapus!",
      cancelButtonText: "Batal",
      confirmButtonColor: "#10B981",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteHafalan(hafalan.id);
        triggerRefresh();
        Swal.fire({
          title: "Dihapus!",
          icon: "success",
          timer: 1200,
          showConfirmButton: false,
        });
      }
    });
  };

  // ✏️ Edit hafalan
  const handleEdit = () => {
    Swal.fire({
      title: `Edit ${hafalan.type}`,
      html:
        hafalan.type === "Ziyadah"
          ? `
        <input id="swal-suratMulai" class="swal2-input" placeholder="Surat Mulai" value="${hafalan.suratMulai || ""}">
        <input id="swal-ayatMulai" type="number" class="swal2-input" placeholder="Ayat Mulai" value="${hafalan.ayatMulai || ""}">
        <input id="swal-suratAkhir" class="swal2-input" placeholder="Surat Akhir" value="${hafalan.suratAkhir || ""}">
        <input id="swal-ayatAkhir" type="number" class="swal2-input" placeholder="Ayat Akhir" value="${hafalan.ayatAkhir || ""}">
        <input id="swal-reminder" type="datetime-local" class="swal2-input" value="${hafalan.reminder || ""}">
      `
          : `
        <input id="swal-juzMulai" type="number" class="swal2-input" placeholder="Juz Mulai" value="${hafalan.juzMulai || ""}">
        <input id="swal-juzAkhir" type="number" class="swal2-input" placeholder="Juz Akhir" value="${hafalan.juzAkhir || ""}">
        <select id="swal-extra" class="swal2-select">
          <option value="">Pilih tambahan</option>
          <option value="1/4" ${hafalan.extraMurojaah === "1/4" ? "selected" : ""}>1/4 Juz</option>
          <option value="1/2" ${hafalan.extraMurojaah === "1/2" ? "selected" : ""}>1/2 Juz</option>
        </select>
        <input id="swal-reminder" type="datetime-local" class="swal2-input" value="${hafalan.reminder || ""}">
      `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: "Simpan",
      cancelButtonText: "Batal",
      confirmButtonColor: "#10B981",
      preConfirm: () => {
        const reminder = document.getElementById("swal-reminder").value;
        if (hafalan.type === "Ziyadah") {
          return {
            type: "Ziyadah",
            suratMulai: document.getElementById("swal-suratMulai").value,
            ayatMulai: document.getElementById("swal-ayatMulai").value,
            suratAkhir: document.getElementById("swal-suratAkhir").value,
            ayatAkhir: document.getElementById("swal-ayatAkhir").value,
            reminder,
          };
        } else {
          return {
            type: "Murojaah",
            juzMulai: document.getElementById("swal-juzMulai").value,
            juzAkhir: document.getElementById("swal-juzAkhir").value,
            extraMurojaah: document.getElementById("swal-extra").value,
            reminder,
          };
        }
      },
    }).then((result) => {
      if (result.isConfirmed) {
        updateHafalan(hafalan.id, result.value);
        triggerRefresh();
        Swal.fire({
          title: "Tersimpan!",
          icon: "success",
          timer: 1200,
          showConfirmButton: false,
        });
      }
    });
  };

  // ✅ Tandai selesai
  const markAsDone = () => {
    updateHafalan(hafalan.id, { status: "selesai" });
    triggerRefresh();
    Swal.fire({
      icon: "success",
      title: "Alhamdulillah! Hafalan selesai 🎉",
      confirmButtonColor: "#10B981",
    });
  };

  const headerColor =
    hafalan.type === "Ziyadah" ? "bg-emerald-500" : "bg-sky-500";

  const statusColor =
    hafalan.status === "selesai"
      ? "text-emerald-500"
      : hafalan.status === "gagal"
      ? "text-red-500"
      : "text-yellow-500";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      className="rounded-2xl overflow-hidden shadow-md bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 transition-all"
    >
      <div
        className={`${headerColor} text-white font-semibold px-4 py-2 flex justify-between items-center`}
      >
        <span>{hafalan.type}</span>
        <span className="text-sm opacity-80">
          {new Date(hafalan.date).toLocaleDateString("id-ID")}
        </span>
      </div>

      <div className="p-4">
        <p className="text-gray-900 dark:text-gray-100 font-semibold text-lg flex items-center gap-2">
          {hafalan.type === "Ziyadah"
            ? `${hafalan.suratMulai} ${hafalan.ayatMulai} → ${hafalan.suratAkhir} ${hafalan.ayatAkhir}`
            : `Juz ${hafalan.juzMulai} → Juz ${hafalan.juzAkhir}${
                hafalan.extraMurojaah ? ` (${hafalan.extraMurojaah})` : ""
              }`}
        </p>

        <p className="text-sm mt-1">
          Status: <span className={`${statusColor} font-semibold`}>{hafalan.status}</span>
        </p>

        {hafalan.reminder && (
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1 flex items-center gap-1">
            <AlertTriangle size={14} /> {new Date(hafalan.reminder).toLocaleString("id-ID")}
          </p>
        )}

        <div className="flex justify-end gap-2 mt-4">
          {hafalan.status === "belum" && (
            <motion.button
              whileHover={{ scale: 1.1 }}
              onClick={markAsDone}
              className="p-2 rounded-lg bg-emerald-500 text-white hover:bg-emerald-600 transition-all"
            >
              <CheckCircle2 size={16} />
            </motion.button>
          )}
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

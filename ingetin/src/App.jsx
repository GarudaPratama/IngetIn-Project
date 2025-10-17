import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./components/Header";
import HafalanForms from "./components/HafalanForm";
import HafalanList from "./components/HafalanList";
import { getHafalan, exportHafalan, importHafalan } from "./Utils/storage";
import Swal from "sweetalert2";
import { motion } from "framer-motion";

function App() {
  const [hafalanList, setHafalanList] = useState([]);
  const navigate = useNavigate();
  const reminderTimer = useRef(null);

  // 🔹 Ambil data hafalan dari localStorage
  const loadHafalan = () => {
    const data = getHafalan().sort((a, b) => b.date.localeCompare(a.date));
    setHafalanList(data);
  };

  // 🔹 Jalankan ketika app dibuka
  useEffect(() => {
    loadHafalan();

    const onStorage = (e) => {
      if (e.key === null || e.key === "hafalan_list_ingetin") {
        loadHafalan();
      }
    };

    const onHafalanUpdated = () => loadHafalan();
    window.addEventListener("storage", onStorage);
    window.addEventListener("hafalan-updated", onHafalanUpdated);

    // Jalankan pengingat otomatis
    startReminderSystem();

    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("hafalan-updated", onHafalanUpdated);
      if (reminderTimer.current) clearInterval(reminderTimer.current);
    };
  }, []);

  // 🔔 Sistem Pengingat Hafalan
  const startReminderSystem = () => {
    const checkReminders = () => {
      const now = new Date();
      const list = getHafalan();

      list.forEach((item) => {
        if (!item.reminder) return;

        const reminderTime = new Date(item.reminder);
        const diffMs = reminderTime - now;
        const diffHours = diffMs / (1000 * 60 * 60);

        // sudah lewat = gagal
        if (diffMs <= 0 && item.status === "belum") {
          Swal.fire({
            icon: "error",
            title: `⏰ Hafalan ${item.type} kamu gagal!`,
            text: "Waktu pengingat sudah lewat.",
            confirmButtonColor: "#ef4444",
          });
          item.status = "gagal";
          localStorage.setItem("hafalan_list_ingetin", JSON.stringify(list));
          return;
        }

        // kalau masih belum lewat, cek kondisi per jam
        if (item.status === "belum") {
          if (diffHours > 24 && diffHours <= 32) {
            // lebih dari 1 hari → ingatkan setiap 8 jam
            Swal.fire({
              icon: "info",
              title: `📘 Pengingat ${item.type}`,
              text: `Waktu hafalan ${item.type} masih lebih dari 1 hari lagi.`,
              confirmButtonColor: "#10B981",
              timer: 4000,
            });
          } else if (diffHours <= 24 && diffHours > 1) {
            // sisa 1 hari → ingatkan tiap jam
            Swal.fire({
              icon: "warning",
              title: `📖 Hafalan ${item.type} sudah mendekati waktu!`,
              text: `Kurang dari 24 jam lagi.`,
              confirmButtonColor: "#facc15",
              timer: 4000,
            });
          } else if (diffHours <= 1 && diffHours > 0) {
            // sisa < 1 jam → setiap buka app
            Swal.fire({
              icon: "warning",
              title: `⚠️ Hampir waktunya!`,
              text: `Kurang dari 1 jam untuk hafalan ${item.type}.`,
              confirmButtonColor: "#ef4444",
              timer: 5000,
            });
          }
        }
      });
    };

    // Cek pertama kali saat app dibuka
    checkReminders();

    // Jalankan setiap 1 jam (otomatis)
    reminderTimer.current = setInterval(checkReminders, 60 * 60 * 1000);
  };

  const handleImport = (file) => {
    importHafalan(file, (success) => {
      if (success) {
        Swal.fire({
          icon: "success",
          title: "✅ Data berhasil diimport!",
          confirmButtonColor: "#10B981",
        });
        loadHafalan();
        window.dispatchEvent(new Event("hafalan-updated"));
      } else {
        Swal.fire({
          icon: "error",
          title: "❌ Gagal import data",
          text: "Pastikan file JSON valid dan sesuai format export.",
          confirmButtonColor: "#ef4444",
        });
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <Header />

      <main className="max-w-5xl mx-auto px-4 py-8">
        {/* Tombol Back */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/")}
          className="mb-6 px-4 py-2 flex items-center gap-2 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 text-gray-800 dark:text-gray-200 rounded-2xl shadow-md font-medium transition-all"
        >
          ← Kembali ke Landing Page
        </motion.button>

        <HafalanForms
          onAdd={() => {
            loadHafalan();
            window.dispatchEvent(new Event("hafalan-updated"));
          }}
        />

        {/* Tombol Export & Import */}
        <div className="flex flex-wrap justify-end gap-3 mt-6">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={exportHafalan}
            className="px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white font-medium shadow-sm transition-all"
          >
            📤 Export Data
          </motion.button>

          <motion.label
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 rounded-lg bg-sky-500 hover:bg-sky-600 text-white font-medium shadow-sm transition-all cursor-pointer"
          >
            📥 Import Data
            <input
              type="file"
              accept="application/json"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) handleImport(file);
              }}
            />
          </motion.label>
        </div>

        {/* List Hafalan */}
        <HafalanList hafalanList={hafalanList} onRefresh={loadHafalan} />
      </main>
    </div>
  );
}

export default App;

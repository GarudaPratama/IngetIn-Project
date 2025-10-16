import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./components/Header";
import HafalanForms from "./components/HafalanForm";
import HafalanList from "./components/HafalanList";
import {
  getHafalan,
  exportHafalan,
  importHafalan,
} from "./Utils/storage";
import Swal from "sweetalert2";
import { motion } from "framer-motion";

function App() {
  const [hafalanList, setHafalanList] = useState([]);
  const navigate = useNavigate();

  const loadHafalan = () => {
    const data = getHafalan().sort((a, b) => b.date.localeCompare(a.date));
    setHafalanList(data);
  };

  useEffect(() => {
    loadHafalan();
  }, []);

  const handleImport = (file) => {
    importHafalan(file, (success) => {
      if (success) {
        Swal.fire({
          icon: "success",
          title: "✅ Data berhasil diimport!",
          confirmButtonColor: "#10B981",
        });
        loadHafalan();
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
        {/* Tombol Back modern & konsisten UI */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/")}
          className="mb-6 px-4 py-2 flex items-center gap-2 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 text-gray-800 dark:text-gray-200 rounded-2xl shadow-md font-medium transition-all"
        >
          ← Kembali ke Landing Page
        </motion.button>

        <HafalanForms onAdd={loadHafalan} />

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

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
import { ArrowLeft } from "lucide-react";

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

  const handleBackToLanding = () => {
    navigate("/");
  };

  return (
    <motion.div
      className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Header />

      <main className="max-w-5xl mx-auto px-4 py-8">
        {/* Tombol Kembali modern & konsisten */}
        <motion.button
          onClick={handleBackToLanding}
          whileHover={{ scale: 1.05, boxShadow: "0 6px 20px rgba(0,0,0,0.15)" }}
          whileTap={{ scale: 0.95 }}
          className="mb-6 px-5 py-3 flex items-center gap-3 rounded-2xl bg-gradient-to-r from-gray-300 to-gray-200 dark:from-gray-700 dark:to-gray-600 text-gray-900 dark:text-gray-50 font-semibold shadow-md transition-all"
        >
          <ArrowLeft size={20} />
          Kembali ke Landing Page
        </motion.button>

        {/* Form tambah hafalan */}
        <HafalanForms onAdd={loadHafalan} />

        {/* Tombol Export & Import */}
        <div className="flex flex-wrap justify-end gap-3 mt-6">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={exportHafalan}
            className="px-4 py-2 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-medium shadow-md transition-all"
          >
            📤 Export Data
          </motion.button>

          <motion.label
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 rounded-2xl bg-sky-500 hover:bg-sky-600 text-white font-medium shadow-md transition-all cursor-pointer"
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
    </motion.div>
  );
}

export default App;

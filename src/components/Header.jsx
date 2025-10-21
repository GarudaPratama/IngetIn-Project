import React, { useState } from "react";
import useDarkMode from "../Hooks/useDarkMode";
import logo from "../assets/logo-ingetin.png";
import { Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-hot-toast";
import Swal from "sweetalert2";

const Header = () => {
  const [isDarkMode, toggleDarkMode] = useDarkMode();
  const [fadeActive, setFadeActive] = useState(false);

  const handleToggle = () => {
    setFadeActive(true);
    setTimeout(() => {
      toggleDarkMode();
      setFadeActive(false);
      toast.success(isDarkMode ? "Mode Terang Aktif 🌞" : "Mode Gelap Aktif 🌙");
    }, 350);
  };

  const handleAbout = () => {
    Swal.fire({
      title: "Tentang IngetIn",
      text: "Aplikasi catatan hafalan Qur'an dan dzikir harian — sederhana tapi bermakna.",
      icon: "info",
      confirmButtonText: "Keren!",
      background: isDarkMode ? "#1f2937" : "#ffffff",
      color: isDarkMode ? "#f9fafb" : "#111827",
    });
  };

  return (
    <>
      <AnimatePresence>
        {fadeActive && (
          <motion.div
            className={`fixed inset-0 z-[9999] ${
              isDarkMode ? "bg-white" : "bg-black"
            }`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          />
        )}
      </AnimatePresence>

      <motion.header
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex justify-between items-center px-6 py-4 shadow-md bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50"
      >
        <motion.div
          className="flex items-center gap-3 cursor-pointer"
          whileHover={{ scale: 1.05 }}
          onClick={handleAbout}
        >
          <img src={logo} alt="IngetIn Logo" className="w-10 h-10 rounded-xl" />
          <span className="font-bold text-2xl text-emerald-600 dark:text-emerald-400 tracking-tight">
            Inget<span className="text-gray-800 dark:text-gray-100">In</span>
          </span>
        </motion.div>

        <motion.button
          onClick={handleToggle}
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.1 }}
          className="p-2 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 shadow-sm hover:shadow-md"
        >
          {isDarkMode ? (
            <Sun className="text-yellow-400 transition-transform duration-500" size={22} />
          ) : (
            <Moon className="text-gray-700 dark:text-gray-300 transition-transform duration-500" size={22} />
          )}
        </motion.button>
      </motion.header>
    </>
  );
};

export default Header;

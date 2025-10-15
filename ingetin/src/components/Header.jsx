import React from "react";
import useDarkMode from "../hooks/useDarkMode";
import logo from "../assets/logo.svg";
import { Sun, Moon } from "lucide-react";
import { motion } from "framer-motion";

export default function Header() {
  const [colorTheme, setTheme] = useDarkMode();

  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="flex items-center justify-between px-6 py-4 bg-white dark:bg-gray-900 shadow-md sticky top-0 z-50 backdrop-blur-sm bg-opacity-90 dark:bg-opacity-80 transition-colors duration-300"
    >
      {/* Left: Logo + Text */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        className="flex items-center gap-3 cursor-pointer select-none"
      >
        <motion.img
          src={logo}
          alt="IngetIn Logo"
          className="w-9 h-9 drop-shadow-sm"
          initial={{ rotate: -15, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          transition={{ duration: 0.7, type: "spring" }}
        />
        <motion.h1
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-2xl font-semibold text-gray-800 dark:text-white tracking-tight"
        >
          Inget<span className="text-emerald-500">In</span>
        </motion.h1>
      </motion.div>

      {/* Right: Dark Mode Button */}
      <motion.button
        whileTap={{ scale: 0.9 }}
        whileHover={{ rotate: 10 }}
        onClick={() => setTheme(colorTheme)}
        className="p-2 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 shadow-sm"
        aria-label="Toggle dark mode"
      >
        {colorTheme === "light" ? (
          <Sun className="w-5 h-5 text-yellow-500 animate-pulse" />
        ) : (
          <Moon className="w-5 h-5 text-gray-300 animate-pulse" />
        )}
      </motion.button>
    </motion.header>
  );
}

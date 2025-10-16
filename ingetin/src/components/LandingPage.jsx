import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Header from "./Header";

function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-100 to-emerald-300 dark:from-gray-800 dark:to-gray-900 transition-colors">
      {/* Header sama seperti App */}
      <Header />

      {/* Konten Landing Page */}
      <motion.div
        className="flex flex-col items-center justify-center pt-20 px-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.img
          src="/src/assets/logo-ingetin.png" // sesuaikan path logo
          alt="IngetIn Logo"
          className="w-28 h-28 mb-6"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        />

        <motion.h1
          className="text-4xl font-bold text-gray-900 dark:text-white mb-4 text-center"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          Selamat Datang di <span className="text-emerald-600 dark:text-emerald-400">IngetIn</span>
        </motion.h1>

        <motion.p
          className="text-gray-700 dark:text-gray-300 mb-8 text-center max-w-md"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          Aplikasi sederhana untuk mencatat dan mengingat hafalan Al-Qur'anmu 💚
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <Link
            to="/app"
            className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-semibold shadow-lg transition-all"
          >
            Masuk ke Aplikasi
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default LandingPage;

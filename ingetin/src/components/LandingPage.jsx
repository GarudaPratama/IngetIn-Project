import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Header from "./Header";

function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-100 to-emerald-300 dark:from-gray-800 dark:to-gray-900 transition-colors overflow-y-auto">
      {/* Header sama seperti App */}
      <Header />

      {/* Konten Landing Page */}
      <motion.div
        className="flex flex-row items-center justify-center h-full mt-24 mr-1"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Logo */}
        <motion.img
          src="/src/assets/logo-ingetin.png"
          alt="IngetIn Logo"
          className="w-[410px] h-[410px]"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        />

        {/* Konten teks */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <motion.h1
            className="text-6xl font-bold text-gray-900 dark:text-white mb-12"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Inget<span className="text-emerald-600 dark:text-emerald-400">In</span>
          </motion.h1>

          <motion.p
            className="text-gray-700 dark:text-gray-300 mb-16 text-xl w-[550px]"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Aplikasi hafalan yang ringan, responsif, dan bisa dipakai kapan saja.
          </motion.p>

          {/* Tombol Masuk */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/app"
                className="px-8 py-4 mt-[130px] bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-semibold shadow-lg transition-all"
              >
                Coba Gratis
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Kelebihan IngetIn */}
      <motion.div
        className="mt-[100px]"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {/* Div untuk menambahkan konten kelebihan IngetIn */}
        <motion.h1
          className="text-4xl font-bold text-gray-900 dark:text-white text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          Kelebihan Inget<span className="text-emerald-600 dark:text-emerald-400">In</span>
        </motion.h1>

        <motion.div
          className="flex flex-col items-center gap-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {/* Tambahkan konten kelebihan di sini */}
          <motion.div>
            {/* Konten kelebihan 1 */}
            <motion.img
            src="/src/assets/money1.png" 
            alt="Kelebihan 1"
            >
              
            </motion.img>
          </motion.div>
        </motion.div>

      </motion.div>

      {/* Spacer untuk membuat halaman bisa di-scroll */}
      <motion.div
        className="h-[500px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      />
    </div>
  );
}

export default LandingPage;

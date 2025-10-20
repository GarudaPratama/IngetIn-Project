import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import Header from "./Header";

function LandingPage() {
  const particlesInit = async (main) => {
    await loadFull(main);
  };

  return (
    <div className="min-h-screen relative overflow-x-hidden">
      {/* Particles Interaktif + Parallax Effect */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        className="fixed top-0 left-0 w-full h-full -z-10"
        options={{
          fullScreen: { enable: true },
          fpsLimit: 60,
          interactivity: {
            detectsOn: "window",
            events: {
              onHover: { enable: true, mode: "repulse" },
              onClick: { enable: true, mode: "push" },
              resize: true,
            },
            modes: {
              repulse: { distance: 120, duration: 0.4 },
              push: { quantity: 4 },
            },
          },
          particles: {
            number: { value: 60, density: { enable: true, area: 800 } },
            color: { value: "#10b981" },
            shape: { type: "circle" },
            opacity: { value: 0.5 },
            size: { value: { min: 2, max: 6 } },
            move: {
              enable: true,
              speed: 1.5,
              direction: "none",
              random: true,
              straight: false,
              outModes: "bounce",
              parallax: { enable: true, force: 60, smooth: 20 },
            },
            links: {
              enable: true,
              color: "#10b981",
              distance: 150,
              opacity: 0.4,
              width: 1,
            },
          },
          detectRetina: true,
        }}
      />

      {/* Background Gradient */}
      <div className="min-h-screen bg-gradient-to-br from-emerald-100 to-emerald-300 dark:from-gray-800 dark:to-gray-900 transition-colors relative z-10">
        {/* Header */}
        <Header />

        {/* Hero Section */}
        <motion.div
          className="flex flex-col md:flex-row items-center justify-center w-full mt-24 md:mt-32 gap-10 px-4 md:px-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.img
            src="/src/assets/logo-ingetin.png"
            alt="IngetIn Logo"
            className="w-[300px] md:w-[410px] h-[300px] md:h-[410px]"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          />

          <motion.div
            className="text-center md:text-left max-w-md md:max-w-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-12"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Inget<span className="text-emerald-600 dark:text-emerald-400">In</span>
            </motion.h1>

            <motion.p
              className="text-gray-700 dark:text-gray-300 mb-16 text-lg sm:text-xl"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Aplikasi hafalan yang ringan, responsif, dan bisa dipakai kapan saja.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/app"
                  className="px-6 py-3 md:px-8 md:py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-semibold shadow-lg transition-all"
                >
                  Coba Gratis
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Kelebihan IngetIn */}
        <motion.div
          className="mt-24 md:mt-32 px-4 md:px-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <motion.h1
            className="text-4xl sm:text-5xl md:text-5xl font-bold text-gray-900 dark:text-white text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Kelebihan Inget<span className="text-emerald-600 dark:text-emerald-400">In</span>
          </motion.h1>

          {/* Cards Container dengan stagger animation */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            variants={{
              hidden: {},
              visible: {
                transition: { staggerChildren: 0.2 },
              },
            }}
            viewport={{ once: true }}
          >
            {[
              {
                img: "/src/assets/money1.png",
                title: "Gratis Untuk Semua",
                desc: "Akses penuh untuk semua pengguna, gratis selamanya.",
              },
              {
                img: "/src/assets/kilat1.png",
                title: "Praktis dan Cepat",
                desc: "Mulai hafalan kapan saja tanpa ribet, langsung dari perangkatmu.",
              },
              {
                img: "/src/assets/like1.png",
                title: "Mudah Digunakan",
                desc: "Antarmuka simpel dan responsif di semua perangkat.",
              },
            ].map((card, i) => (
              <motion.div
                key={i}
                className="bg-white dark:bg-gray-700 rounded-2xl shadow-lg py-10 px-6 flex flex-col justify-center items-center text-center transition-all cursor-pointer w-full max-w-[320px] mx-auto h-[420px]"
                variants={{
                  hidden: { opacity: 0, y: 40 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                whileHover={{
                  scale: 1.06,
                  rotate: 0.5,
                  y: -6,
                  boxShadow: "0 20px 40px rgba(0,0,0,0.25)",
                  transition: { type: "spring", stiffness: 400, damping: 10, duration: 0.15 },
                }}
              >
                <img
                  src={card.img}
                  alt={card.title}
                  className="w-28 md:w-36 h-28 md:h-36 mb-8 object-contain"
                />
                <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 dark:text-white mb-2">
                  {card.title}
                </h2>
                <p className="text-gray-700 dark:text-gray-300 text-base mt-2 md:mt-4 leading-relaxed max-w-[250px]">
                  {card.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
        
        {/* Bagian Iklan */}
        <motion.div className="pt-[220px] flex flex-row items-center justify-center">
           <motion.img
            src="/src/assets/iphone.png"
            alt="Hape Gambar"
            className="w-96"
           >

           </motion.img>
           <motion.div>
            <motion.h1 className="text-5xl font-bold w-[500px] dark:text-white">Semua Hafalanmu, dalam satu Aplikasi</motion.h1>
            <motion.p className="text-2xl font dark:text-white w-[700px]">IngetIn membantu anda mencatat, mengulang, dan menjaga hafalan dengan cara yang mudah dan menyenangkan. Tanpa ribet, lupa, kapan pun anda butuh.</motion.p>
           </motion.div>
        </motion.div>

        <div className="h-24 md:h-32" />
      </div>
    </div>
  );
}

export default LandingPage;

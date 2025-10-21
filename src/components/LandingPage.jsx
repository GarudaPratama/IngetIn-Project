import React from "react";
import { Link } from "react-router-dom";
import { motion, useAnimation } from "framer-motion";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import Header from "./Header";


function LandingPage() {
  const particlesInit = async (main) => {
    await loadFull(main);
  };

  const testimonials = [
  {
    img: "/assets/testimonial1.png",
    name: "Sk3cho0",
    text: "Aplikasinya bener-bener ngebantu banget buat nyusun hafalan. Sekarang muroja’ah jadi lebih teratur.",
    rating: 5,
  },
  {
    img: "/assets/testimonial2.png",
    name: "Siti Nurhaliza",
    text: "Interface-nya lembut banget, mata ga capek. Cocok buat anak-anak juga.",
    rating: 5,
  },
  {
    img: "/assets/testimonial3.png",
    name: "Fahri Al Faruq",
    text: "Fitur pengingatnya keren, tiap buka aplikasi langsung inget hafalan yang belum selesai.",
    rating: 4,
  },
  {
    img: "/assets/testimonial4.png",
    name: "Mira Latifah",
    text: "Sangat berguna buat santri, simple dan efisien.",
    rating: 5,
  },
  {
    img: "/assets/testimonial5.png",
    name: "Abdul Karim",
    text: "Dulu sering lupa muroja’ah, sekarang tiap hari diingatkan. MasyaAllah!",
    rating: 5,
  },
  {
    img: "/assets/testimonial6.png",
    name: "Fatimah Zahra",
    text: "Suka banget sama tampilannya, elegan dan adem. Ga berat juga di HP.",
    rating: 4,
  },
  {
    img: "/assets/testimonial7.png",
    name: "Umar Hanif",
    text: "Kalau ada fitur set target hafalan mingguan bakal lebih keren lagi.",
    rating: 4,
  },
  {
    img: "/assets/testimonial8.png",
    name: "Dina Khairunnisa",
    text: "Udah nyobain banyak app hafalan, tapi ini paling stabil dan gampang dipakai.",
    rating: 5,
  },
  {
    img: "/assets/testimonial9.png",
    name: "Taufiq Ramadhan",
    text: "Auto reminder dan tampilan dark mode-nya bikin nyaman banget waktu malam hari.",
    rating: 5,
  },
];


  const controls = useAnimation();
  const [x, setX] = React.useState(0);
  const maxScroll = -1200;

  React.useEffect(() => {
    let animation;
    const loop = async () => {
      while (true) {
        await controls.start({
          x: [0, maxScroll],
          transition: { duration: 25, ease: "linear" },
        });
        await controls.start({ x: 0, transition: { duration: 0 } });
      }
    };
    animation = loop();
    return () => controls.stop();
  }, [controls]);

  const handleNext = () => {
    setX((prev) => Math.max(prev - 320, maxScroll));
    controls.start({ x: Math.max(x - 320, maxScroll), transition: { duration: 0.5 } });
  };

  const handlePrev = () => {
    setX((prev) => Math.min(prev + 320, 0));
    controls.start({ x: Math.min(x + 320, 0), transition: { duration: 0.5 } });
  };

  return (
    <div className="min-h-screen relative overflow-x-hidden">
      {/* Background Particles */}
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
              random: true,
              outModes: "bounce",
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

      <div className="min-h-screen bg-gradient-to-br from-emerald-100 to-emerald-300 dark:from-gray-800 dark:to-gray-900 transition-colors relative z-10">
        <Header />

        {/* Hero Section */}
        <motion.div
          className="flex flex-col md:flex-row items-center justify-center w-full mt-24 md:mt-32 gap-10 px-4 md:px-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.img
            src="/assets/logo-ingetin.png"
            alt="IngetIn Logo"
            className="w-[300px] md:w-[410px] h-[300px] md:h-[410px]"
          />
          <div className="text-center md:text-left max-w-md md:max-w-xl">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-12">
              Inget<span className="text-emerald-600 dark:text-emerald-400">In</span>
            </h1>
            <p className="text-gray-700 dark:text-gray-300 mb-16 font-normal sm:text-xl">
              Aplikasi hafalan yang ringan, responsif, dan bisa dipakai kapan saja.
            </p>
            <Link
              to="/app"
              className="px-6 py-3 md:px-8 md:py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-semibold shadow-lg transition-all"
            >
              Mulai Sekarang
            </Link>
          </div>
        </motion.div>

        {/* Kelebihan Section */}
        <motion.div
          className="mt-24 md:mt-32 px-4 md:px-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-semibold text-gray-900 dark:text-white text-center mb-16">
            Kelebihan Inget<span className="text-emerald-600 dark:text-emerald-400">In</span>
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                img: "/assets/money1.png",
                title: "Gratis Untuk Semua",
                desc: "Akses penuh untuk semua pengguna, gratis selamanya.",
              },
              {
                img: "/assets/kilat1.png",
                title: "Praktis dan Cepat",
                desc: "Mulai hafalan kapan saja tanpa ribet.",
              },
              {
                img: "/assets/like1.png",
                title: "Mudah Digunakan",
                desc: "Antarmuka simpel dan responsif di semua perangkat.",
              },
            ].map((card, i) => (
              <motion.div
                key={i}
                className="bg-white dark:bg-gray-700 rounded-2xl shadow-lg py-10 px-6 flex flex-col justify-center items-center text-center transition-all w-full max-w-[320px] mx-auto h-[420px]"
                whileHover={{
                  scale: 1.05,
                  y: -5,
                  boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
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
                <p className="text-gray-700 dark:text-gray-300 text-base mt-2 leading-relaxed max-w-[250px]">
                  {card.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Bagian Iklan */}
        <motion.div
          className="pt-[240px] flex flex-col-reverse md:flex-row items-center justify-center gap-10 md:gap-16 px-4 text-center md:text-left"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.img
            src="/assets/iplebihbagus.png"
            alt="Hape Gambar"
            className="w-64 sm:w-80 md:w-96 max-w-full h-auto"
          />
          <div className="flex flex-col items-center md:items-start">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold max-w-[600px] dark:text-white mb-8 md:mb-16 leading-snug">
              Semua Hafalanmu,{" "}
              <span className="tracking-wide">
                dalam satu{" "}
                <span className="text-emerald-600 dark:text-emerald-400">Aplikasi</span>
              </span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl font-normal tracking-widest dark:text-white max-w-[600px]">
              IngetIn membantu anda mencatat, mengulang, dan menjaga hafalan dengan cara yang
              mudah dan menyenangkan. Tanpa ribet, lupa, kapan pun anda butuh.
            </p>
          </div>
        </motion.div>

        {/* Testimonial Carousel */}
        <motion.div
          className="mt-32 px-4 md:px-16 overflow-hidden relative"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-semibold text-gray-900 dark:text-white text-center mb-16">
            Apa Kata Mereka
          </h1>

          {/* Tombol Navigasi */}
          <button
            onClick={handlePrev}
            className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full p-3 shadow-lg z-10"
          >
            ‹
          </button>

          <button
            onClick={handleNext}
            className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full p-3 shadow-lg z-10"
          >
            ›
          </button>

          {/* Carousel */}
          <motion.div
            className="flex space-x-6 cursor-grab pb-6"
            animate={controls}
            drag="x"
            dragConstraints={{ left: maxScroll, right: 0 }}
          >
            {testimonials.map((item, i) => (
              <motion.div
                key={i}
                className="bg-white dark:bg-gray-700 rounded-2xl shadow-lg p-8 min-w-[300px] max-w-[320px] flex-shrink-0 text-center mx-auto"
              >
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-[150px] h-[150px] rounded-full mx-auto mb-6 object-cover border-4 border-emerald-500"
                />
                <p className="text-gray-600 dark:text-gray-300 italic mb-4">
                  “{item.text}”
                </p>
                <h3 className="text-gray-500 dark:text-gray-400 font-semibold">{item.name}</h3>
                <div className="flex justify-center mt-2">
                  {"⭐".repeat(item.rating)}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        <div className="h-24 md:h-32" />
      </div>
    </div>
  );
}

export default LandingPage;

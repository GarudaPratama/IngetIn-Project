import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter, Routes, Route, useLocation } from "react-router-dom"; // ganti BrowserRouter jadi HashRouter
import { AnimatePresence, motion } from "framer-motion";
import App from "./App.jsx";
import LandingPage from "./components/LandingPage.jsx";
import "./index.css";

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <LandingPage />
            </motion.div>
          }
        />
        <Route
          path="/app"
          element={
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <App />
            </motion.div>
          }
        />
      </Routes>
    </AnimatePresence>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HashRouter>
      <AnimatedRoutes />
    </HashRouter>
  </React.StrictMode>
);

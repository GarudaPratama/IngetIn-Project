import React, { useState, useEffect } from "react";
import Header from "./components/Header.jsx";
import HafalanForm from "./components/HafalanForm.jsx";
import HafalanList from "./components/HafalanList.jsx";
import { getHafalan } from "./Utils/storage.js";

function App() {
  const [hafalanList, setHafalanList] = useState([]);

  // Load hafalan dari localStorage
  const loadHafalan = () => setHafalanList(getHafalan());

  useEffect(() => {
    loadHafalan();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-500">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="max-w-4xl mx-auto mt-8 px-4 sm:px-6 lg:px-8 flex flex-col gap-8">
        {/* Form Card */}
        <HafalanForm onAdd={loadHafalan} />

        {/* Hafalan List */}
        <HafalanList hafalanList={hafalanList} onDelete={loadHafalan} />
      </main>

      {/* Footer */}
      <footer className="mt-16 py-6 text-center text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700">
        &copy; {new Date().getFullYear()} IngetIn — Aplikasi Catatan Hafalan Qur'an
      </footer>
    </div>
  );
}

export default App;

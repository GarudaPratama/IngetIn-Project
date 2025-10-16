import React, { useState, useEffect } from "react";
import Header from "./components/Header.jsx";
import HafalanForms from "./components/HafalanForm.jsx";
import HafalanList from "./components/HafalanList.jsx";
import { getHafalan } from "./Utils/storage.js";

function App() {
  const [hafalanList, setHafalanList] = useState([]);

  const loadHafalan = () => {
    setHafalanList(getHafalan());
  };

  useEffect(() => {
    loadHafalan();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-500">
      <Header />
      <main className="max-w-5xl mx-auto px-4 py-6 flex flex-col gap-8">
        <HafalanForms onAdd={loadHafalan} />
        <HafalanList hafalanList={hafalanList} onUpdate={loadHafalan} />
      </main>
    </div>
  );
}

export default App;

import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import HafalanItem from "./HafalanItem.jsx";

function HafalanList({ hafalanList, onUpdate }) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-emerald-600 dark:text-emerald-400">Daftar Hafalan</h2>
      {hafalanList.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">Belum ada hafalan.</p>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <AnimatePresence>
            {[...hafalanList].reverse().map((hafalan) => (
              <motion.li key={hafalan.id} layout initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}>
                <HafalanItem hafalan={hafalan} onDelete={onUpdate} />
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      )}
    </div>
  );
}

export default HafalanList;

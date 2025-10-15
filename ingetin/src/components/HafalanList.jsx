import React from "react";
import HafalanItem from "./HafalanItem.jsx";

function HafalanList({ hafalanList, onDelete }) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-emerald-600 dark:text-emerald-400">Daftar Ziyadah dan Muroja'ah</h2>
      {hafalanList.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">Belum ada hafalan.</p>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {hafalanList.map((hafalan, index) => (
            <HafalanItem key={index} hafalan={hafalan} index={index} onDelete={onDelete} />
          ))}
        </ul>
      )}
    </div>
  );
}

export default HafalanList;


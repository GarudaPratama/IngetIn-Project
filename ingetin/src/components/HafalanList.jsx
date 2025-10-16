import React from "react";
import HafalanItem from "./HafalanItem";

function HafalanList({ hafalanList, onRefresh }) {
  return (
    <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {hafalanList.length > 0 ? (
        hafalanList.map((hafalan) => (
          <HafalanItem
            key={hafalan.id}
            hafalan={hafalan}
            onDelete={onRefresh}
          />
        ))
      ) : (
        <p className="text-gray-500 dark:text-gray-400 text-center col-span-3 py-8">
          Belum ada hafalan disimpan.
        </p>
      )}
    </div>
  );
}

export default HafalanList;


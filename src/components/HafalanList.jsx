import React from "react";
import { motion } from "framer-motion";
import HafalanItem from "./HafalanItem";

function HafalanList({ hafalanList, onRefresh }) {
  return (
    <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {hafalanList.length === 0 ? (
        <p className="text-center text-gray-600 dark:text-gray-400 col-span-full">
          Belum ada hafalan ditambahkan.
        </p>
      ) : (
        hafalanList.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <HafalanItem hafalan={item} onRefresh={onRefresh} />
          </motion.div>
        ))
      )}
    </div>
  );
}

export default HafalanList;

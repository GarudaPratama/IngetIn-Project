// src/components/ZiyadahWizard.jsx
import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import { saveHafalan } from "../Utils/storage";
import { SURAH_DATA, JUZ_MAPPING } from "./data/surahData";

function ZiyadahWizard({ onAdd }) {
  const [step, setStep] = useState(1);
  const [selectedJuz, setSelectedJuz] = useState("");
  const [suratMulai, setSuratMulai] = useState("");
  const [ayatMulai, setAyatMulai] = useState("");
  const [suratAkhir, setSuratAkhir] = useState("");
  const [ayatAkhir, setAyatAkhir] = useState("");
  const [reminder, setReminder] = useState("");

  // Filter surat berdasarkan Juz
  const filteredSurahList = useMemo(() => {
    if (!selectedJuz) return SURAH_DATA;
    const juz = JUZ_MAPPING[selectedJuz];
    if (!juz) return SURAH_DATA;
    const start = juz.startSurah;
    const end = juz.endSurah;
    return SURAH_DATA.filter(
      (s) => s.number >= start && s.number <= end
    );
  }, [selectedJuz]);

  // Utility: buat list ayat
  const range = (n) => Array.from({ length: n }, (_, i) => i + 1);
  const findSurah = (num) => SURAH_DATA.find((s) => s.number === Number(num));

  const ayatOptionsMulai = useMemo(() => {
    const s = findSurah(suratMulai);
    return s ? range(s.ayatCount) : [];
  }, [suratMulai]);

  const ayatOptionsAkhir = useMemo(() => {
    const s = findSurah(suratAkhir);
    return s ? range(s.ayatCount) : [];
  }, [suratAkhir]);

  // Progress bar
  const progress = (step / 4) * 100;

  // Validasi per langkah
  const canNextStep1 = selectedJuz !== "";
  const canNextStep2 = suratMulai !== "";
  const canNextStep3 =
    suratMulai &&
    suratAkhir &&
    ayatMulai &&
    ayatAkhir &&
    (Number(suratAkhir) > Number(suratMulai) ||
      (Number(suratAkhir) === Number(suratMulai) &&
        Number(ayatAkhir) >= Number(ayatMulai)));

  const handleSave = () => {
    if (!canNextStep3) {
      Swal.fire({
        icon: "error",
        title: "Data tidak valid",
        text: "Pastikan semua pilihan sudah benar.",
        confirmButtonColor: "#ef4444",
      });
      return;
    }

    const data = {
      id: Date.now(),
      type: "Ziyadah",
      juz: selectedJuz,
      suratMulai,
      ayatMulai,
      suratAkhir,
      ayatAkhir,
      reminder,
      status: "belum",
      date: new Date().toISOString(),
    };

    saveHafalan(data);
    onAdd && onAdd();

    Swal.fire({
      icon: "success",
      title: "Ziyadah berhasil disimpan!",
      confirmButtonColor: "#10B981",
    });

    // Reset
    setStep(1);
    setSelectedJuz("");
    setSuratMulai("");
    setSuratAkhir("");
    setAyatMulai("");
    setAyatAkhir("");
    setReminder("");
  };

  return (
    <div className="space-y-4">
      {/* Progress Bar */}
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-4">
        <motion.div
          className="bg-emerald-500 h-2 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* STEP 1: PILIH JUZ */}
      {step === 1 && (
        <div>
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Pilih Juz
          </label>
          <select
            value={selectedJuz}
            onChange={(e) => setSelectedJuz(e.target.value)}
            className="w-full p-2 mt-1 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-emerald-500 outline-none"
          >
            <option value="">-- Pilih Juz --</option>
            {Array.from({ length: 30 }, (_, i) => i + 1).map((j) => (
              <option key={j} value={j}>
                Juz {j}
              </option>
            ))}
          </select>

          <div className="flex justify-end mt-4">
            <button
              disabled={!canNextStep1}
              onClick={() => setStep(2)}
              className={`px-4 py-2 rounded-lg text-white font-medium ${
                canNextStep1
                  ? "bg-emerald-500 hover:bg-emerald-600"
                  : "bg-gray-300 dark:bg-gray-700 text-gray-600 cursor-not-allowed"
              }`}
            >
              Lanjut
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: SURAT MULAI */}
      {step === 2 && (
        <div>
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Pilih Surat Awal
          </label>
          <select
            value={suratMulai}
            onChange={(e) => setSuratMulai(e.target.value)}
            className="w-full p-2 mt-1 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-emerald-500 outline-none"
          >
            <option value="">-- Pilih Surat --</option>
            {filteredSurahList.map((s) => (
              <option key={s.number} value={s.number}>
                {s.number}. {s.nameLatin} ({s.nameArabic}) — {s.ayatCount} ayat
              </option>
            ))}
          </select>

          <div className="flex justify-between mt-4">
            <button
              onClick={() => setStep(1)}
              className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 font-medium"
            >
              Kembali
            </button>
            <button
              disabled={!canNextStep2}
              onClick={() => setStep(3)}
              className={`px-4 py-2 rounded-lg text-white font-medium ${
                canNextStep2
                  ? "bg-emerald-500 hover:bg-emerald-600"
                  : "bg-gray-300 dark:bg-gray-700 text-gray-600 cursor-not-allowed"
              }`}
            >
              Lanjut
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: PILIH RENTANG AYAT */}
      {step === 3 && (
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-gray-600 dark:text-gray-400">
                Surat Awal
              </label>
              <select
                value={suratMulai}
                onChange={(e) => setSuratMulai(e.target.value)}
                className="w-full p-2 mt-1 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100"
              >
                {filteredSurahList.map((s) => (
                  <option key={s.number} value={s.number}>
                    {s.nameLatin}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs text-gray-600 dark:text-gray-400">
                Ayat Awal
              </label>
              <select
                value={ayatMulai}
                onChange={(e) => setAyatMulai(e.target.value)}
                className="w-full p-2 mt-1 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100"
              >
                <option value="">Pilih</option>
                {ayatOptionsMulai.map((n) => (
                  <option key={`am-${n}`} value={n}>
                    {n}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs text-gray-600 dark:text-gray-400">
                Surat Akhir
              </label>
              <select
                value={suratAkhir}
                onChange={(e) => setSuratAkhir(e.target.value)}
                className="w-full p-2 mt-1 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100"
              >
                {filteredSurahList.map((s) => (
                  <option key={s.number} value={s.number}>
                    {s.nameLatin}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs text-gray-600 dark:text-gray-400">
                Ayat Akhir
              </label>
              <select
                value={ayatAkhir}
                onChange={(e) => setAyatAkhir(e.target.value)}
                className="w-full p-2 mt-1 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100"
              >
                <option value="">Pilih</option>
                {ayatOptionsAkhir.map((n) => (
                  <option key={`aa-${n}`} value={n}>
                    {n}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex justify-between mt-4">
            <button
              onClick={() => setStep(2)}
              className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 font-medium"
            >
              Kembali
            </button>
            <button
              disabled={!canNextStep3}
              onClick={() => setStep(4)}
              className={`px-4 py-2 rounded-lg text-white font-medium ${
                canNextStep3
                  ? "bg-emerald-500 hover:bg-emerald-600"
                  : "bg-gray-300 dark:bg-gray-700 text-gray-600 cursor-not-allowed"
              }`}
            >
              Lanjut
            </button>
          </div>
        </div>
      )}

      {/* STEP 4: Reminder + Preview */}
      {step === 4 && (
        <div>
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Waktu Pengingat (opsional)
          </label>
          <input
            type="datetime-local"
            value={reminder}
            onChange={(e) => setReminder(e.target.value)}
            className="w-full p-2 mt-1 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-emerald-500 outline-none"
          />

          <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 text-sm text-gray-600 dark:text-gray-300">
            <p>
              <strong>Rentang:</strong>{" "}
              {findSurah(suratMulai)?.nameLatin} ({ayatMulai}) →{" "}
              {findSurah(suratAkhir)?.nameLatin} ({ayatAkhir})
            </p>
            {reminder && (
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                Pengingat: {new Date(reminder).toLocaleString("id-ID")}
              </p>
            )}
          </div>

          <div className="flex justify-between mt-4">
            <button
              onClick={() => setStep(3)}
              className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 font-medium"
            >
              Kembali
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white font-medium"
            >
              Simpan
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ZiyadahWizard;

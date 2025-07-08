import { useEffect, useState } from "react";
import supabase from "../utils/supabase";

interface Matakuliah {
  id?: number;
  nama: string;
}

export default function MatakuliahForm({
  fetchMatakuliah,
  editData,
  clearEdit,
}: {
  fetchMatakuliah: () => void;
  editData: Matakuliah | null;
  clearEdit: () => void;
}) {
  const [formData, setFormData] = useState<Matakuliah>({ nama: "" });

  useEffect(() => {
    if (editData) setFormData(editData);
  }, [editData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, nama: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (editData) {
      await supabase.from("matakuliah").update(formData).eq("id", editData.id);
      clearEdit();
    } else {
      await supabase.from("matakuliah").insert([formData]);
    }

    fetchMatakuliah();
    setFormData({ nama: "" });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md space-y-4 w-full max-w-md"
    >
      <h2 className="text-xl font-semibold text-slate-700 dark:text-white">
        {editData ? "Edit Mata Kuliah" : "Tambah Mata Kuliah"}
      </h2>

      <div>
        <label
          htmlFor="nama"
          className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
        >
          Nama Mata Kuliah
        </label>
        <input
          id="nama"
          name="nama"
          type="text"
          value={formData.nama}
          onChange={handleChange}
          placeholder="Contoh: Algoritma dan Struktur Data"
          className="w-full px-4 py-2 border rounded-md dark:bg-slate-700 dark:border-slate-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-gray py-2 rounded-md hover:bg-blue-700 transition-colors"
      >
        {editData ? "Update" : "Tambah"}
      </button>
    </form>
  );
}

import { useEffect, useState } from "react";
import supabase from "../utils/supabase";

interface Kelas {
  id?: number;
  nama_ruang: string;
}

export default function KelasForm({
  fetchKelas,
  editData,
  clearEdit,
}: {
  fetchKelas: () => void;
  editData: Kelas | null;
  clearEdit: () => void;
}) {
  const [formData, setFormData] = useState<Kelas>({ nama_ruang: "" });

  useEffect(() => {
    if (editData) setFormData(editData);
  }, [editData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, nama_ruang: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (editData) {
      await supabase.from("kelas").update(formData).eq("id", editData.id);
      clearEdit();
    } else {
      await supabase.from("kelas").insert([formData]);
    }

    fetchKelas();
    setFormData({ nama_ruang: "" });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md space-y-4 w-full max-w-md"
    >
      <h2 className="text-xl font-semibold text-slate-700 dark:text-white">
        {editData ? "Edit Kelas" : "Tambah Kelas"}
      </h2>

      <div>
        <label
          htmlFor="nama_ruang"
          className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
        >
          Nama Ruang
        </label>
        <input
          id="nama_ruang"
          name="nama_ruang"
          type="text"
          value={formData.nama_ruang}
          onChange={handleChange}
          placeholder="Contoh: R.301"
          className="w-full px-4 py-2 border rounded-md dark:bg-slate-700 dark:border-slate-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
      >
        {editData ? "Update" : "Tambah"}
      </button>
    </form>
  );
}

import { useEffect, useState } from "react";
import supabase from '../utils/supabase.ts';

interface Dosen {
  id?: number;
  nama: string;
  statusdosen: number;
  gelar_akademik: string;
}

export default function DosenForm({
  fetchDosen,
  editData,
  clearEdit,
}: {
  fetchDosen: () => void;
  editData: Dosen | null;
  clearEdit: () => void;
}) {
  const [formData, setFormData] = useState<Dosen>({
    nama: "",
    statusdosen: 1,
    gelar_akademik: "",
  });

  useEffect(() => {
    if (editData) {
      setFormData(editData);
    }
  }, [editData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "statusdosen" ? +value : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editData) {
      await supabase.from("dosen").update(formData).eq("id", editData.id);
      clearEdit();
    } else {
      await supabase.from("dosen").insert([formData]);
    }
    fetchDosen();
    setFormData({ nama: "", statusdosen: 1, gelar_akademik: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md space-y-4 w-full max-w-md">
      <h2 className="text-xl font-semibold text-slate-700 dark:text-white">
        {editData ? "Edit Dosen" : "Tambah Dosen"}
      </h2>

      <div>
        <label htmlFor="nama" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Nama</label>
        <input
          id="nama"
          name="nama"
          type="text"
          value={formData.nama}
          onChange={handleChange}
          placeholder="Nama Dosen"
          className="w-full px-4 py-2 border rounded-md dark:bg-slate-700 dark:border-slate-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label htmlFor="gelar_akademik" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Gelar Akademik</label>
        <input
          id="gelar_akademik"
          name="gelar_akademik"
          type="text"
          value={formData.gelar_akademik}
          onChange={handleChange}
          placeholder="Contoh: S.Kom, M.Kom"
          className="w-full px-4 py-2 border rounded-md dark:bg-slate-700 dark:border-slate-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label htmlFor="statusdosen" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Status Dosen</label>
        <select
          id="statusdosen"
          name="statusdosen"
          value={formData.statusdosen}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md dark:bg-slate-700 dark:border-slate-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value={1}>Aktif</option>
          <option value={0}>Non-Aktif</option>
        </select>
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

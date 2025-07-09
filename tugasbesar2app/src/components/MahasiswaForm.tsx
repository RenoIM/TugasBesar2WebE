import { useState, useEffect } from "react";
import supabase from '../utils/supabase.ts';

interface Mahasiswa {
  id?: number;
  nama: string;
  jurusan: string;
  semester: number;
  status: number;
}

export default function MahasiswaForm({
  fetchMahasiswa,
  editData,
  clearEdit,
}: {
  fetchMahasiswa: () => void;
  editData: Mahasiswa | null;
  clearEdit: () => void;
}) {
  const [formData, setFormData] = useState<Mahasiswa>({
    nama: "",
    jurusan: "",
    semester: 1,
    status: 1,
  });

  useEffect(() => {
    if (editData) setFormData(editData);
  }, [editData]);

  const handleChange = (e: React.ChangeEvent<any>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: name === "semester" || name === "status" ? +value : value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editData) {
      await supabase.from("mahasiswa").update(formData).eq("id", editData.id);
      clearEdit();
    } else {
      await supabase.from("mahasiswa").insert([formData]);
    }
    fetchMahasiswa();
    setFormData({ nama: "", jurusan: "", semester: 1, status: 1 });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md space-y-4 w-full max-w-md">
  <h2 className="text-xl font-semibold text-slate-700 dark:text-white">
    {editData ? "Edit Mahasiswa" : "Tambah Mahasiswa"}
  </h2>

  <div>
    <label htmlFor="nama" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Nama</label>
    <input
      id="nama"
      name="nama"
      type="text"
      value={formData.nama}
      onChange={handleChange}
      placeholder="Nama Mahasiswa"
      className="w-full px-4 py-2 border rounded-md dark:bg-slate-700 dark:border-slate-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
      required
    />
  </div>

  <div>
    <label htmlFor="jurusan" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Jurusan</label>
    <input
      id="jurusan"
      name="jurusan"
      type="text"
      value={formData.jurusan}
      onChange={handleChange}
      placeholder="Jurusan"
      className="w-full px-4 py-2 border rounded-md dark:bg-slate-700 dark:border-slate-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
      required
    />
  </div>

  <div>
    <label htmlFor="semester" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Semester</label>
    <input
      id="semester"
      name="semester"
      type="number"
      value={formData.semester}
      onChange={handleChange}
      placeholder="Semester"
      className="w-full px-4 py-2 border rounded-md dark:bg-slate-700 dark:border-slate-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
      required
      min={1}
    />
  </div>

  <div>
    <label htmlFor="status" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Status</label>
    <select
      id="status"
      name="status"
      value={formData.status}
      onChange={handleChange}
      className="w-full px-4 py-2 border rounded-md dark:bg-slate-700 dark:border-slate-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      <option value={1}>Aktif</option>
      <option value={0}>Non-Aktif</option>
    </select>
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

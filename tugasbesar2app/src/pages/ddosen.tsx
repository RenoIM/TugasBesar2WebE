import { useEffect, useState } from "react";
import supabase from "../utils/supabase";
import DosenForm from "../components/DosenForm";
import DosenTable from "../components/DosenTable";

interface Dosen {
  id: number;
  nama: string;
  gelar_akademik: string;
  statusdosen: number;
}

export default function Ddosen() {
  const [dosen, setDosen] = useState<Dosen[]>([]);
  const [editData, setEditData] = useState<Dosen | null>(null);

  const fetchDosen = async () => {
    const { data } = await supabase.from("dosen").select("*");
    if (data) setDosen(data);
  };

  const handleDelete = async (id: number) => {
    await supabase.from("dosen").delete().eq("id", id);
    fetchDosen();
  };

  useEffect(() => {
    fetchDosen();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-slate-800 dark:text-white mb-6">
        Dashboard Halaman Dosen
      </h1>

      {/* Form Dosen */}
      <div className="mb-6">
        <DosenForm
          fetchDosen={fetchDosen}
          editData={editData}
          clearEdit={() => setEditData(null)}
        />
      </div>

      {/* Tabel Dosen */}
      <DosenTable
        dosen={dosen}
        onEdit={setEditData}
        onDelete={handleDelete}
      />
    </div>
  );
}

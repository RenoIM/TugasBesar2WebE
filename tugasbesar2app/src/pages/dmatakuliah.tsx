import { useEffect, useState } from "react";
import supabase from "../utils/supabase";
import MatakuliahForm from "../components/MatakuliahForm";
import MatakuliahTable from "../components/MatakuliahTable";

interface Matakuliah {
  id: number;
  nama: string;
}

export default function Dmatakuliah() {
  const [matakuliah, setMatakuliah] = useState<Matakuliah[]>([]);
  const [editData, setEditData] = useState<Matakuliah | null>(null);

  const fetchMatakuliah = async () => {
    const { data } = await supabase.from("matakuliah").select("*");
    if (data) setMatakuliah(data);
  };

  const handleDelete = async (id: number) => {
    await supabase.from("matakuliah").delete().eq("id", id);
    fetchMatakuliah();
  };

  useEffect(() => {
    fetchMatakuliah();
  }, []);

  return (
    <div className="flex min-h-screen bg-slate-100 dark:bg-slate-900">
              {/* Sidebar */}
            <aside className="w-64 p-4 my-4 ml-4 bg-white dark:bg-slate-850 shadow-xl rounded-2xl h-fit">
              <a className="block text-lg font-bold text-slate-700 dark:text-white">
                Admin Dashboard
              </a>
            <hr className="mb-4 border-gray-300 dark:border-white/40" />
            <ul className="space-y-2">
              <li className="mt-0.5 w-full">
                    <a className=" dark:text-white dark:opacity-80 py-2.7 text-sm ease-nav-brand my-0 mx-2 flex items-center whitespace-nowrap px-4 transition-colors" href="../dashboard">
                    <div className="mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-center stroke-0 text-center xl:p-2.5">
                        <i className="relative top-0 text-sm leading-normal text-blue-500 ni ni-tv-2" />
                    </div>
                    <span className="ml-1 duration-300 opacity-100 pointer-events-none ease">Mahasiswa</span>
                    </a>
                </li>
                <li className="mt-0.5 w-full">
                    <a className="dark:text-white dark:opacity-80 py-2.7 text-sm ease-nav-brand my-0 mx-2 flex items-center whitespace-nowrap px-4 transition-colors" href="./ddosen">
                    <div className="mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-center stroke-0 text-center xl:p-2.5">
                        <i className="relative top-0 text-sm leading-normal text-orange-500 ni ni-calendar-grid-58" />
                    </div>
                    <span className="ml-1 duration-300 opacity-100 pointer-events-none ease">Dosen</span>
                    </a>
                </li>
                <li className="mt-0.5 w-full">
                    <a className="py-2.7 bg-blue-500/13 dark:text-white dark:opacity-80 text-sm ease-nav-brand my-0 mx-2 flex items-center whitespace-nowrap rounded-lg px-4 font-semibold text-slate-700 transition-colors" href="../dmatakuliah">
                    <div className="mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-center fill-current stroke-0 text-center xl:p-2.5">
                        <i className="relative top-0 text-sm leading-normal text-emerald-500 ni ni-credit-card" />
                    </div>
                    <span className="ml-1 duration-300 opacity-100 pointer-events-none ease">Modul</span>
                    </a>
                </li>
              <li className="mt-0.5 w-full">
                    <a className="dark:text-white dark:opacity-80 py-2.7 text-sm ease-nav-brand my-0 mx-2 flex items-center whitespace-nowrap px-4 transition-colors" href="../dkelas">
                    <div className="mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-center stroke-0 text-center xl:p-2.5">
                        <i className="relative top-0 text-sm leading-normal text-cyan-500 ni ni-app" />
                    </div>
                    <span className="ml-1 duration-300 opacity-100 pointer-events-none ease">Kelas</span>
                    </a>
                </li>
              <li className="mt-0.5 w-full">
                    <a className="dark:text-white dark:opacity-80 py-2.7 text-sm ease-nav-brand my-0 mx-2 flex items-center whitespace-nowrap px-4 transition-colors" href="../transaksi">
                    <div className="mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-center stroke-0 text-center xl:p-2.5">
                        <i className="relative top-0 text-sm leading-normal text-cyan-500 ni ni-app" />
                    </div>
                    <span className="ml-1 duration-300 opacity-100 pointer-events-none ease">Transaksi</span>
                    </a>
                </li>
            </ul>
            </aside>
              
              {/* Main Content */}
                <main className="flex-1 p-6">
                  <h1 className="text-2xl font-bold text-slate-800 dark:text-white mb-6">
                    Dashboard Halaman Modul
                  </h1>
              
                  {/* Form Kelas */}
                  <div className="mb-6">
                  <MatakuliahForm
                    fetchMatakuliah={fetchMatakuliah}
                    editData={editData}
                    clearEdit={() => setEditData(null)}
                  />
                  </div>

                  <MatakuliahTable
                    matakuliah={matakuliah}
                    onEdit={setEditData}
                    onDelete={handleDelete}
                  />

                </main>
              </div>
  );
}

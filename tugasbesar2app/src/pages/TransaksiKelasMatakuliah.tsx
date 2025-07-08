import { useEffect, useState } from "react";
import supabase from "../utils/supabase";

interface Kelas {
  id: number;
  nama_ruang: string;
}

interface Matakuliah {
  id: number;
  nama: string;
}

interface KelasMatakuliah {
  id: number;
  kelas_id: number;
  matakuliah_id: number;
  matakuliah?: Matakuliah;
}

export default function TransaksiKelasMatakuliah() {
  const [kelasList, setKelasList] = useState<Kelas[]>([]);
  const [matakuliahList, setMatakuliahList] = useState<Matakuliah[]>([]);
  const [selectedKelasId, setSelectedKelasId] = useState<number | null>(null);
  const [kelasMatakuliah, setKelasMatakuliah] = useState<KelasMatakuliah[]>([]);
  const [selectedMatakuliahId, setSelectedMatakuliahId] = useState<number | null>(null);

  const fetchAll = async () => {
    const { data: kelas } = await supabase.from("kelas").select("*");
    const { data: matakuliah } = await supabase.from("matakuliah").select("*");
    if (kelas) setKelasList(kelas);
    if (matakuliah) setMatakuliahList(matakuliah);
  };

  const fetchRelasi = async (kelasId: number) => {
    const { data } = await supabase
      .from("kelas_matakuliah")
      .select("*, matakuliah(*)")
      .eq("kelas_id", kelasId);
    if (data) setKelasMatakuliah(data);
  };

  const handleAdd = async () => {
    if (!selectedKelasId || !selectedMatakuliahId) return;
    await supabase.from("kelas_matakuliah").insert([
    {
        kelas_id: selectedKelasId,
        matakuliah_id: selectedMatakuliahId,
    },
    ]);
    fetchRelasi(selectedKelasId);
    setSelectedMatakuliahId(null);
  };

  const handleDelete = async (id: number) => {
    await supabase.from("kelas_matakuliah").delete().eq("id", id);
    if (selectedKelasId) fetchRelasi(selectedKelasId);
  };

  useEffect(() => {
    fetchAll();
  }, []);

  useEffect(() => {
    if (selectedKelasId) fetchRelasi(selectedKelasId);
  }, [selectedKelasId]);

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
                    <a className="dark:text-white dark:opacity-80 py-2.7 text-sm ease-nav-brand my-0 mx-2 flex items-center whitespace-nowrap px-4 transition-colors" href="../dmatakuliah">
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
                    <a className="py-2.7 bg-blue-500/13 dark:text-white dark:opacity-80 text-sm ease-nav-brand my-0 mx-2 flex items-center whitespace-nowrap rounded-lg px-4 font-semibold text-slate-700 transition-colors" href="../transaksi">
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
        <h1 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">Manajemen Mata Kuliah per Kelas</h1>

        {/* Pilih Kelas */}
        <div className="mb-4">
          <label className="block mb-1 text-slate-700 dark:text-white">Pilih Kelas:</label>
          <select
            value={selectedKelasId ?? ""}
            onChange={(e) => setSelectedKelasId(Number(e.target.value))}
            className="block w-full border px-4 py-2 rounded-md dark:bg-slate-700 dark:text-white"
          >
            <option value="">-- Pilih Kelas --</option>
            {kelasList.map((k) => (
              <option key={k.id} value={k.id}>
                {k.nama_ruang}
              </option>
            ))}
          </select>
        </div>

        {/* Tambah Matakuliah */}
        {selectedKelasId && (
          <>
            <div className="flex items-center gap-2 mb-6">
              <select
                value={selectedMatakuliahId ?? ""}
                onChange={(e) => setSelectedMatakuliahId(Number(e.target.value))}
                className="block border px-4 py-2 rounded-md dark:bg-slate-700 dark:text-white"
              >
                <option value="">-- Pilih Mata Kuliah --</option>
                {matakuliahList.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.nama}
                  </option>
                ))}
              </select>
              <button
                onClick={handleAdd}
                disabled={!selectedMatakuliahId}
                className="bg-blue-600 text-gray px-4 py-2 rounded-md hover:bg-blue-700 disabled:bg-gray-400">
                Tambah
              </button>
            </div>

            {/* Daftar Matakuliah */}
            <div>
              <h2 className="text-lg font-semibold text-slate-700 dark:text-white mb-2">Mata Kuliah dalam Kelas</h2>
              <ul className="space-y-2">
                {kelasMatakuliah.map((km) => (
                  <li
                    key={km.id}
                    className="flex justify-between items-center bg-white dark:bg-slate-800 px-4 py-2 rounded shadow"
                  >
                    <span>{km.matakuliah?.nama}</span>
                    <button
                      onClick={() => handleDelete(km.id)}
                      className="text-red-600 hover:underline text-sm"
                    >
                      Hapus
                    </button>
                  </li>
                ))}
              </ul>
              {kelasMatakuliah.length === 0 && (
                <p className="text-slate-500 dark:text-slate-400 mt-2">Belum ada mata kuliah ditambahkan.</p>
              )}
            </div>
          </>
        )}
      </main>
    </div>
  );
}

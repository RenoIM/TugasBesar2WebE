interface Dosen {
  id: number;
  nama: string;
  statusdosen: number;
  gelar_akademik: string;
}

export default function DosenTable({
  dosen,
  onEdit,
  onDelete,
}: {
  dosen: Dosen[];
  onEdit: (data: Dosen) => void;
  onDelete: (id: number) => void;
}) {
  return (
    <div className="flex flex-wrap -mx-3">
      <div className="flex-none w-full max-w-full px-3">
        <div className="relative flex flex-col min-w-0 mb-6 break-words bg-white border-0 border-transparent shadow-xl dark:bg-slate-850 dark:shadow-dark-xl rounded-2xl bg-clip-border">
          <div className="p-6 pb-0 mb-0 border-b-0 border-b-solid rounded-t-2xl border-b-transparent">
            <h6 className="dark:text-white">List Dosen</h6>
          </div>
          <div className="flex-auto px-0 pt-0 pb-2">
            <div className="p-0 overflow-x-auto">
              <table className="items-center w-full mb-0 align-top border-collapse dark:border-white/40 text-slate-500">
                <thead className="align-bottom">
                  <tr>
                    <th className="px-6 py-3 text-left text-xxs font-bold uppercase tracking-wide text-slate-400 dark:text-white dark:opacity-70">Nama</th>
                    <th className="px-6 py-3 text-left text-xxs font-bold uppercase tracking-wide text-slate-400 dark:text-white dark:opacity-70">Gelar Akademik</th>
                    <th className="px-6 py-3 text-center text-xxs font-bold uppercase tracking-wide text-slate-400 dark:text-white dark:opacity-70">Status</th>
                    <th className="px-6 py-3 text-center text-xxs font-bold uppercase tracking-wide text-slate-400 dark:text-white dark:opacity-70">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {dosen.map((d) => (
                    <tr key={d.id}>
                      <td className="p-4 align-middle bg-transparent border-b dark:border-white/40 whitespace-nowrap">
                        <div className="flex px-2 py-1">
                          <div className="flex flex-col justify-center">
                            <h6 className="mb-0 text-sm font-normal leading-normal dark:text-white">
                              {d.nama}
                            </h6>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 align-middle bg-transparent border-b dark:border-white/40 whitespace-nowrap">
                        <p className="mb-0 text-xs font-semibold leading-tight dark:text-white dark:opacity-80">
                          {d.gelar_akademik}
                        </p>
                      </td>
                      <td className="p-4 text-center align-middle bg-transparent border-b dark:border-white/40 whitespace-nowrap">
                        <span
                          className={`px-2.5 py-1.4 text-xs font-bold text-white uppercase rounded ${
                            d.statusdosen === 1
                              ? "bg-gradient-to-tl from-emerald-500 to-teal-400"
                              : "bg-gradient-to-tl from-red-500 to-pink-400"
                          }`}
                        >
                          {d.statusdosen === 1 ? "Aktif" : "Non-Aktif"}
                        </span>
                      </td>
                      <td className="p-4 text-center align-middle bg-transparent border-b dark:border-white/40 whitespace-nowrap">
                        <button
                          onClick={() => onEdit(d)}
                          className="mr-2 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => onDelete(d.id)}
                          className="text-xs font-semibold text-red-600 dark:text-red-400 hover:underline"
                        >
                          Hapus
                        </button>
                      </td>
                    </tr>
                  ))}
                  {dosen.length === 0 && (
                    <tr>
                      <td colSpan={4} className="p-4 text-center text-sm text-slate-400 dark:text-slate-500">
                        Tidak ada data dosen.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

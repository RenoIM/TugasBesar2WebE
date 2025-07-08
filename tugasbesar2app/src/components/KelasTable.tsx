interface Kelas {
  id: number;
  nama_ruang: string;
}

export default function KelasTable({
  kelas,
  onEdit,
  onDelete,
}: {
  kelas: Kelas[];
  onEdit: (data: Kelas) => void;
  onDelete: (id: number) => void;
}) {
  return (
    <div className="flex flex-wrap -mx-3">
      <div className="flex-none w-full max-w-full px-3">
        <div className="relative flex flex-col min-w-0 mb-6 break-words bg-white border-0 border-transparent shadow-xl dark:bg-slate-850 dark:shadow-dark-xl rounded-2xl bg-clip-border">
          <div className="p-6 pb-0 mb-0 border-b-0 rounded-t-2xl">
            <h6 className="dark:text-white">List Kelas</h6>
          </div>
          <div className="flex-auto px-0 pt-0 pb-2">
            <div className="p-0 overflow-x-auto">
              <table className="items-center w-full mb-0 align-top border-collapse dark:border-white/40 text-slate-500">
                <thead className="align-bottom">
                  <tr>
                    <th className="px-6 py-3 text-left text-xxs font-bold uppercase tracking-wide text-slate-400 dark:text-white dark:opacity-70">
                      Nama Ruang
                    </th>
                    <th className="px-6 py-3 text-center text-xxs font-bold uppercase tracking-wide text-slate-400 dark:text-white dark:opacity-70">
                      Aksi
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {kelas.map((k) => (
                    <tr key={k.id}>
                      <td className="p-4 align-middle bg-transparent border-b dark:border-white/40 whitespace-nowrap">
                        <p className="mb-0 text-sm font-medium leading-tight dark:text-white dark:opacity-90">
                          {k.nama_ruang}
                        </p>
                      </td>
                      <td className="p-4 text-center align-middle bg-transparent border-b dark:border-white/40 whitespace-nowrap">
                        <button
                          onClick={() => onEdit(k)}
                          className="mr-2 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => onDelete(k.id)}
                          className="text-xs font-semibold text-red-600 dark:text-red-400 hover:underline"
                        >
                          Hapus
                        </button>
                      </td>
                    </tr>
                  ))}
                  {kelas.length === 0 && (
                    <tr>
                      <td colSpan={2} className="p-4 text-center text-sm text-slate-400 dark:text-slate-500">
                        Tidak ada data kelas.
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

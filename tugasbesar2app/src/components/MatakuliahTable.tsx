interface Matakuliah {
  id: number;
  nama: string;
}

export default function MatakuliahTable({
  matakuliah,
  onEdit,
  onDelete,
}: {
  matakuliah: Matakuliah[];
  onEdit: (data: Matakuliah) => void;
  onDelete: (id: number) => void;
}) {
  return (
    <div className="flex flex-wrap -mx-3">
      <div className="flex-none w-full max-w-full px-3">
        <div className="relative flex flex-col min-w-0 mb-6 break-words bg-white border-0 shadow-xl dark:bg-slate-850 dark:shadow-dark-xl rounded-2xl bg-clip-border">
          <div className="p-6 pb-0 mb-0 rounded-t-2xl">
            <h6 className="dark:text-white">List Mata Kuliah</h6>
          </div>
          <div className="flex-auto px-0 pt-0 pb-2">
            <div className="p-0 overflow-x-auto">
              <table className="items-center w-full mb-0 align-top border-collapse dark:border-white/40 text-slate-500">
                <thead className="align-bottom">
                  <tr>
                    <th className="px-6 py-3 text-left text-xxs font-bold uppercase tracking-wide text-slate-400 dark:text-white dark:opacity-70">
                      Nama Mata Kuliah
                    </th>
                    <th className="px-6 py-3 text-center text-xxs font-bold uppercase tracking-wide text-slate-400 dark:text-white dark:opacity-70">
                      Aksi
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {matakuliah.map((m) => (
                    <tr key={m.id}>
                      <td className="p-4 align-middle bg-transparent border-b dark:border-white/40 whitespace-nowrap">
                        <p className="mb-0 text-sm font-medium leading-tight dark:text-white dark:opacity-90">
                          {m.nama}
                        </p>
                      </td>
                      <td className="p-4 text-center align-middle bg-transparent border-b dark:border-white/40 whitespace-nowrap">
                        <button
                          onClick={() => onEdit(m)}
                          className="mr-2 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => onDelete(m.id)}
                          className="text-xs font-semibold text-red-600 dark:text-red-400 hover:underline"
                        >
                          Hapus
                        </button>
                      </td>
                    </tr>
                  ))}
                  {matakuliah.length === 0 && (
                    <tr>
                      <td colSpan={2} className="p-4 text-center text-sm text-slate-400 dark:text-slate-500">
                        Tidak ada data mata kuliah.
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

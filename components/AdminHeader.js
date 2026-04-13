export default function AdminHeader() {
  return (
    <header className="bg-[#0B0F19] border-b border-gray-800 p-6 flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold">Panel Administrateur</h1>
        <p className="text-gray-400 text-sm">Gérez votre plateforme Neurix</p>
      </div>
      <div className="flex items-center gap-4">
        <div className="text-right">
          <p className="text-sm font-semibold">Admin</p>
          <p className="text-xs text-gray-400">Connecté</p>
        </div>
        <div className="w-10 h-10 bg-[#6366F1] rounded-full flex items-center justify-center text-white font-bold">
          A
        </div>
      </div>
    </header>
  );
}

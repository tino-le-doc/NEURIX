export default function Sidebar() {
  return (
    <div className="w-64 h-screen bg-[#0F172A] border-r border-gray-800 p-6 flex flex-col justify-between">
      <div>
        <h1 className="text-xl font-semibold mb-10">NEURIX</h1>
        <nav className="flex flex-col gap-4 text-gray-400">
          <a className="hover:text-white transition">Dashboard</a>
          <a className="hover:text-white transition">Projets</a>
          <a className="hover:text-white transition">Compute</a>
          <a className="hover:text-white transition">Facturation</a>
          <a className="hover:text-white transition">Paramètres</a>
        </nav>
      </div>
      <div className="text-sm text-gray-500">
        Usage GPU<br />
        12h restantes
      </div>
    </div>
  );
}

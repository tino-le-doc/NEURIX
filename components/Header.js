export default function Header() {
  return (
    <div className="flex justify-between items-center p-6 border-b border-gray-800 backdrop-blur-md bg-[#0B0F19]/80">
      <h2 className="text-lg font-semibold">Dashboard</h2>
      <div className="flex items-center gap-4">
        <input
          placeholder="Rechercher..."
          className="bg-[#111827] px-3 py-2 rounded-md text-sm outline-none"
        />
        <div className="w-8 h-8 bg-gray-700 rounded-full"></div>
      </div>
    </div>
  );
}

import Link from 'next/link';

export default function AdminHeader() {
  return (
    <header className="bg-[#0B0F19] border-b border-gray-800 p-6 flex items-center justify-between sticky top-0 z-50">
      <div>
        <div className="flex items-center gap-3 mb-1">
          <span className="bg-gradient-to-r from-red-600 to-pink-600 text-xs px-3 py-1 rounded-full font-semibold text-white">
            🔐 MODE ADMIN
          </span>
          <h1 className="text-2xl font-bold">Neurix Administration</h1>
        </div>
        <p className="text-gray-400 text-sm">Gérez la plateforme • Client: <span className="text-purple-400">v1.0.0</span></p>
      </div>
      
      <div className="flex items-center gap-6">
        {/* Quick Links */}
        <div className="flex items-center gap-2 bg-gray-800 bg-opacity-50 rounded-lg p-2">
          <Link
            href="/dashboard"
            className="text-sm px-3 py-2 bg-purple-600 hover:bg-purple-700 rounded-md transition text-white font-medium"
            title="Voir comme utilisateur"
          >
            👤 User
          </Link>
          <Link
            href="/"
            className="text-sm px-3 py-2 hover:bg-gray-700 rounded-md transition text-gray-300"
            title="Accueil du site"
          >
            🏠
          </Link>
        </div>

        {/* User Info */}
        <div className="text-right">
          <p className="text-sm font-semibold">Administrateur</p>
          <p className="text-xs text-gray-400">Développement</p>
        </div>

        {/* Avatar */}
        <div className="w-10 h-10 bg-gradient-to-br from-[#6366F1] via-[#8b5cf6] to-[#ec4899] rounded-full flex items-center justify-center text-white font-bold text-lg cursor-pointer hover:shadow-lg hover:shadow-purple-500/50 transition">
          ⚙️
        </div>
      </div>
    </header>
  );
}

import Link from 'next/link';
import { useState } from 'react';

export default function AdminSidebar() {
  const [isOpen, setIsOpen] = useState(true);

  const adminMenuItems = [
    { href: '/admin/dashboard', label: '📊 Dashboard', icon: '📊' },
    { href: '/admin/projects', label: '📁 Projets', icon: '📁' },
    { href: '/admin/users', label: '👥 Utilisateurs', icon: '👥' },
    { href: '/admin/models', label: '🤖 Modèles', icon: '🤖' },
    { href: '/admin/jobs', label: '⚙️ Jobs', icon: '⚙️' },
    { href: '/admin/analytics', label: '📈 Analytics', icon: '📈' },
    { href: '/admin/settings', label: '⚙️ Paramètres', icon: '⚙️' },
  ];

  const userMenuItems = [
    { href: '/', label: '🏠 Accueil', icon: '🏠' },
    { href: '/dashboard', label: '📋 Dashboard', icon: '📋' },
    { href: '/models', label: '🤖 Modèles', icon: '🤖' },
    { href: '/jobs', label: '📂 Historique', icon: '📂' },
    { href: '/profile', label: '👤 Profile', icon: '👤' },
    { href: '/settings', label: '⚙️ Paramètres', icon: '⚙️' },
    { href: '/docs', label: '📚 Documentation', icon: '📚' },
  ];

  return (
    <aside className={`${isOpen ? 'w-64' : 'w-20'} bg-[#0B0F19] border-r border-gray-800 transition-all duration-300 fixed h-screen flex flex-col`}>
      <div className="p-4 flex items-center justify-between border-b border-gray-800">
        {isOpen && <h1 className="text-xl font-bold gradient-text">Admin</h1>}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 hover:bg-gray-800 rounded-md transition"
        >
          {isOpen ? '◀' : '▶'}
        </button>
      </div>

      <nav className="flex-1 p-4 space-y-6 overflow-y-auto">
        {/* Admin Section */}
        <div>
          {isOpen && <p className="text-xs text-gray-500 uppercase tracking-wider px-2 mb-3 font-semibold">Admin</p>}
          <div className="space-y-1">
            {adminMenuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 px-4 py-2.5 rounded-md hover:bg-[#6366F1] transition group text-gray-300"
                title={item.label}
              >
                <span className="text-lg">{item.icon}</span>
                {isOpen && <span className="text-sm">{item.label}</span>}
              </Link>
            ))}
          </div>
        </div>

        {/* Separator */}
        <div className="border-t border-gray-700"></div>

        {/* User Interface Section */}
        <div>
          {isOpen && <p className="text-xs text-purple-400 uppercase tracking-wider px-2 mb-3 font-semibold">📱 Interface</p>}
          <div className="space-y-1">
            {userMenuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 px-4 py-2.5 rounded-md hover:bg-purple-600 hover:text-white transition group text-purple-200"
                title={item.label}
              >
                <span className="text-lg">{item.icon}</span>
                {isOpen && <span className="text-sm">{item.label}</span>}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      <div className="p-4 border-t border-gray-800 space-y-2">
        <button className="w-full flex items-center gap-3 px-4 py-2.5 rounded-md hover:bg-red-900 transition text-sm text-left text-red-400">
          <span>🚪</span>
          {isOpen && <span>Se déconnecter</span>}
        </button>
      </div>
    </aside>
  );
}

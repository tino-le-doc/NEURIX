import Link from 'next/link';
import { useState } from 'react';

export default function AdminSidebar() {
  const [isOpen, setIsOpen] = useState(true);

  const menuItems = [
    { href: '/admin/dashboard', label: '📊 Dashboard', icon: '📊' },
    { href: '/admin/users', label: '👥 Utilisateurs', icon: '👥' },
    { href: '/admin/models', label: '🤖 Modèles', icon: '🤖' },
    { href: '/admin/jobs', label: '⚙️ Jobs', icon: '⚙️' },
    { href: '/admin/analytics', label: '📈 Analytics', icon: '📈' },
    { href: '/admin/settings', label: '⚙️ Paramètres', icon: '⚙️' },
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

      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-center gap-3 px-4 py-3 rounded-md hover:bg-[#6366F1] transition group"
            title={item.label}
          >
            <span className="text-lg">{item.icon}</span>
            {isOpen && <span className="text-sm">{item.label}</span>}
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-gray-800 space-y-2">
        <Link
          href="/"
          className="flex items-center gap-3 px-4 py-3 rounded-md hover:bg-gray-800 transition text-sm"
        >
          <span>🏠</span>
          {isOpen && <span>Accueil</span>}
        </Link>
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-md hover:bg-red-900 transition text-sm text-left">
          <span>🚪</span>
          {isOpen && <span>Se déconnecter</span>}
        </button>
      </div>
    </aside>
  );
}

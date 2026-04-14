import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Sidebar() {
  const router = useRouter();

  const menuItems = [
    { href: '/dashboard', label: 'Dashboard', icon: '📊' },
    { href: '/projects', label: 'Projets', icon: '📁' },
    { href: '/compute', label: 'Compute', icon: '🖥️' },
    { href: '/my-gpus', label: 'Mes GPU', icon: '⚡' },
    { href: '/billing', label: 'Facturation', icon: '💳' },
    { href: '/models', label: 'Modèles', icon: '🤖' },
    { href: '/jobs', label: 'Historique', icon: '📂' },
    { href: '/profile', label: 'Profil', icon: '👤' },
    { href: '/settings', label: 'Paramètres', icon: '⚙️' },
    { href: '/docs', label: 'Documentation', icon: '📚' },
  ];

  return (
    <div className="w-64 bg-[#0F172A] border-r border-gray-800 p-6 flex flex-col justify-between overflow-y-auto fixed left-0 top-0 h-screen z-50">
      <div>
        {/* Logo */}
        <Link href="/" className="text-xl font-bold gradient-text mb-10 block hover:opacity-80 transition">
          ⚡ NEURIX
        </Link>

        {/* Navigation */}
        <nav className="flex flex-col gap-2">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                router.pathname === item.href
                  ? 'bg-[#6366F1] text-white'
                  : 'text-gray-400 hover:text-white hover:bg-gray-800'
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              <span className="text-sm">{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>

      {/* Footer Info */}
      <div className="space-y-4 pt-6 border-t border-gray-700">
        <div className="p-3 bg-[#6366F1] bg-opacity-20 rounded-lg border border-[#6366F1] border-opacity-30">
          <p className="text-xs text-gray-400 mb-1">💾 Stockage utilisé</p>
          <div className="w-full bg-gray-800 rounded-full h-2 mb-2">
            <div className="bg-[#6366F1] h-2 rounded-full" style={{ width: '36%' }}></div>
          </div>
          <p className="text-xs text-gray-400">58GB / 160GB</p>
        </div>

        <div className="p-3 bg-gray-800 rounded-lg">
          <p className="text-xs text-gray-400 mb-1">⏱️ GPU restants</p>
          <p className="text-lg font-bold text-[#6366F1]">12.5h</p>
          <p className="text-xs text-gray-500">Forfait Pro</p>
        </div>

        <Link
          href="/profile"
          className="w-full flex items-center gap-2 p-3 bg-gray-800 hover:bg-gray-700 rounded-lg transition"
        >
          <span className="text-lg">👤</span>
          <span className="text-sm">Jean Dupont</span>
        </Link>
      </div>
    </div>
  );
}

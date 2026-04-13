import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const { data: session } = useSession();
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="flex justify-between items-center p-6 border-b border-gray-800 backdrop-blur-md bg-[#0B0F19]/80 sticky top-0 z-40">
      <h2 className="text-lg font-semibold">Dashboard</h2>
      
      <div className="flex items-center gap-4">
        {/* Search */}
        <input
          placeholder="Rechercher..."
          className="bg-[#111827] px-3 py-2 rounded-md text-sm outline-none focus:ring-1 focus:ring-[#6366F1] transition"
        />

        {/* User Profile */}
        {session?.user ? (
          <div className="relative">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="flex items-center gap-2 hover:bg-gray-800 px-3 py-2 rounded-lg transition"
            >
              <div className="w-8 h-8 bg-[#6366F1] rounded-full flex items-center justify-center text-white font-semibold text-sm">
                {session.user.avatar || session.user.name?.[0] || '👤'}
              </div>
              <span className="text-sm font-medium max-w-[150px] truncate">{session.user.name}</span>
              <svg
                className={`w-4 h-4 transition ${showMenu ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </button>

            {showMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-[#0F172A] border border-gray-700 rounded-lg shadow-xl py-2 z-50">
                <div className="px-4 py-2 border-b border-gray-700">
                  <p className="text-sm font-semibold">{session.user.name}</p>
                  <p className="text-xs text-gray-400">{session.user.email}</p>
                  {session.user.plan && (
                    <p className="text-xs text-[#6366F1] font-semibold mt-1">Plan: {session.user.plan}</p>
                  )}
                </div>

                <Link
                  href="/profile"
                  className="block px-4 py-2 text-sm hover:bg-gray-800 transition text-gray-300"
                  onClick={() => setShowMenu(false)}
                >
                  👤 Mon profil
                </Link>

                <Link
                  href="/settings"
                  className="block px-4 py-2 text-sm hover:bg-gray-800 transition text-gray-300"
                  onClick={() => setShowMenu(false)}
                >
                  ⚙️ Paramètres
                </Link>

                <div className="border-t border-gray-700 mt-2 pt-2">
                  <button
                    onClick={() => {
                      setShowMenu(false);
                      signOut({ redirect: true, callbackUrl: '/login' });
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-gray-800 transition"
                  >
                    🚪 Déconnexion
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="w-8 h-8 bg-gray-700 rounded-full"></div>
        )}
      </div>
    </div>
  );
}

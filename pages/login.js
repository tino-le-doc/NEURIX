import { useState } from 'react';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('jean.dupont@example.com');
  const [password, setPassword] = useState('password123');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError(result.error);
      } else if (result?.ok) {
        router.push('/dashboard');
      }
    } catch (err) {
      setError('Erreur de connexion');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-6 bg-[#0B0F19]">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-4xl font-bold">⚡ neu-rix</h1>
          <p className="text-gray-400">Bienvenue sur la plateforme IA</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          {/* Email Input */}
          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="votre@email.com"
              className="w-full bg-[#0F172A] border border-gray-700 rounded-lg p-3 text-white outline-none focus:border-[#6366F1] focus:ring-1 focus:ring-[#6366F1] transition"
            />
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-sm font-medium mb-2">Mot de passe</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-[#0F172A] border border-gray-700 rounded-lg p-3 text-white outline-none focus:border-[#6366F1] focus:ring-1 focus:ring-[#6366F1] transition"
            />
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-3 bg-red-900/20 border border-red-700 rounded-lg">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          {/* Demo Credentials */}
          <div className="p-3 bg-blue-900/20 border border-blue-700 rounded-lg">
            <p className="text-blue-400 text-xs font-semibold mb-1">📝 Comptes de démonstration:</p>
            <div className="text-xs text-blue-300 space-y-1">
              <p>• jean.dupont@example.com / password123</p>
              <p>• marie.martin@example.com / password123</p>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#6366F1] hover:opacity-90 disabled:opacity-50 text-white font-semibold py-3 rounded-lg transition"
          >
            {loading ? '⟳ Connexion...' : '✓ Se connecter'}
          </button>
        </form>

        {/* Signup Link */}
        <div className="mt-6 text-center">
          <p className="text-gray-400 text-sm">
            Pas encore inscrit?{' '}
            <Link href="/signup" className="text-[#6366F1] hover:underline font-semibold">
              Créer un compte
            </Link>
          </p>
        </div>

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-gray-800 text-center">
          <p className="text-gray-500 text-xs">
            Plateforme de développement | neu-rix v1.0.0
          </p>
        </div>
      </div>
    </div>
  );
}

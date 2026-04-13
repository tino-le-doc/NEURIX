import { useState } from 'react';
import Link from 'next/link';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    console.log('Login:', { email, password });
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-6">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-3xl font-bold">Connexion</h1>
          <p className="text-gray-400">Accédez à votre compte Neurix</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block mb-2 text-sm">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="votre@email.com"
              className="w-full bg-[#0B0F19] border border-gray-700 rounded-md p-3 outline-none focus:border-[#6366F1]"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm">Mot de passe</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-[#0B0F19] border border-gray-700 rounded-md p-3 outline-none focus:border-[#6366F1]"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#6366F1] py-3 rounded-md font-semibold hover:opacity-90 transition"
          >
            Se connecter
          </button>
        </form>

        <p className="mt-4 text-center text-gray-400">
          Pas de compte ?{' '}
          <Link href="/signup" className="text-[#6366F1] hover:underline">
            S'inscrire
          </Link>
        </p>
      </div>
    </div>
  );
}

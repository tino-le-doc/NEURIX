import { useState } from 'react';
import Link from 'next/link';

export default function Signup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignup = (e) => {
    e.preventDefault();
    console.log('Signup:', formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">Créer un compte</h1>
          <p className="text-gray-400">Rejoignez Neurix aujourd'hui</p>
        </div>

        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label className="block text-sm mb-2">Nom complet</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Jean Dupont"
              className="w-full bg-[#0B0F19] border border-gray-700 rounded-md p-3 outline-none focus:border-[#6366F1]"
            />
          </div>

          <div>
            <label className="block text-sm mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="votre@email.com"
              className="w-full bg-[#0B0F19] border border-gray-700 rounded-md p-3 outline-none focus:border-[#6366F1]"
            />
          </div>

          <div>
            <label className="block text-sm mb-2">Mot de passe</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full bg-[#0B0F19] border border-gray-700 rounded-md p-3 outline-none focus:border-[#6366F1]"
            />
          </div>

          <div>
            <label className="block text-sm mb-2">Confirmer le mot de passe</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full bg-[#0B0F19] border border-gray-700 rounded-md p-3 outline-none focus:border-[#6366F1]"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#6366F1] py-3 rounded-md font-semibold hover:opacity-90 transition"
          >
            S'inscrire
          </button>
        </form>

        <p className="text-center text-gray-400 mt-4">
          Vous avez déjà un compte ?{' '}
          <Link href="/login" className="text-[#6366F1] hover:underline">
            Se connecter
          </Link>
        </p>
      </div>
    </div>
  );
}

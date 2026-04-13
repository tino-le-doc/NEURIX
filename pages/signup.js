import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { signIn } from 'next-auth/react';

export default function Signup() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('Le mot de passe doit contenir au moins 6 caractères');
      setLoading(false);
      return;
    }

    try {
      // En production, appeler une API pour créer le compte
      setMessage('✓ Compte créé avec succès! Connexion...');
      
      // Connexion automatique
      setTimeout(async () => {
        const result = await signIn('credentials', {
          email: formData.email,
          password: formData.password,
          redirect: false,
        });

        if (result?.ok) {
          router.push('/dashboard');
        } else {
          setError('Erreur lors de la connexion');
        }
      }, 1000);
    } catch (err) {
      setError('Erreur lors de l\'inscription');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-[#0B0F19]">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-2">⚡ Neurix</h1>
          <p className="text-gray-400">Rejoignez la plateforme IA</p>
        </div>

        <form onSubmit={handleSignup} className="space-y-4">
          {/* Name Input */}
          <div>
            <label className="block text-sm font-medium mb-2">Nom complet</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Jean Dupont"
              required
              className="w-full bg-[#0F172A] border border-gray-700 rounded-lg p-3 text-white outline-none focus:border-[#6366F1] focus:ring-1 focus:ring-[#6366F1] transition"
            />
          </div>

          {/* Email Input */}
          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="votre@email.com"
              required
              className="w-full bg-[#0F172A] border border-gray-700 rounded-lg p-3 text-white outline-none focus:border-[#6366F1] focus:ring-1 focus:ring-[#6366F1] transition"
            />
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-sm font-medium mb-2">Mot de passe</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              required
              minLength="6"
              className="w-full bg-[#0F172A] border border-gray-700 rounded-lg p-3 text-white outline-none focus:border-[#6366F1] focus:ring-1 focus:ring-[#6366F1] transition"
            />
          </div>

          {/* Confirm Password Input */}
          <div>
            <label className="block text-sm font-medium mb-2">Confirmer le mot de passe</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="••••••••"
              required
              minLength="6"
              className="w-full bg-[#0F172A] border border-gray-700 rounded-lg p-3 text-white outline-none focus:border-[#6366F1] focus:ring-1 focus:ring-[#6366F1] transition"
            />
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-3 bg-red-900/20 border border-red-700 rounded-lg">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          {/* Success Message */}
          {message && (
            <div className="p-3 bg-green-900/20 border border-green-700 rounded-lg">
              <p className="text-green-400 text-sm">{message}</p>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#6366F1] hover:opacity-90 disabled:opacity-50 text-white font-semibold py-3 rounded-lg transition"
          >
            {loading ? '⟳ Inscription...' : '✓ S\'inscrire'}
          </button>
        </form>

        {/* Login Link */}
        <div className="mt-6 text-center">
          <p className="text-gray-400 text-sm">
            Vous avez déjà un compte?{' '}
            <Link href="/login" className="text-[#6366F1] hover:underline font-semibold">
              Se connecter
            </Link>
          </p>
        </div>

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-gray-800 text-center">
          <p className="text-gray-500 text-xs">
            Plateforme de développement | Neurix v1.0.0
          </p>
        </div>
      </div>
    </div>
  );
}

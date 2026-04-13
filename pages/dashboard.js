import { useState } from "react";
import Link from "next/link";
import Card from "../components/Card";

export default function Dashboard() {
  const [prompt, setPrompt] = useState("");
  const [jobs, setJobs] = useState([
    { title: "Génération d'image - Coucher de soleil", status: "Complété", time: "2 min" },
    { title: "Transcription audio - Podcast", status: "En cours", time: "3 min" },
  ]);

  const runAI = async () => {
    if (prompt.trim()) {
      setJobs([{ title: prompt, status: "En attente", time: "0 min" }, ...jobs]);
      setPrompt("");
    }
  };

  const quickActions = [
    {
      href: '/dashboard',
      label: 'Dashboard',
      icon: '📊',
      description: 'Vue d\'ensemble',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      href: '/projects',
      label: 'Projets',
      icon: '📁',
      description: 'Gérer les projets',
      color: 'from-purple-500 to-pink-500'
    },
    {
      href: '/compute',
      label: 'Compute',
      icon: '🖥️',
      description: 'Ressources GPU',
      color: 'from-green-500 to-emerald-500'
    },
    {
      href: '/billing',
      label: 'Facturation',
      icon: '💳',
      description: 'Gestion des coûts',
      color: 'from-orange-500 to-red-500'
    },
    {
      href: '/profile',
      label: 'Profil',
      icon: '👤',
      description: 'Mon compte',
      color: 'from-indigo-500 to-blue-500'
    },
    {
      href: '/settings',
      label: 'Paramètres',
      icon: '⚙️',
      description: 'Préférences',
      color: 'from-gray-500 to-slate-500'
    },
  ];

  const stats = [
    { label: 'GPU disponible', value: '12/16', icon: '🖥️', color: 'from-green-500 to-emerald-500' },
    { label: 'Jobs ce mois', value: '156', icon: '⚙️', color: 'from-blue-500 to-cyan-500' },
    { label: 'Coût actuel', value: '$156.80', icon: '💰', color: 'from-orange-500 to-yellow-500' },
    { label: 'Projets actifs', value: '4', icon: '📁', color: 'from-purple-500 to-pink-500' },
  ];

  return (
    <div className="p-6 space-y-6 bg-gradient-to-b from-[#0B0F19] to-[#1a1f2e]">
          {/* Welcome */}
          <div>
            <h1 className="text-4xl font-bold mb-2">Bienvenue, Jean 👋</h1>
            <p className="text-gray-400">Voici votre tableau de bord Neurix</p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {stats.map((stat, idx) => (
              <Card key={idx} className={`p-5 bg-gradient-to-br ${stat.color} bg-opacity-10 border-0`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm mb-1">{stat.label}</p>
                    <p className="text-3xl font-bold">{stat.value}</p>
                  </div>
                  <span className="text-4xl opacity-50">{stat.icon}</span>
                </div>
              </Card>
            ))}
          </div>

          {/* Quick Access Buttons */}
          <Card className="p-6">
            <h2 className="text-2xl font-bold mb-4">⚡ Accès rapide</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {quickActions.map((action) => (
                <Link
                  key={action.href}
                  href={action.href}
                  className={`p-4 rounded-lg border-2 border-transparent hover:border-[#6366F1] bg-gradient-to-br ${action.color} bg-opacity-10 transition hover:shadow-lg`}
                >
                  <div className="text-3xl mb-2">{action.icon}</div>
                  <p className="font-semibold text-sm">{action.label}</p>
                  <p className="text-xs text-gray-400">{action.description}</p>
                </Link>
              ))}
            </div>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Compute Status */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">🖥️ Ressources Compute</h3>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-gray-400">GPU Tesla</span>
                    <span className="text-sm font-bold text-green-400">12/16</span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '75%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-gray-400">RAM GPU</span>
                    <span className="text-sm font-bold text-blue-400">324GB</span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: '27%' }}></div>
                  </div>
                </div>
              </div>
              <Link href="/compute" className="w-full mt-4 bg-[#6366F1] hover:opacity-90 px-3 py-2 rounded text-sm transition font-semibold inline-block text-center">
                Voir les ressources
              </Link>
            </Card>

            {/* Jobs Status */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">⚙️ Jobs en cours</h3>
              <div className="space-y-2 mb-4">
                <div className="p-2 bg-[#0B0F19] rounded border border-green-700">
                  <p className="text-sm">✓ Génération d'image</p>
                  <p className="text-xs text-gray-400">Complété</p>
                </div>
                <div className="p-2 bg-[#0B0F19] rounded border border-blue-700">
                  <p className="text-sm">⟳ Transcription audio</p>
                  <p className="text-xs text-gray-400">En cours (45%)</p>
                </div>
              </div>
              <Link href="/jobs" className="w-full bg-[#6366F1] hover:opacity-90 px-3 py-2 rounded text-sm transition font-semibold inline-block text-center">
                Voir l'historique
              </Link>
            </Card>

            {/* Billing */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">💳 Facturation</h3>
              <div className="mb-4">
                <p className="text-xs text-gray-400 mb-2">Utilisé ce mois</p>
                <p className="text-3xl font-bold text-[#6366F1] mb-2">$156.80</p>
                <div className="w-full bg-gray-800 rounded-full h-2">
                  <div className="bg-[#6366F1] h-2 rounded-full" style={{ width: '31%' }}></div>
                </div>
                <p className="text-xs text-gray-500 mt-2">31% de $500 utilisés</p>
              </div>
              <Link href="/billing" className="w-full bg-[#6366F1] hover:opacity-90 px-3 py-2 rounded text-sm transition font-semibold inline-block text-center">
                Voir la facturation
              </Link>
            </Card>
          </div>

          {/* Launch AI Job */}
          <Card className="p-6">
            <h3 className="mb-4 text-2xl font-bold">🚀 Lancer un job IA</h3>
            <div className="flex gap-3">
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Décrivez votre demande IA (ex: Générer une image d'un coucher de soleil)"
                className="flex-1 h-20 bg-[#0B0F19] border border-gray-700 rounded-lg p-3 outline-none focus:border-[#6366F1] resize-none"
              />
              <button
                onClick={runAI}
                className="bg-[#6366F1] px-6 py-3 rounded-lg hover:opacity-90 transition font-semibold h-fit"
              >
                ▶ Lancer
              </button>
            </div>
          </Card>

          {/* Recent Jobs */}
          <Card className="p-6">
            <h3 className="mb-4 text-2xl font-bold">📂 Jobs récents</h3>
            <div className="space-y-3">
              {jobs.map((job, index) => (
                <div key={index} className="p-4 bg-[#0B0F19] rounded-lg border border-gray-800 flex items-center justify-between hover:border-gray-700 transition">
                  <div>
                    <p className="font-semibold">{job.title}</p>
                    <p className="text-sm text-gray-400">{job.time}</p>
                  </div>
                  <span className={`text-xs px-3 py-1 rounded-full ${
                    job.status === 'Complété' ? 'bg-green-900 text-green-200' :
                    job.status === 'En cours' ? 'bg-blue-900 text-blue-200' :
                    'bg-gray-900 text-gray-200'
                  }`}>
                    {job.status}
                  </span>
                </div>
              ))}
            </div>
            <Link href="/jobs" className="w-full mt-4 text-center text-[#6366F1] hover:underline text-sm font-semibold">
              Voir tous les jobs →
            </Link>
          </Card>
        </div>
      );
    }

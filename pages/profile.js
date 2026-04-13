import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import Card from '../components/Card';

export default function Profile() {
  const [user, setUser] = useState({
    id: 'USR-2026-001',
    name: 'Jean Dupont',
    email: 'jean.dupont@example.com',
    avatar: '👨‍💼',
    bio: 'Développeur IA passionné | Innovateur | Entrepreneur',
    location: 'Paris, France',
    joinDate: '15 janvier 2025',
    plan: 'Pro',
    status: 'Actif',
    phoneVerified: true,
    ssoEnabled: true,
  });

  const [isEditing, setIsEditing] = useState(false);

  const stats = [
    { label: 'Jobs exécutés', value: '156', icon: '⚙️', change: '+12 ce mois' },
    { label: 'Modèles utilisés', value: '12', icon: '🤖', change: 'GPT-3, DALL-E, Whisper' },
    { label: 'Heures GPU', value: '482.5h', icon: '🖥️', change: '+45.2h ce mois' },
    { label: 'Coût mensuel', value: '$234.50', icon: '💰', change: '-8% vs mois dernier' },
  ];

  const activities = [
    { date: 'Aujourd\'hui 14:32', action: 'Job complété', details: 'GPT-3 - Génération de texte', icon: '✓' },
    { date: 'Hier 09:15', action: 'Modèle activé', details: 'DALL-E 3 - Génération d\'images', icon: '🎨' },
    { date: '11 avril 18:42', action: 'Job échoué', details: 'Whisper - Timeout', icon: '⚠️' },
    { date: '10 avril 11:20', action: 'Plan mis à jour', details: 'Starter → Pro', icon: '📈' },
  ];

  const favoriteModels = [
    { name: 'GPT-3', usage: 89, icon: '📝', description: 'Génération de texte' },
    { name: 'DALL-E', usage: 34, icon: '🎨', description: 'Génération d\'images' },
    { name: 'Whisper', usage: 22, icon: '🎤', description: 'Reconnaissance vocale' },
  ];

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <div className="p-6 max-w-5xl">
          {/* Profile Header */}
          <Card className="mb-6 p-8">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-6">
                <div className="text-7xl">{user.avatar}</div>
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-3xl font-bold">{user.name}</h1>
                    <span className="bg-green-900 text-green-200 text-xs px-3 py-1 rounded-full font-semibold">
                      {user.status}
                    </span>
                    <span className="bg-[#6366F1] text-white text-xs px-3 py-1 rounded-full font-semibold">
                      {user.plan}
                    </span>
                  </div>
                  <p className="text-gray-400 mb-1">{user.email}</p>
                  <p className="text-gray-500 text-sm flex items-center gap-2">
                    📍 {user.location} • ID: {user.id}
                  </p>
                  <p className="text-gray-400 text-sm mt-2">{user.bio}</p>
                </div>
              </div>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="bg-[#6366F1] px-6 py-3 rounded-md hover:opacity-90 transition font-semibold"
              >
                {isEditing ? '✕ Annuler' : '✎ Modifier'}
              </button>
            </div>

            {isEditing && (
              <div className="space-y-4 border-t border-gray-700 pt-6">
                <h3 className="text-lg font-semibold mb-4">Éditer le profil</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm mb-2">Nom complet</label>
                    <input
                      type="text"
                      value={user.name}
                      onChange={(e) => setUser({ ...user, name: e.target.value })}
                      className="w-full bg-[#0B0F19] border border-gray-700 rounded-md p-3 outline-none focus:border-[#6366F1]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-2">Email</label>
                    <input
                      type="email"
                      value={user.email}
                      onChange={(e) => setUser({ ...user, email: e.target.value })}
                      className="w-full bg-[#0B0F19] border border-gray-700 rounded-md p-3 outline-none focus:border-[#6366F1]"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm mb-2">Localisation</label>
                  <input
                    type="text"
                    value={user.location}
                    onChange={(e) => setUser({ ...user, location: e.target.value })}
                    className="w-full bg-[#0B0F19] border border-gray-700 rounded-md p-3 outline-none focus:border-[#6366F1]"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-2">Bio</label>
                  <textarea
                    value={user.bio}
                    onChange={(e) => setUser({ ...user, bio: e.target.value })}
                    className="w-full bg-[#0B0F19] border border-gray-700 rounded-md p-3 outline-none focus:border-[#6366F1] min-h-24"
                  />
                </div>
                <button
                  onClick={() => setIsEditing(false)}
                  className="bg-[#6366F1] px-6 py-2 rounded-md hover:opacity-90 transition"
                >
                  💾 Enregistrer
                </button>
              </div>
            )}
          </Card>

          {/* Statistics */}
          <h2 className="text-2xl font-bold mb-4">Vue d'ensemble</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            {stats.map((stat, idx) => (
              <Card key={idx} className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-gray-400 text-sm">{stat.label}</p>
                  <span className="text-2xl">{stat.icon}</span>
                </div>
                <p className="text-3xl font-bold mb-2">{stat.value}</p>
                <p className="text-xs text-gray-500">{stat.change}</p>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Favorite Models */}
            <Card className="p-6 md:col-span-2">
              <h3 className="text-lg font-semibold mb-4">Modèles favoris</h3>
              <div className="space-y-3">
                {favoriteModels.map((model, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-[#0B0F19] rounded-lg border border-gray-800">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{model.icon}</span>
                      <div>
                        <p className="font-semibold">{model.name}</p>
                        <p className="text-xs text-gray-400">{model.description}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-[#6366F1]">{model.usage}</p>
                      <p className="text-xs text-gray-400">utilisations</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Account Info */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Compte</h3>
              <div className="space-y-3">
                <div className="pb-3 border-b border-gray-700">
                  <p className="text-xs text-gray-400 uppercase mb-1">Inscrit</p>
                  <p className="text-sm">{user.joinDate}</p>
                </div>
                <div className="pb-3 border-b border-gray-700">
                  <p className="text-xs text-gray-400 uppercase mb-1">Forfait</p>
                  <p className="text-sm font-semibold text-[#6366F1]">{user.plan}</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2 bg-[#0B0F19] rounded">
                    <span className="text-sm">Téléphone vérifié</span>
                    <span className="text-lg">{user.phoneVerified ? '✓' : '✗'}</span>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-[#0B0F19] rounded">
                    <span className="text-sm">SSO activé</span>
                    <span className="text-lg">{user.ssoEnabled ? '✓' : '✗'}</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Activity */}
          <Card className="p-6 mt-6">
            <h3 className="text-lg font-semibold mb-4">Activité récente</h3>
            <div className="space-y-3">
              {activities.map((activity, idx) => (
                <div key={idx} className="flex items-start gap-4 p-3 bg-[#0B0F19] rounded-lg border border-gray-800">
                  <span className="text-2xl mt-1">{activity.icon}</span>
                  <div className="flex-1">
                    <p className="font-semibold">{activity.action}</p>
                    <p className="text-sm text-gray-400">{activity.details}</p>
                    <p className="text-xs text-gray-500 mt-1">{activity.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

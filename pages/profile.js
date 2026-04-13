import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import Card from '../components/Card';

export default function Profile() {
  const [user, setUser] = useState({
    name: 'Jean Dupont',
    email: 'jean@example.com',
    bio: 'Développeur IA passionné',
    avatar: '👤',
  });

  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <div className="p-6 max-w-3xl">
          <h2 className="text-2xl font-bold mb-6">Profil</h2>

          <Card>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="text-5xl">{user.avatar}</div>
                <div>
                  <h3 className="text-xl font-semibold">{user.name}</h3>
                  <p className="text-gray-400">{user.email}</p>
                </div>
              </div>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="bg-[#6366F1] px-4 py-2 rounded-md hover:opacity-90 transition"
              >
                {isEditing ? 'Annuler' : 'Modifier'}
              </button>
            </div>

            {isEditing && (
              <div className="space-y-4 border-t border-gray-700 pt-4">
                <div>
                  <label className="block text-sm mb-2">Nom</label>
                  <input
                    type="text"
                    value={user.name}
                    onChange={(e) => setUser({ ...user, name: e.target.value })}
                    className="w-full bg-[#0B0F19] border border-gray-700 rounded-md p-3 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-2">Bio</label>
                  <textarea
                    value={user.bio}
                    onChange={(e) => setUser({ ...user, bio: e.target.value })}
                    className="w-full bg-[#0B0F19] border border-gray-700 rounded-md p-3 outline-none"
                  />
                </div>
                <button
                  onClick={() => setIsEditing(false)}
                  className="bg-[#6366F1] px-6 py-2 rounded-md hover:opacity-90 transition"
                >
                  Enregistrer
                </button>
              </div>
            )}
          </Card>

          <Card className="mt-6">
            <h3 className="text-lg font-semibold mb-4">Statistiques</h3>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="text-gray-400 text-sm">Jobs exécutés</p>
                <p className="text-2xl font-bold">24</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Modèles utilisés</p>
                <p className="text-2xl font-bold">8</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Heures GPU</p>
                <p className="text-2xl font-bold">12.5h</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

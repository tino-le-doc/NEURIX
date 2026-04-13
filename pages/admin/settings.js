import { useState } from 'react';
import Card from '../../components/Card';

export default function AdminSettings() {
  const [settings, setSettings] = useState({
    siteName: 'Neurix',
    maintenanceMode: false,
    maxRequestsPerDay: 50000,
    maxJobDuration: 300,
    enableSignups: true,
    enableAPI: true,
  });

  const handleChange = (key, value) => {
    setSettings({ ...settings, [key]: value });
  };

  const handleSave = () => {
    console.log('Paramètres sauvegardés:', settings);
  };

  return (
    <div className="p-6">
          <h2 className="text-2xl font-bold mb-6">Paramètres globaux</h2>

          <Card className="p-6 mb-6">
            <h3 className="text-lg font-semibold mb-4">Plateforme</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm mb-2">Nom du site</label>
                <input
                  type="text"
                  value={settings.siteName}
                  onChange={(e) => handleChange('siteName', e.target.value)}
                  className="w-full bg-[#0B0F19] border border-gray-700 rounded-md p-3 outline-none focus:border-[#6366F1]"
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Mode maintenance</p>
                  <p className="text-sm text-gray-400">Désactiver la plateforme temporairement</p>
                </div>
                <button
                  onClick={() => handleChange('maintenanceMode', !settings.maintenanceMode)}
                  className={`relative w-12 h-6 rounded-full transition ${
                    settings.maintenanceMode ? 'bg-red-600' : 'bg-gray-700'
                  }`}
                >
                  <div
                    className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition ${
                      settings.maintenanceMode ? 'translate-x-6' : ''
                    }`}
                  ></div>
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Autorisé les inscriptions</p>
                  <p className="text-sm text-gray-400">Permettre les nouveaux utilisateurs de s'inscrire</p>
                </div>
                <button
                  onClick={() => handleChange('enableSignups', !settings.enableSignups)}
                  className={`relative w-12 h-6 rounded-full transition ${
                    settings.enableSignups ? 'bg-[#6366F1]' : 'bg-gray-700'
                  }`}
                >
                  <div
                    className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition ${
                      settings.enableSignups ? 'translate-x-6' : ''
                    }`}
                  ></div>
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">API disponible</p>
                  <p className="text-sm text-gray-400">Activer ou désactiver l'accès à l'API</p>
                </div>
                <button
                  onClick={() => handleChange('enableAPI', !settings.enableAPI)}
                  className={`relative w-12 h-6 rounded-full transition ${
                    settings.enableAPI ? 'bg-[#6366F1]' : 'bg-gray-700'
                  }`}
                >
                  <div
                    className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition ${
                      settings.enableAPI ? 'translate-x-6' : ''
                    }`}
                  ></div>
                </button>
              </div>
            </div>
          </Card>

          <Card className="p-6 mb-6">
            <h3 className="text-lg font-semibold mb-4">Limites</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm mb-2">Requêtes par jour (max)</label>
                <input
                  type="number"
                  value={settings.maxRequestsPerDay}
                  onChange={(e) => handleChange('maxRequestsPerDay', parseInt(e.target.value))}
                  className="w-full bg-[#0B0F19] border border-gray-700 rounded-md p-3 outline-none focus:border-[#6366F1]"
                />
              </div>

              <div>
                <label className="block text-sm mb-2">Durée max d'un job (secondes)</label>
                <input
                  type="number"
                  value={settings.maxJobDuration}
                  onChange={(e) => handleChange('maxJobDuration', parseInt(e.target.value))}
                  className="w-full bg-[#0B0F19] border border-gray-700 rounded-md p-3 outline-none focus:border-[#6366F1]"
                />
              </div>
            </div>
          </Card>

          <div className="flex gap-3">
            <button
              onClick={handleSave}
              className="bg-[#6366F1] px-6 py-2 rounded-md hover:opacity-90 transition"
            >
              Enregistrer les modifications
            </button>
            <button className="bg-gray-700 px-6 py-2 rounded-md hover:bg-gray-600 transition">
              Annuler
            </button>
          </div>
    </div>
  );
}

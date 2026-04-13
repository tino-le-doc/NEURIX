import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import Card from '../components/Card';

export default function Settings() {
  const [settings, setSettings] = useState({
    notifications: true,
    emailAlerts: true,
    darkMode: true,
    twoFactor: false,
  });

  const toggleSetting = (key) => {
    setSettings({ ...settings, [key]: !settings[key] });
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <div className="p-6 max-w-2xl">
          <h2 className="text-2xl font-bold mb-6">Paramètres</h2>

          <Card>
            <h3 className="text-lg font-semibold mb-4">Notifications</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Notifications push</p>
                  <p className="text-sm text-gray-400">Recevoir les notifications de statut</p>
                </div>
                <button
                  onClick={() => toggleSetting('notifications')}
                  className={`relative w-12 h-6 rounded-full transition ${
                    settings.notifications ? 'bg-[#6366F1]' : 'bg-gray-700'
                  }`}
                >
                  <div
                    className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition ${
                      settings.notifications ? 'translate-x-6' : ''
                    }`}
                  ></div>
                </button>
              </div>

              <div className="border-t border-gray-700 pt-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Alertes email</p>
                    <p className="text-sm text-gray-400">Recevoir les alertes par email</p>
                  </div>
                  <button
                    onClick={() => toggleSetting('emailAlerts')}
                    className={`relative w-12 h-6 rounded-full transition ${
                      settings.emailAlerts ? 'bg-[#6366F1]' : 'bg-gray-700'
                    }`}
                  >
                    <div
                      className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition ${
                        settings.emailAlerts ? 'translate-x-6' : ''
                      }`}
                    ></div>
                  </button>
                </div>
              </div>
            </div>
          </Card>

          <Card className="mt-6">
            <h3 className="text-lg font-semibold mb-4">Apparence</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Mode sombre</p>
                  <p className="text-sm text-gray-400">Toujours activé pour cette version</p>
                </div>
                <button
                  disabled
                  className={`relative w-12 h-6 rounded-full opacity-50 bg-[#6366F1]`}
                >
                  <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full translate-x-6`}></div>
                </button>
              </div>
            </div>
          </Card>

          <Card className="mt-6">
            <h3 className="text-lg font-semibold mb-4">Sécurité</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Authentification à deux facteurs</p>
                  <p className="text-sm text-gray-400">Sécuriser votre compte</p>
                </div>
                <button
                  onClick={() => toggleSetting('twoFactor')}
                  className={`relative w-12 h-6 rounded-full transition ${
                    settings.twoFactor ? 'bg-[#6366F1]' : 'bg-gray-700'
                  }`}
                >
                  <div
                    className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition ${
                      settings.twoFactor ? 'translate-x-6' : ''
                    }`}
                  ></div>
                </button>
              </div>

              <div className="border-t border-gray-700 pt-4">
                <button className="text-[#6366F1] hover:underline text-sm">
                  Changer le mot de passe
                </button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

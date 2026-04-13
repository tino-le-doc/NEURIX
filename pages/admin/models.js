import { useState } from 'react';
import Card from '../../components/Card';

export default function AdminModels() {
  const [models] = useState([
    { id: 1, name: 'GPT-3', version: '3.5', users: 432, usage: '24,521h', status: 'Actif', cost: '$0.002/req' },
    { id: 2, name: 'DALL-E', version: '3', users: 218, usage: '12,345h', status: 'Actif', cost: '$0.020/req' },
    { id: 3, name: 'Whisper', version: '1.0', users: 156, usage: '8,765h', status: 'Actif', cost: '$0.006/req' },
    { id: 4, name: 'Codex', version: '1.0', users: 89, usage: '4,321h', status: 'Beta', cost: '$0.008/req' },
  ]);

  return (
    <div className="p-6">
          <div className="mb-6 flex justify-between items-center">
            <h2 className="text-2xl font-bold">Gestion des modèles</h2>
            <button className="bg-[#6366F1] px-4 py-2 rounded-md hover:opacity-90 transition">
              + Nouveau modèle
            </button>
          </div>

          <Card className="p-6">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-400">Modèle</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-400">Version</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-400">Utilisateurs</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-400">Utilisation</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-400">Prix</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-400">Statut</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-400">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {models.map((model) => (
                    <tr key={model.id} className="border-b border-gray-800 hover:bg-[#0B0F19] transition">
                      <td className="py-3 px-4 text-sm font-semibold">{model.name}</td>
                      <td className="py-3 px-4 text-sm text-gray-400">{model.version}</td>
                      <td className="py-3 px-4 text-sm">{model.users}</td>
                      <td className="py-3 px-4 text-sm text-gray-400">{model.usage}</td>
                      <td className="py-3 px-4 text-sm">{model.cost}</td>
                      <td className="py-3 px-4 text-sm">
                        <span className={`px-2 py-1 rounded text-xs ${
                          model.status === 'Actif'
                            ? 'bg-green-900 text-green-200'
                            : 'bg-yellow-900 text-yellow-200'
                        }`}>
                          {model.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-sm">
                        <div className="flex gap-2">
                          <button className="text-[#6366F1] hover:underline text-xs">Éditer</button>
                          <button className="text-red-400 hover:underline text-xs">Désactiver</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
    </div>
  );
}

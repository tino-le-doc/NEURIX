import { useState } from 'react';
import Card from '../../components/Card';

export default function AdminProjects() {
  const [projects, setProjects] = useState([
    {
      id: 1,
      name: 'Chatbot IA',
      owner: 'Jean Dupont',
      status: 'Actif',
      jobs: 234,
      revenue: '$1,234.50',
      created: '2 janvier 2026',
    },
    {
      id: 2,
      name: 'Générateur d\'images',
      owner: 'Marie Martin',
      status: 'Actif',
      jobs: 156,
      revenue: '$856.20',
      created: '15 décembre 2025',
    },
    {
      id: 3,
      name: 'Transcription audio',
      owner: 'Pierre Durand',
      status: 'En pause',
      jobs: 45,
      revenue: '$234.80',
      created: '10 novembre 2025',
    },
    {
      id: 4,
      name: 'Assistant de code',
      owner: 'Sophie Bernard',
      status: 'En développement',
      jobs: 23,
      revenue: '$123.45',
      created: '5 novembre 2025',
    },
  ]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Actif':
        return 'bg-green-900 text-green-200';
      case 'En pause':
        return 'bg-yellow-900 text-yellow-200';
      case 'En développement':
        return 'bg-blue-900 text-blue-200';
      default:
        return 'bg-gray-900 text-gray-200';
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-3xl font-bold mb-2">Gestion des Projets</h2>
        <p className="text-gray-400">Supervisez tous les projets IA en cours</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card className="p-6">
          <p className="text-gray-400 text-sm mb-2">Total Projets</p>
          <p className="text-3xl font-bold">{projects.length}</p>
          <p className="text-xs text-gray-500 mt-2">+2 ce mois</p>
        </Card>

        <Card className="p-6">
          <p className="text-gray-400 text-sm mb-2">Actifs</p>
          <p className="text-3xl font-bold text-green-400">{projects.filter(p => p.status === 'Actif').length}</p>
          <p className="text-xs text-gray-500 mt-2">En production</p>
        </Card>

        <Card className="p-6">
          <p className="text-gray-400 text-sm mb-2">Jobs Totaux</p>
          <p className="text-3xl font-bold">{projects.reduce((sum, p) => sum + p.jobs, 0)}</p>
          <p className="text-xs text-gray-500 mt-2">Tous les projets</p>
        </Card>

        <Card className="p-6">
          <p className="text-gray-400 text-sm mb-2">Revenus Combinés</p>
          <p className="text-3xl font-bold text-blue-400">$3.4k</p>
          <p className="text-xs text-gray-500 mt-2">Estimé</p>
        </Card>
      </div>

      {/* Projects Table */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">📋 Tous les projets</h3>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-400">Projet</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-400">Propriétaire</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-400">Statut</th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-gray-400">Jobs</th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-gray-400">Revenus</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-400">Créé</th>
                <th className="text-center py-3 px-4 text-sm font-semibold text-gray-400">Actions</th>
              </tr>
            </thead>

            <tbody>
              {projects.map((project) => (
                <tr key={project.id} className="border-b border-gray-800 hover:bg-gray-800/50 transition">
                  <td className="py-4 px-4">
                    <span className="font-semibold">{project.name}</span>
                  </td>

                  <td className="py-4 px-4 text-sm text-gray-400">
                    {project.owner}
                  </td>

                  <td className="py-4 px-4">
                    <span className={`text-xs px-3 py-1 rounded-full font-semibold ${getStatusColor(project.status)}`}>
                      {project.status}
                    </span>
                  </td>

                  <td className="py-4 px-4 text-right text-sm">
                    {project.jobs.toLocaleString()}
                  </td>

                  <td className="py-4 px-4 text-right text-sm font-semibold">
                    {project.revenue}
                  </td>

                  <td className="py-4 px-4 text-sm text-gray-500">
                    {project.created}
                  </td>

                  <td className="py-4 px-4 text-center">
                    <div className="flex gap-2 justify-center">
                      <button className="text-xs bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded transition">
                        Voir
                      </button>
                      <button className="text-xs bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded transition">
                        ✎
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Top Projects by Revenue */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">💰 Top Revenus</h3>
          <div className="space-y-3">
            {[...projects].sort((a, b) => 
              parseFloat(b.revenue) - parseFloat(a.revenue)
            ).slice(0, 3).map((project) => (
              <div key={project.id} className="flex items-center justify-between p-2 hover:bg-gray-800/50 rounded transition">
                <div>
                  <p className="font-semibold text-sm">{project.name}</p>
                  <p className="text-xs text-gray-500">{project.owner}</p>
                </div>
                <span className="font-bold text-[#6366F1]">{project.revenue}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">⚙️ Plus Actifs</h3>
          <div className="space-y-3">
            {[...projects].sort((a, b) => b.jobs - a.jobs).slice(0, 3).map((project) => (
              <div key={project.id} className="flex items-center justify-between p-2 hover:bg-gray-800/50 rounded transition">
                <div>
                  <p className="font-semibold text-sm">{project.name}</p>
                  <p className="text-xs text-gray-500">{project.jobs} jobs</p>
                </div>
                <span className="font-bold text-green-400">{project.jobs}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

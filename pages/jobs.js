import { useState } from 'react';
import Card from '../components/Card';

export default function Jobs() {
  const [jobs] = useState([
    {
      id: 1,
      title: 'Génération d\'article de blog',
      model: 'GPT-3',
      status: 'Complété',
      date: '13 avril 2026',
      duration: '2.3s',
    },
    {
      id: 2,
      title: 'Analyse de sentiment',
      model: 'GPT-3',
      status: 'En cours',
      date: '13 avril 2026',
      duration: '--',
    },
    {
      id: 3,
      title: 'Génération d\'image',
      model: 'DALL-E',
      status: 'Complété',
      date: '12 avril 2026',
      duration: '5.1s',
    },
    {
      id: 4,
      title: 'Transcription audio',
      model: 'Whisper',
      status: 'Échoué',
      date: '12 avril 2026',
      duration: '1.2s',
    },
  ]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Complété':
        return 'bg-green-900 text-green-200';
      case 'En cours':
        return 'bg-blue-900 text-blue-200';
      case 'Échoué':
        return 'bg-red-900 text-red-200';
      default:
        return 'bg-gray-900 text-gray-200';
    }
  };

  return (
    <div className="p-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-2">Historique des jobs</h2>
            <p className="text-gray-400">Consultez tous vos jobs exécutés</p>
          </div>

          <Card>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-400">Titre</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-400">Modèle</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-400">Statut</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-400">Date</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-400">Durée</th>
                  </tr>
                </thead>
                <tbody>
                  {jobs.map((job) => (
                    <tr key={job.id} className="border-b border-gray-800 hover:bg-[#0B0F19] transition">
                      <td className="py-3 px-4 text-sm">{job.title}</td>
                      <td className="py-3 px-4 text-sm text-gray-400">{job.model}</td>
                      <td className="py-3 px-4 text-sm">
                        <span className={`px-2 py-1 rounded text-xs ${getStatusColor(job.status)}`}>
                          {job.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-400">{job.date}</td>
                      <td className="py-3 px-4 text-sm text-gray-400">{job.duration}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
    </div>
  );
}

import AdminSidebar from '../../components/AdminSidebar';
import AdminHeader from '../../components/AdminHeader';
import Card from '../../components/Card';

export default function AdminJobs() {
  const jobs = [
    { id: 1, user: 'Jean Dupont', model: 'GPT-3', status: 'Complété', duration: '2.3s', date: '13 avril', cost: '$0.004' },
    { id: 2, user: 'Marie Martin', model: 'DALL-E', status: 'En cours', duration: '--', date: '13 avril', cost: '--' },
    { id: 3, user: 'Pierre Durand', model: 'Whisper', status: 'Complété', duration: '5.1s', date: '12 avril', cost: '$0.031' },
    { id: 4, user: 'Sophie Bernard', model: 'GPT-3', status: 'Échoué', duration: '1.2s', date: '12 avril', cost: '$0.002' },
    { id: 5, user: 'Luc Moreau', model: 'Codex', status: 'Complété', duration: '3.8s', date: '12 avril', cost: '$0.028' },
  ];

  return (
    <div className="flex">
      <div className="w-64">
        <AdminSidebar />
      </div>
      <div className="flex-1 ml-64">
        <AdminHeader />
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-6">Gestion des jobs</h2>

          <Card className="p-6">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-400">ID</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-400">Utilisateur</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-400">Modèle</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-400">Statut</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-400">Durée</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-400">Coût</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-400">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {jobs.map((job) => (
                    <tr key={job.id} className="border-b border-gray-800 hover:bg-[#0B0F19] transition">
                      <td className="py-3 px-4 text-sm text-gray-400">#{job.id}</td>
                      <td className="py-3 px-4 text-sm">{job.user}</td>
                      <td className="py-3 px-4 text-sm text-gray-400">{job.model}</td>
                      <td className="py-3 px-4 text-sm">
                        <span className={`px-2 py-1 rounded text-xs ${
                          job.status === 'Complété'
                            ? 'bg-green-900 text-green-200'
                            : job.status === 'En cours'
                            ? 'bg-blue-900 text-blue-200'
                            : 'bg-red-900 text-red-200'
                        }`}>
                          {job.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-400">{job.duration}</td>
                      <td className="py-3 px-4 text-sm">{job.cost}</td>
                      <td className="py-3 px-4 text-sm text-gray-400">{job.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

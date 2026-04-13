import AdminSidebar from '../components/AdminSidebar';
import AdminHeader from '../components/AdminHeader';
import Card from '../components/Card';

export default function AdminDashboard() {
  const stats = [
    { label: 'Utilisateurs actifs', value: '1,234', change: '+12%', icon: '👥' },
    { label: 'Jobs exécutés', value: '5,432', change: '+23%', icon: '⚙️' },
    { label: 'Revenus (mois)', value: '$12,345', change: '+8%', icon: '💰' },
    { label: 'GPU utilisé', value: '2,456h', change: '+15%', icon: '🖥️' },
  ];

  const recentJobs = [
    { id: 1, user: 'Jean Dupont', model: 'GPT-3', status: 'Complété', time: '2 min' },
    { id: 2, user: 'Marie Martin', model: 'DALL-E', status: 'En cours', time: '5 min' },
    { id: 3, user: 'Pierre Durand', model: 'Whisper', status: 'Complété', time: '10 min' },
  ];

  return (
    <div className="flex">
      <div className="w-64">
        <AdminSidebar />
      </div>
      <div className="flex-1 ml-64">
        <AdminHeader />
        <div className="p-6 bg-gradient-to-b from-[#0B0F19] to-[#1a1f2e]">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            {stats.map((stat, idx) => (
              <Card key={idx} className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">{stat.label}</p>
                    <p className="text-2xl font-bold mt-2">{stat.value}</p>
                    <p className="text-green-400 text-xs mt-1">{stat.change}</p>
                  </div>
                  <div className="text-4xl opacity-20">{stat.icon}</div>
                </div>
              </Card>
            ))}
          </div>

          {/* Recent Activity */}
          <Card className="p-6 mb-6">
            <h3 className="text-lg font-semibold mb-4">Activité récente</h3>
            <div className="space-y-3">
              {recentJobs.map((job) => (
                <div key={job.id} className="flex items-center justify-between p-3 bg-[#0B0F19] rounded-md border border-gray-800">
                  <div>
                    <p className="font-medium">{job.user}</p>
                    <p className="text-sm text-gray-400">{job.model}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className={`text-xs px-2 py-1 rounded ${
                      job.status === 'Complété' ? 'bg-green-900 text-green-200' : 'bg-blue-900 text-blue-200'
                    }`}>
                      {job.status}
                    </span>
                    <span className="text-gray-400 text-sm">{job.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* System Status */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">État du système</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Serveurs actifs</span>
                  <span className="text-green-400 font-semibold">✓ 12/12</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">GPU disponibles</span>
                  <span className="text-green-400 font-semibold">✓ 48/64</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Uptime</span>
                  <span className="text-green-400 font-semibold">✓ 99.9%</span>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Notifications</h3>
              <div className="space-y-3">
                <div className="p-3 bg-blue-900 bg-opacity-20 border border-blue-700 rounded-md">
                  <p className="text-sm text-blue-200">Nouvelle mise à jour disponible</p>
                </div>
                <div className="p-3 bg-yellow-900 bg-opacity-20 border border-yellow-700 rounded-md">
                  <p className="text-sm text-yellow-200">Maintenance prévue jeudi 18h</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

import Card from '../components/Card';

export default function Compute() {
  const gpuStatus = [
    { type: 'GPU Tesla A100', available: 12, total: 16, usage: '75%', status: 'Actif' },
    { type: 'GPU RTX 4090', available: 8, total: 8, usage: '0%', status: 'Disponible' },
    { type: 'GPU RTX 3090', available: 3, total: 5, usage: '40%', status: 'Chargé' },
  ];

  const runningJobs = [
    { id: 1, name: 'Génération d\'images - Batch 1', model: 'DALL-E', gpu: 'Tesla A100', progress: 65, eta: '2 min' },
    { id: 2, name: 'Transcription audio', model: 'Whisper', gpu: 'Tesla A100', progress: 42, eta: '5 min' },
    { id: 3, name: 'Analyse de texte', model: 'GPT-3', gpu: 'RTX 3090', progress: 88, eta: '1 min' },
  ];

  return (
    <div className="p-6">
          <h2 className="text-3xl font-bold mb-2">Ressources Compute</h2>
          <p className="text-gray-400 mb-6">Gérez vos ressources GPU et la puissance de calcul</p>

          {/* GPU Status Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {gpuStatus.map((gpu, idx) => (
              <Card key={idx} className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-semibold">{gpu.type}</h3>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    gpu.status === 'Actif' ? 'bg-green-900 text-green-200' :
                    gpu.status === 'Disponible' ? 'bg-blue-900 text-blue-200' :
                    'bg-yellow-900 text-yellow-200'
                  }`}>
                    {gpu.status}
                  </span>
                </div>
                
                {/* Progress Bar */}
                <div className="mb-3">
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-gray-400">Utilisation</span>
                    <span className="text-sm font-bold text-[#6366F1]">{gpu.usage}</span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-[#6366F1] to-[#8b5cf6] h-2 rounded-full"
                      style={{ width: gpu.usage }}
                    ></div>
                  </div>
                </div>

                <div className="text-sm text-gray-400">
                  {gpu.available} / {gpu.total} GPU disponibles
                </div>
              </Card>
            ))}
          </div>

          {/* Running Jobs */}
          <Card className="p-6 mb-6">
            <h3 className="text-2xl font-bold mb-4">⚙️ Jobs en cours</h3>
            <div className="space-y-4">
              {runningJobs.map((job) => (
                <div key={job.id} className="p-4 bg-[#0B0F19] rounded-lg border border-gray-800">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-semibold">{job.name}</p>
                      <p className="text-sm text-gray-400">{job.model} • {job.gpu}</p>
                    </div>
                    <span className="text-sm text-gray-400">ETA: {job.eta}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <div className="w-full bg-gray-800 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full"
                        style={{ width: `${job.progress}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-bold ml-4 text-green-400 min-w-fit">{job.progress}%</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Compute Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="p-6">
              <p className="text-gray-400 text-sm mb-2">Cœurs actifs</p>
              <p className="text-4xl font-bold mb-2">256</p>
              <p className="text-xs text-gray-500">+12 vs hier</p>
            </Card>
            <Card className="p-6">
              <p className="text-gray-400 text-sm mb-2">RAM GPU</p>
              <p className="text-4xl font-bold mb-2">1.2TB</p>
              <p className="text-xs text-gray-500">324GB utilisés</p>
            </Card>
            <Card className="p-6">
              <p className="text-gray-400 text-sm mb-2">Bande passante</p>
              <p className="text-4xl font-bold mb-2">850Gbps</p>
              <p className="text-xs text-gray-500">Réseau optimal</p>
            </Card>
          </div>
    </div>
  );
}

import Card from '../../components/Card';

export default function AdminAnalytics() {
  return (
    <div className="p-6">
          <h2 className="text-2xl font-bold mb-6">Analytics</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Revenus (30 jours)</h3>
              <div className="h-64 bg-[#0B0F19] rounded-md border border-gray-700 flex items-center justify-center">
                <p className="text-gray-400">Graphique des revenus</p>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Jobs exécutés (30 jours)</h3>
              <div className="h-64 bg-[#0B0F19] rounded-md border border-gray-700 flex items-center justify-center">
                <p className="text-gray-400">Graphique des jobs</p>
              </div>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Top modèles</h3>
              <div className="space-y-3">
                {[
                  { name: 'GPT-3', requests: 12543, percentage: 45 },
                  { name: 'DALL-E', requests: 6234, percentage: 22 },
                  { name: 'Whisper', requests: 5123, percentage: 18 },
                  { name: 'Codex', requests: 4567, percentage: 15 },
                ].map((item) => (
                  <div key={item.name}>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">{item.name}</span>
                      <span className="text-sm text-gray-400">{item.requests}</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-[#6366F1] h-2 rounded-full"
                        style={{ width: `${item.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Distribution géographique</h3>
              <div className="space-y-3">
                {[
                  { country: 'France', users: 342, percentage: 35 },
                  { country: 'Belgique', users: 198, percentage: 20 },
                  { country: 'Suisse', users: 156, percentage: 16 },
                  { country: 'Autres', users: 304, percentage: 29 },
                ].map((item) => (
                  <div key={item.country}>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">{item.country}</span>
                      <span className="text-sm text-gray-400">{item.users}</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-purple-600 h-2 rounded-full"
                        style={{ width: `${item.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
    </div>
  );
}

import Card from '../components/Card';

export default function Models() {
  const models = [
    {
      id: 1,
      name: 'GPT-3',
      description: 'Modèle de langage puissant pour la génération de texte',
      tags: ['NLP', 'Génération'],
      status: 'Disponible',
    },
    {
      id: 2,
      name: 'DALL-E',
      description: 'Génération d\'images à partir de descriptions textuelles',
      tags: ['Vision', 'Génération'],
      status: 'Disponible',
    },
    {
      id: 3,
      name: 'Whisper',
      description: 'Reconnaissance vocale multilingue',
      tags: ['Audio', 'Speech'],
      status: 'Disponible',
    },
    {
      id: 4,
      name: 'Codex',
      description: 'Modèle spécialisé dans la génération de code',
      tags: ['Code', 'Développement'],
      status: 'Beta',
    },
  ];

  return (
    <div className="p-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-2">Modèles disponibles</h2>
            <p className="text-gray-400">Sélectionnez un modèle pour commencer</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {models.map((model) => (
              <Card key={model.id}>
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-lg font-semibold">{model.name}</h3>
                  <span className={`text-xs px-2 py-1 rounded ${
                    model.status === 'Disponible'
                      ? 'bg-green-900 text-green-200'
                      : 'bg-yellow-900 text-yellow-200'
                  }`}>
                    {model.status}
                  </span>
                </div>
                <p className="text-gray-400 text-sm mb-3">{model.description}</p>
                <div className="flex gap-2 mb-3 flex-wrap">
                  {model.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs bg-[#0B0F19] border border-gray-700 px-2 py-1 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <button className="w-full bg-[#6366F1] py-2 rounded-md text-sm hover:opacity-90 transition">
                  Utiliser
                </button>
              </Card>
            ))}
          </div>
    </div>
  );
}

import { useState } from 'react';
import Card from '../components/Card';

export default function Docs() {
  const [selectedDoc, setSelectedDoc] = useState('getting-started');

  const docs = {
    'getting-started': {
      title: 'Démarrage rapide',
      content: 'Bienvenue dans la documentation neu-rix. Commencez par créer un compte et explorer les modèles disponibles.',
    },
    'api': {
      title: 'API Reference',
      content: 'Consultez la documentation complète des endpoints API pour intégrer neu-rix dans vos applications.',
    },
    'examples': {
      title: 'Exemples',
      content: 'Découvrez des exemples de code pour différents cas d\'utilisation et modèles.',
    },
    'faq': {
      title: 'FAQ',
      content: 'Réponses aux questions fréquemment posées sur neu-rix.',
    },
  };

  const docList = Object.entries(docs).map(([key, value]) => ({
    id: key,
    ...value,
  }));

  return (
    <div className="p-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold">Documentation</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              {docList.map((doc) => (
                <button
                  key={doc.id}
                  onClick={() => setSelectedDoc(doc.id)}
                  className={`w-full text-left px-4 py-3 rounded-md transition ${
                    selectedDoc === doc.id
                      ? 'bg-[#6366F1] text-white'
                      : 'bg-[#0B0F19] border border-gray-700 hover:border-gray-600'
                  }`}
                >
                  {doc.title}
                </button>
              ))}
            </div>

            <div className="md:col-span-3">
              <Card>
                <h3 className="text-2xl font-bold mb-4">
                  {docs[selectedDoc].title}
                </h3>
                <p className="text-gray-400 mb-6">
                  {docs[selectedDoc].content}
                </p>

                <div className="space-y-4">
                  <h4 className="font-semibold">Points clés :</h4>
                  <ul className="space-y-2 text-gray-400">
                    <li className="flex gap-2">
                      <span className="text-[#6366F1]">•</span>
                      <span>Point d'information important</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-[#6366F1]">•</span>
                      <span>Autre point pertinent</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-[#6366F1]">•</span>
                      <span>Information supplémentaire</span>
                    </li>
                  </ul>
                </div>
              </Card>
            </div>
          </div>
    </div>
  );
}

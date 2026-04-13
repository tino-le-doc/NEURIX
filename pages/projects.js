import { useState } from 'react';
import Card from '../components/Card';

export default function Projects() {
  const [showModal, setShowModal] = useState(false);
  const [projects, setProjects] = useState([
    {
      id: 1,
      name: 'Chatbot IA',
      description: 'Assistant conversationnel basé sur GPT-3',
      status: 'Actif',
      model: 'GPT-3',
      created: '2 janvier 2026',
      jobs: 234,
      icon: '💬',
    },
    {
      id: 2,
      name: 'Générateur d\'images',
      description: 'Plateforme de génération d\'images avec DALL-E',
      status: 'Actif',
      model: 'DALL-E',
      created: '15 décembre 2025',
      jobs: 156,
      icon: '🎨',
    },
    {
      id: 3,
      name: 'Transcription audio',
      description: 'Service de transcription avec Whisper',
      status: 'En développement',
      model: 'Whisper',
      created: '5 décembre 2025',
      jobs: 45,
      icon: '🎤',
    },
    {
      id: 4,
      name: 'Assistant de code',
      description: 'Génération et complétion de code',
      status: 'En pause',
      model: 'Codex',
      created: '20 novembre 2025',
      jobs: 23,
      icon: '💻',
    },
  ]);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    model: 'GPT-3',
    icon: '🤖',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCreateProject = (e) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      alert('Le nom du projet est requis');
      return;
    }

    const newProject = {
      id: projects.length + 1,
      name: formData.name,
      description: formData.description,
      status: 'Nouveau',
      model: formData.model,
      created: new Date().toLocaleDateString('fr-FR', { 
        day: 'numeric', 
        month: 'long', 
        year: 'numeric' 
      }),
      jobs: 0,
      icon: formData.icon,
    };

    setProjects([newProject, ...projects]);
    setFormData({ name: '', description: '', model: 'GPT-3', icon: '🤖' });
    setShowModal(false);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Actif':
        return 'bg-green-900 text-green-200';
      case 'En développement':
        return 'bg-blue-900 text-blue-200';
      case 'En pause':
        return 'bg-yellow-900 text-yellow-200';
      case 'Nouveau':
        return 'bg-purple-900 text-purple-200';
      default:
        return 'bg-gray-900 text-gray-200';
    }
  };

  return (
    <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-3xl font-bold mb-2">Mes Projets</h2>
              <p className="text-gray-400">Gérez vos projets IA</p>
            </div>
            <button 
              onClick={() => setShowModal(true)}
              className="bg-[#6366F1] px-6 py-3 rounded-md hover:opacity-90 transition font-semibold flex items-center gap-2">
              ➕ Nouveau projet
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((project) => (
              <Card key={project.id} className="p-6 hover:border-[#6366F1] transition cursor-pointer">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-4xl">{project.icon}</span>
                    <div>
                      <h3 className="text-lg font-semibold">{project.name}</h3>
                      <p className="text-sm text-gray-400">{project.description}</p>
                    </div>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(project.status)}`}>
                    {project.status}
                  </span>
                </div>

                <div className="space-y-2 border-t border-gray-700 pt-4 mt-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Modèle</span>
                    <span className="font-semibold">{project.model}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Jobs exécutés</span>
                    <span className="font-semibold">{project.jobs}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Créé le</span>
                    <span className="font-semibold">{project.created}</span>
                  </div>
                </div>

                <div className="flex gap-2 mt-4 pt-4 border-t border-gray-700">
                  <button className="flex-1 bg-[#6366F1] hover:opacity-90 px-3 py-2 rounded text-sm transition">
                    📊 Détails
                  </button>
                  <button className="flex-1 bg-gray-800 hover:bg-gray-700 px-3 py-2 rounded text-sm transition">
                    ✎ Éditer
                  </button>
                </div>
              </Card>
            ))}
          </div>

      {/* Modal pour créer un nouveau projet */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md p-6">
            <h2 className="text-2xl font-bold mb-4">➕ Créer un nouveau projet</h2>

            <form onSubmit={handleCreateProject} className="space-y-4">
              {/* Nom */}
              <div>
                <label className="block text-sm font-medium mb-2">Nom du projet</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Ex: Mon super projet IA"
                  className="w-full bg-[#0F172A] border border-gray-700 rounded-lg p-3 outline-none focus:border-[#6366F1] transition"
                  autoFocus
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Décrivez votre projet..."
                  className="w-full bg-[#0F172A] border border-gray-700 rounded-lg p-3 outline-none focus:border-[#6366F1] transition resize-none h-20"
                />
              </div>

              {/* Modèle */}
              <div>
                <label className="block text-sm font-medium mb-2">Modèle IA</label>
                <select
                  name="model"
                  value={formData.model}
                  onChange={handleInputChange}
                  className="w-full bg-[#0F172A] border border-gray-700 rounded-lg p-3 outline-none focus:border-[#6366F1] transition"
                >
                  <option>GPT-3</option>
                  <option>DALL-E</option>
                  <option>Whisper</option>
                  <option>Codex</option>
                  <option>BERT</option>
                </select>
              </div>

              {/* Icône */}
              <div>
                <label className="block text-sm font-medium mb-2">Emoji du projet</label>
                <input
                  type="text"
                  name="icon"
                  value={formData.icon}
                  onChange={handleInputChange}
                  placeholder="🤖"
                  maxLength="2"
                  className="w-full bg-[#0F172A] border border-gray-700 rounded-lg p-3 outline-none focus:border-[#6366F1] transition text-2xl"
                />
              </div>

              {/* Boutons */}
              <div className="flex gap-3 pt-4 border-t border-gray-700">
                <button
                  type="submit"
                  className="flex-1 bg-[#6366F1] hover:opacity-90 px-4 py-2 rounded-lg font-semibold transition"
                >
                  ✓ Créer
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg font-semibold transition"
                >
                  ✕ Annuler
                </button>
              </div>
            </form>
          </Card>
        </div>
      )}
    </div>
  );
}

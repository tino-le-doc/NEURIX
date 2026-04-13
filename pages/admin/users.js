import { useState } from 'react';
import AdminSidebar from '../../components/AdminSidebar';
import AdminHeader from '../../components/AdminHeader';
import Card from '../../components/Card';

export default function AdminUsers() {
  const [users] = useState([
    { id: 1, name: 'Jean Dupont', email: 'jean@example.com', plan: 'Pro', jobs: 24, status: 'Actif' },
    { id: 2, name: 'Marie Martin', email: 'marie@example.com', plan: 'Starter', jobs: 8, status: 'Actif' },
    { id: 3, name: 'Pierre Durand', email: 'pierre@example.com', plan: 'Enterprise', jobs: 156, status: 'Actif' },
    { id: 4, name: 'Sophie Bernard', email: 'sophie@example.com', plan: 'Pro', jobs: 42, status: 'Inactif' },
    { id: 5, name: 'Luc Moreau', email: 'luc@example.com', plan: 'Starter', jobs: 5, status: 'Actif' },
  ]);

  return (
    <div className="flex">
      <div className="w-64">
        <AdminSidebar />
      </div>
      <div className="flex-1 ml-64">
        <AdminHeader />
        <div className="p-6">
          <div className="mb-6 flex justify-between items-center">
            <h2 className="text-2xl font-bold">Gestion des utilisateurs</h2>
            <button className="bg-[#6366F1] px-4 py-2 rounded-md hover:opacity-90 transition">
              + Nouvel utilisateur
            </button>
          </div>

          <Card className="p-6">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-400">Nom</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-400">Email</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-400">Plan</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-400">Jobs</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-400">Statut</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-400">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id} className="border-b border-gray-800 hover:bg-[#0B0F19] transition">
                      <td className="py-3 px-4 text-sm">{user.name}</td>
                      <td className="py-3 px-4 text-sm text-gray-400">{user.email}</td>
                      <td className="py-3 px-4 text-sm">
                        <span className="bg-[#6366F1] bg-opacity-20 px-2 py-1 rounded text-xs">{user.plan}</span>
                      </td>
                      <td className="py-3 px-4 text-sm">{user.jobs}</td>
                      <td className="py-3 px-4 text-sm">
                        <span className={`px-2 py-1 rounded text-xs ${
                          user.status === 'Actif'
                            ? 'bg-green-900 text-green-200'
                            : 'bg-gray-900 text-gray-200'
                        }`}>
                          {user.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-sm">
                        <div className="flex gap-2">
                          <button className="text-[#6366F1] hover:underline text-xs">Éditer</button>
                          <button className="text-red-400 hover:underline text-xs">Supprimer</button>
                        </div>
                      </td>
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

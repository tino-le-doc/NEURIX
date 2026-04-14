import { useState } from 'react';
import { useRouter } from 'next/router';
import Card from '../components/Card';

export default function Billing() {
  const router = useRouter();
  const [selectedMonth, setSelectedMonth] = useState('avril');
  const [upgrading, setUpgrading] = useState(null);
  const [upgradeError, setUpgradeError] = useState('');

  const checkoutBanner = router.query.status === 'success'
    ? { type: 'success', text: '✅ Merci ! Votre abonnement a été activé.' }
    : router.query.status === 'cancelled'
    ? { type: 'warning', text: 'Checkout annulé. Aucun paiement effectué.' }
    : null;

  async function startCheckout(plan) {
    setUpgrading(plan);
    setUpgradeError('');
    try {
      const res = await fetch('/api/billing/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan }),
      });
      const payload = await res.json();
      if (!res.ok) {
        setUpgradeError(payload?.error || 'Erreur lors du checkout');
        return;
      }
      window.location.href = payload.url;
    } catch (err) {
      setUpgradeError('Erreur réseau');
    } finally {
      setUpgrading(null);
    }
  }

  async function openPortal() {
    setUpgrading('portal');
    try {
      const res = await fetch('/api/billing/portal', { method: 'POST' });
      const payload = await res.json();
      if (!res.ok) {
        setUpgradeError(payload?.error || 'Portail indisponible');
        return;
      }
      window.location.href = payload.url;
    } catch (err) {
      setUpgradeError('Erreur réseau');
    } finally {
      setUpgrading(null);
    }
  }

  const billingHistory = [
    {
      date: '1er avril 2026',
      description: 'Facturation - Avril 2026',
      amount: '$234.50',
      status: 'Payée',
      invoice: 'INV-2026-04',
    },
    {
      date: '1er mars 2026',
      description: 'Facturation - Mars 2026',
      amount: '$218.30',
      status: 'Payée',
      invoice: 'INV-2026-03',
    },
    {
      date: '1er février 2026',
      description: 'Facturation - Février 2026',
      amount: '$256.80',
      status: 'Payée',
      invoice: 'INV-2026-02',
    },
  ];

  const usageBreakdown = [
    { service: 'GPT-3', usage: '12,543 requêtes', cost: '$125.43', percentage: 53 },
    { service: 'DALL-E', usage: '456 générations', cost: '$54.72', percentage: 23 },
    { service: 'Whisper', usage: '234 heures', cost: '$35.10', percentage: 15 },
    { service: 'Frais de base', usage: 'Forfait Pro', cost: '$19.25', percentage: 9 },
  ];

  return (
    <div className="p-6">
          <h2 className="text-3xl font-bold mb-2">Facturation</h2>
          <p className="text-gray-400 mb-6">Gérez vos factures et votre abonnement</p>

          {checkoutBanner && (
            <div
              className={`mb-4 p-3 rounded-lg border ${
                checkoutBanner.type === 'success'
                  ? 'bg-green-900/20 border-green-700 text-green-300'
                  : 'bg-yellow-900/20 border-yellow-700 text-yellow-200'
              }`}
            >
              {checkoutBanner.text}
            </div>
          )}

          {upgradeError && (
            <div className="mb-4 p-3 rounded-lg border bg-red-900/20 border-red-700 text-red-300">
              {upgradeError}
            </div>
          )}

          {/* Plans */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <Card className="p-6 border border-[#6366F1]/30">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xl font-bold">Pro</h3>
                <span className="text-2xl font-bold text-[#6366F1]">€49<span className="text-sm text-gray-400">/mois</span></span>
              </div>
              <ul className="text-sm text-gray-400 space-y-1 mb-4">
                <li>✓ 500k tokens / mois</li>
                <li>✓ Tous les modèles disponibles</li>
                <li>✓ Historique illimité</li>
              </ul>
              <button
                onClick={() => startCheckout('pro')}
                disabled={upgrading === 'pro'}
                className="w-full bg-[#6366F1] hover:opacity-90 disabled:opacity-50 py-2 rounded font-semibold transition"
              >
                {upgrading === 'pro' ? '⟳ Redirection…' : 'Choisir Pro'}
              </button>
            </Card>

            <Card className="p-6 border border-[#8b5cf6]/40 relative">
              <span className="absolute -top-2 right-4 bg-[#8b5cf6] text-xs font-bold px-2 py-0.5 rounded">RECOMMANDÉ</span>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xl font-bold">Agency</h3>
                <span className="text-2xl font-bold text-[#8b5cf6]">€149<span className="text-sm text-gray-400">/mois</span></span>
              </div>
              <ul className="text-sm text-gray-400 space-y-1 mb-4">
                <li>✓ 5 sièges inclus</li>
                <li>✓ Reporting par client</li>
                <li>✓ Multi-providers (OpenAI + Anthropic)</li>
                <li>✓ Support FR prioritaire</li>
              </ul>
              <button
                onClick={() => startCheckout('agency')}
                disabled={upgrading === 'agency'}
                className="w-full bg-[#8b5cf6] hover:opacity-90 disabled:opacity-50 py-2 rounded font-semibold transition"
              >
                {upgrading === 'agency' ? '⟳ Redirection…' : 'Choisir Agency'}
              </button>
            </Card>
          </div>

          {/* Current Balance */}
          <Card className="p-8 mb-6 bg-gradient-to-r from-[#6366F1]/10 to-[#8b5cf6]/10 border border-[#6366F1]/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm mb-2">Solde du mois en cours ({selectedMonth})</p>
                <p className="text-5xl font-bold">$234.50</p>
                <div className="flex gap-4 mt-4">
                  <div>
                    <p className="text-xs text-gray-400 mb-1">Utilisé ce mois</p>
                    <p className="text-lg font-semibold">$156.80</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 mb-1">Limite du forfait</p>
                    <p className="text-lg font-semibold">$500.00</p>
                  </div>
                </div>
              </div>
              <button
                onClick={openPortal}
                disabled={upgrading === 'portal'}
                className="bg-[#6366F1] px-6 py-3 rounded-md hover:opacity-90 disabled:opacity-50 transition font-semibold h-fit"
              >
                {upgrading === 'portal' ? '⟳ Chargement…' : '⚙️ Gérer mon abonnement'}
              </button>
            </div>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card className="p-6">
              <p className="text-gray-400 text-sm mb-2">Forfait actuel</p>
              <p className="text-2xl font-bold text-[#6366F1]">Pro</p>
              <p className="text-xs text-gray-500 mt-2">$49/mois • 50k requêtes</p>
              <button className="w-full mt-4 bg-gray-800 hover:bg-gray-700 px-3 py-2 rounded text-sm transition">
                Changer le forfait
              </button>
            </Card>

            <Card className="p-6">
              <p className="text-gray-400 text-sm mb-2">Utilisé ce mois</p>
              <p className="text-2xl font-bold text-green-400">$156.80</p>
              <div className="mt-3 bg-gray-800 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '31%' }}></div>
              </div>
              <p className="text-xs text-gray-500 mt-2">31% de votre limite utilisée</p>
            </Card>

            <Card className="p-6">
              <p className="text-gray-400 text-sm mb-2">Prochaine facturation</p>
              <p className="text-2xl font-bold text-blue-400">1er mai</p>
              <p className="text-xs text-gray-500 mt-2">dans 18 jours</p>
              <button className="w-full mt-4 bg-gray-800 hover:bg-gray-700 px-3 py-2 rounded text-sm transition">
                Voir les détails
              </button>
            </Card>
          </div>

          {/* Usage Breakdown */}
          <Card className="p-6 mb-6">
            <h3 className="text-xl font-semibold mb-4">Répartition des coûts</h3>
            <div className="space-y-4">
              {usageBreakdown.map((item, idx) => (
                <div key={idx}>
                  <div className="flex justify-between mb-2">
                    <div>
                      <p className="font-semibold">{item.service}</p>
                      <p className="text-xs text-gray-400">{item.usage}</p>
                    </div>
                    <span className="font-bold text-[#6366F1]">{item.cost}</span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-[#6366F1] to-[#8b5cf6] h-2 rounded-full"
                      style={{ width: `${item.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Billing History */}
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4">Historique de facturation</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-400">Date</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-400">Description</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-400">Montant</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-400">Statut</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-400">Facture</th>
                  </tr>
                </thead>
                <tbody>
                  {billingHistory.map((bill, idx) => (
                    <tr key={idx} className="border-b border-gray-800 hover:bg-[#0B0F19] transition">
                      <td className="py-3 px-4 text-sm">{bill.date}</td>
                      <td className="py-3 px-4 text-sm text-gray-400">{bill.description}</td>
                      <td className="py-3 px-4 text-sm font-bold">{bill.amount}</td>
                      <td className="py-3 px-4 text-sm">
                        <span className="bg-green-900 text-green-200 px-2 py-1 rounded text-xs">
                          {bill.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-sm">
                        <button className="text-[#6366F1] hover:underline text-xs">
                          📄 {bill.invoice}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
    </div>
  );
}

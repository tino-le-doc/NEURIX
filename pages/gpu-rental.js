import { useEffect, useState } from "react";
import Link from "next/link";
import Card from "../components/Card";

export default function GpuRental() {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const res = await fetch("/api/gpu");
        if (!res.ok) throw new Error("Impossible de charger le catalogue GPU");
        const data = await res.json();
        if (!cancelled) {
          setOffers(data.offers || []);
          setLoading(false);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message);
          setLoading(false);
        }
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-3">Location GPU à la demande</h1>
        <p className="text-gray-400 max-w-2xl">
          Accédez à de la puissance de calcul IA sans acheter de matériel.
          Louez un GPU à l&apos;heure pour vos projets de chatbot, génération
          d&apos;images ou fine-tuning.
        </p>
      </div>

      {loading && <p className="text-gray-400">Chargement du catalogue…</p>}
      {error && <p className="text-red-400">Erreur : {error}</p>}

      {!loading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {offers.map((offer) => (
            <Card key={offer.id} className="flex flex-col">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xl font-semibold">{offer.name}</h3>
                <span className="text-xs px-2 py-1 rounded-full bg-green-900 text-green-200">
                  {offer.status === "available" ? "Disponible" : offer.status}
                </span>
              </div>
              <p className="text-sm text-gray-400 mb-4">{offer.gpu}</p>

              <ul className="text-sm text-gray-300 space-y-1 mb-4">
                <li>
                  <span className="text-gray-500">VRAM :</span> {offer.vram}
                </li>
                <li>
                  <span className="text-gray-500">RAM :</span> {offer.ram}
                </li>
                <li>
                  <span className="text-gray-500">Stockage :</span>{" "}
                  {offer.storage}
                </li>
              </ul>

              <div className="flex flex-wrap gap-2 mb-4">
                {(offer.useCases || []).map((uc) => (
                  <span
                    key={uc}
                    className="text-xs px-2 py-1 rounded bg-[#0B0F19] border border-gray-800 text-gray-300"
                  >
                    {uc}
                  </span>
                ))}
              </div>

              <div className="mt-auto pt-4 border-t border-gray-800 flex items-baseline justify-between">
                <div>
                  <span className="text-3xl font-bold">
                    {offer.price.toFixed(2)}
                  </span>
                  <span className="text-gray-400 ml-1">€/h</span>
                </div>
                <Link
                  href="/signup"
                  className="bg-[#6366F1] hover:bg-[#5558e6] px-4 py-2 rounded-md text-sm font-medium"
                >
                  Louer
                </Link>
              </div>
            </Card>
          ))}
        </div>
      )}

      <Card className="bg-[#0B0F19]">
        <h2 className="text-2xl font-semibold mb-3">Comment ça marche</h2>
        <ol className="list-decimal list-inside text-gray-300 space-y-2">
          <li>Choisissez un GPU adapté à votre projet.</li>
          <li>
            Créez un compte et payez à l&apos;heure (facturation via Stripe).
          </li>
          <li>
            Recevez un lien Jupyter ou un accès SSH vers une instance prête
            à l&apos;emploi (PyTorch + Transformers préinstallés).
          </li>
          <li>Arrêtez l&apos;instance quand vous voulez : la facturation s&apos;arrête.</li>
        </ol>
      </Card>
    </div>
  );
}

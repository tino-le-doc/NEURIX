import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Card from "../components/Card";

const STATUS_STYLES = {
  pending_payment: "bg-yellow-900 text-yellow-200",
  provisioning: "bg-blue-900 text-blue-200",
  running: "bg-green-900 text-green-200",
  stopping: "bg-orange-900 text-orange-200",
  stopped: "bg-gray-800 text-gray-300",
  failed: "bg-red-900 text-red-200",
};

const STATUS_LABELS = {
  pending_payment: "En attente de paiement",
  provisioning: "Provisionnement",
  running: "Actif",
  stopping: "Arrêt en cours",
  stopped: "Arrêté",
  failed: "Échec",
};

export default function MyGpus() {
  const router = useRouter();
  const [instances, setInstances] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stoppingId, setStoppingId] = useState(null);

  const load = useCallback(async () => {
    try {
      const res = await fetch("/api/gpu/instances");
      if (!res.ok) throw new Error("Impossible de charger vos instances GPU");
      const data = await res.json();
      setInstances(data.instances || []);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  async function handleStop(id) {
    if (!confirm("Arrêter cette instance GPU ? La facturation s'arrête.")) {
      return;
    }
    setStoppingId(id);
    try {
      const res = await fetch(`/api/gpu/instances/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Arrêt impossible");
      await load();
    } catch (err) {
      setError(err.message);
    } finally {
      setStoppingId(null);
    }
  }

  const successInstance = router.query.status === "success"
    ? router.query.instance
    : null;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Mes GPU</h1>
          <p className="text-gray-400">
            Instances de location GPU (Phase 2 — Cloud IA)
          </p>
        </div>
        <Link
          href="/gpu-rental"
          className="bg-[#6366F1] hover:bg-[#5558e6] px-4 py-2 rounded-md text-sm font-medium"
        >
          + Louer un GPU
        </Link>
      </div>

      {successInstance && (
        <Card className="mb-6 border-green-800">
          <p className="text-green-300 text-sm">
            Paiement confirmé — l&apos;instance{" "}
            <code className="text-green-100">{successInstance}</code> est en
            cours de provisionnement.
          </p>
        </Card>
      )}

      {loading && <p className="text-gray-400">Chargement…</p>}
      {error && <p className="text-red-400 mb-4">Erreur : {error}</p>}

      {!loading && instances.length === 0 && (
        <Card>
          <p className="text-gray-400">
            Aucune instance pour le moment.{" "}
            <Link href="/gpu-rental" className="text-[#6366F1] hover:underline">
              Louez votre premier GPU
            </Link>
            .
          </p>
        </Card>
      )}

      <div className="space-y-4">
        {instances.map((instance) => {
          const statusStyle =
            STATUS_STYLES[instance.status] || "bg-gray-800 text-gray-300";
          const statusLabel = STATUS_LABELS[instance.status] || instance.status;
          const isActive =
            instance.status === "running" || instance.status === "provisioning";
          return (
            <Card key={instance.id}>
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="text-lg font-semibold">
                      {instance.offerName}
                    </h3>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${statusStyle}`}
                    >
                      {statusLabel}
                    </span>
                  </div>
                  <p className="text-sm text-gray-400">
                    {instance.gpu} • {instance.hours}h • {instance.totalPrice}{" "}
                    {instance.currency?.toUpperCase()}
                  </p>
                  {instance.host && (
                    <p className="text-xs text-gray-500 mt-1 font-mono">
                      {instance.host}
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  {instance.jupyterUrl && instance.status !== "stopped" && (
                    <a
                      href={instance.jupyterUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="bg-[#6366F1] hover:bg-[#5558e6] px-3 py-2 rounded-md text-sm font-medium"
                    >
                      Ouvrir Jupyter
                    </a>
                  )}
                  {isActive && (
                    <button
                      type="button"
                      onClick={() => handleStop(instance.id)}
                      disabled={stoppingId === instance.id}
                      className="px-3 py-2 rounded-md text-sm border border-gray-700 hover:bg-gray-800 disabled:opacity-50"
                    >
                      {stoppingId === instance.id ? "Arrêt…" : "Arrêter"}
                    </button>
                  )}
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

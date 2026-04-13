import Link from 'next/link';

export default function Error() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-6">
      <h1 className="text-7xl font-bold mb-4">500</h1>
      <h2 className="text-2xl font-semibold mb-2">Erreur interne du serveur</h2>
      <p className="text-gray-400 mb-8">Une erreur s'est produite. Veuillez réessayer plus tard.</p>
      <Link href="/" className="bg-[#6366F1] px-6 py-3 rounded-md hover:opacity-90 transition">
        Retour à l'accueil
      </Link>
    </div>
  );
}

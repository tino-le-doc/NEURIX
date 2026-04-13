import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-6">
      <h1 className="text-4xl font-semibold mb-4">La puissance de l’IA accessible à tous</h1>
      <p className="text-gray-400 mb-8">Lancez vos modèles sans complexité.</p>
      <Link href="/dashboard" className="bg-[#6366F1] px-6 py-3 rounded-md">Accéder au dashboard</Link>
    </div>
  )
}

import '../styles/globals.css'
import { useRouter } from 'next/router'
import Layout from '../components/Layout'
import AdminLayout from '../components/AdminLayout'

export default function App({ Component, pageProps }) {
  const router = useRouter();
  
  const isAdminPage = router.pathname.startsWith('/admin');
  const isSpecialPage = router.pathname === '/login' || 
                        router.pathname === '/signup' ||
                        router.pathname === '/404' ||
                        router.pathname === '/500';
  
  // Pages admin
  if (isAdminPage) {
    return (
      <AdminLayout>
        <Component {...pageProps} />
      </AdminLayout>
    )
  }
  
  // Pages spéciales (login, signup, erreurs)
  if (isSpecialPage) {
    return <Component {...pageProps} />
  }

  // Pages utilisateur avec Layout standard
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}

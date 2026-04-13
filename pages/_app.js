import '../styles/globals.css'
import { useRouter } from 'next/router'
import { SessionProvider } from 'next-auth/react'
import Layout from '../components/Layout'
import AdminLayout from '../components/AdminLayout'

export default function App({ Component, pageProps: { session, ...pageProps } }) {
  const router = useRouter();
  
  const isAdminPage = router.pathname.startsWith('/admin');
  const isSpecialPage = router.pathname === '/login' || 
                        router.pathname === '/signup' ||
                        router.pathname === '/404' ||
                        router.pathname === '/500';
  
  return (
    <SessionProvider session={session}>
      {/* Pages admin */}
      {isAdminPage ? (
        <AdminLayout>
          <Component {...pageProps} />
        </AdminLayout>
      ) : isSpecialPage ? (
        /* Pages spéciales (login, signup, erreurs) */
        <Component {...pageProps} />
      ) : (
        /* Pages utilisateur avec Layout standard */
        <Layout>
          <Component {...pageProps} />
        </Layout>
      )}
    </SessionProvider>
  )
}

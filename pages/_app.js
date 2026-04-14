import "../styles/globals.css";
import { useRouter } from "next/router";
import { SessionProvider } from "next-auth/react";
import Layout from "../components/Layout";
import AdminLayout from "../components/AdminLayout";
import ErrorBoundary from "../components/ErrorBoundary";

export default function App({ Component, pageProps: { session, ...pageProps } }) {
  const router = useRouter();

  const isAdminPage = router.pathname.startsWith("/admin");
  const isSpecialPage =
    router.pathname === "/login" ||
    router.pathname === "/signup" ||
    router.pathname === "/404" ||
    router.pathname === "/500";

  const content = isAdminPage ? (
    <AdminLayout>
      <Component {...pageProps} />
    </AdminLayout>
  ) : isSpecialPage ? (
    <Component {...pageProps} />
  ) : (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );

  return (
    <SessionProvider session={session}>
      <ErrorBoundary>{content}</ErrorBoundary>
    </SessionProvider>
  );
}

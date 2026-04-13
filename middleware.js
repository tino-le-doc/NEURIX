import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized({ token, req }) {
      // Les pages protégées nécessitent une authentification
      const protectedPaths = ["/dashboard", "/projects", "/compute", "/billing", "/models", "/jobs", "/profile", "/settings", "/admin"];
      
      const isProteted = protectedPaths.some(path => req.nextUrl.pathname.startsWith(path));
      
      if (isProteted) {
        return !!token;
      }
      
      return true;
    },
  },
});

export const config = {
  matcher: [
    "/((?!api/auth|_next/static|_next/image|favicon.ico|login|signup).*)",
  ],
};

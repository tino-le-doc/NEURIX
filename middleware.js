import { withAuth } from "next-auth/middleware";

const PROTECTED_PATHS = [
  "/dashboard",
  "/projects",
  "/compute",
  "/billing",
  "/models",
  "/jobs",
  "/profile",
  "/settings",
  "/admin",
];

const ADMIN_PREFIX = "/admin";

export default withAuth({
  callbacks: {
    authorized({ token, req }) {
      const { pathname } = req.nextUrl;

      const isProtected = PROTECTED_PATHS.some((path) =>
        pathname.startsWith(path)
      );
      if (!isProtected) return true;
      if (!token) return false;

      // Admin namespace is gated on the `admin` role
      if (pathname.startsWith(ADMIN_PREFIX) && token.role !== "admin") {
        return false;
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

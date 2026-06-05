// proxy.ts
import { auth } from "./auth"

export default auth((req) => {
  const isLoggedIn = !!req.auth
  const isAdminPage = req.nextUrl.pathname.startsWith("/admin")

  if (isAdminPage && !isLoggedIn) {
    const loginUrl = new URL("/api/auth/signin", req.nextUrl.origin)
    
    loginUrl.searchParams.append("callbackUrl", req.nextUrl.pathname)
    
    return Response.redirect(loginUrl)
  }
})

export const config = {
  matcher: ["/admin/:path*"],
}
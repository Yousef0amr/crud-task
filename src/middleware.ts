import { NextRequest, NextResponse } from "next/server";
import { withAuth } from "next-auth/middleware";
import { getToken } from "next-auth/jwt";


export default withAuth(
    async function middleware(request: NextRequest) {

        const pathname = request.nextUrl.pathname;
        const isAuth = await getToken({ req: request });

        const protectedRoutes = [
            '/dashboard',
        ]
        const isAuthRoute = pathname === '/login';
        const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route));

        if (isProtectedRoute && !isAuth) {
            return NextResponse.redirect(new URL('/login', request.url))
        }

        if (isAuth && isAuthRoute) {
            return NextResponse.redirect(new URL('/dashboard', request.url))
        }
    },
    {
        callbacks: {
            async authorized() {
                return true;
            },
        },
    }
)





export const config = {
    matcher: [
        '/dashboard/:path*',
        '/login',
    ]
}

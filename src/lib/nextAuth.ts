import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import api from "./axiosConfig";


export const authOptions: AuthOptions = {
    pages: {
        signIn: "/login",
    },
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {
                    label: "Email",
                    type: "email",
                },
                password: {
                    label: "Password",
                    type: "password",
                },
            },
            async authorize(credentials: Record<"email" | "password", string> | undefined) {
                try {
                    const res = await api.post("/auth/login", {
                        email: credentials?.email,
                        password: credentials?.password,
                    });

                    if (res.data.access_token && res.data.refresh_token) {
                        return {
                            id: "1",
                            access_token: res.data.access_token,
                            refresh_token: res.data.refresh_token,
                        };
                    }
                    return null;
                } catch (error) {
                    return null;
                }
            },
        })
    ],
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60,
    },
    secret: process.env.NEXTAUTH_SECRET,
    jwt: {
        secret: process.env.NEXTAUTH_SECRET,
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.access_token = user.access_token;
                token.refresh_token = user.refresh_token;
            }
            return token;
        },
        async session({ session, token }) {
            session.user = token;
            return session;
        },
    },

};


export const { handlers, auth, signIn, signOut } = NextAuth(authOptions)
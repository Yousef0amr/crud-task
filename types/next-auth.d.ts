import NextAuth from "next-auth"


declare module "next-auth" {
    interface User {
        access_token?: string;
        refresh_token?: string;
    }

    interface Session {

        access_token?: string;
        refresh_token?: string;

    }
}

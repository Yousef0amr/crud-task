"use client";


import { signIn } from "next-auth/react"


export async function loginCredentials(email: string, password: string) {
    return await signIn('credentials', { email, password, redirect: false })
}

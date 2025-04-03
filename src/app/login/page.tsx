"use client"

import { loginSchema } from '@/lib/zod'
import React from 'react'
import { useForm, SubmitHandler } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod'
import LoginForm from './loginForm'
import { loginCredentials } from '../actions/authActions'
import { useRouter } from "next/navigation";
type Inputs = {
    email: string
    password: string
}

const Login = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm(
        {
            resolver: zodResolver(loginSchema)
        }
    )

    const router = useRouter();

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        try {
            const res = await loginCredentials(data.email, data.password)
            if (res?.status === 200) {
                router.push('/dashboard')
            }
        } catch (error) {
            console.log('request error', error)
        }
    }

    return (
        <div className="w-full flex flex-col justify-center items-center h-screen ">
            <LoginForm props={{ register, handleSubmit, errors, onSubmit }} />
        </div>
    )
}

export default Login




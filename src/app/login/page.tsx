"use client"

import { loginSchema } from '@/lib/zod'
import React, { useState } from 'react'
import { useForm, SubmitHandler } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod'
import LoginForm from './loginForm'
import { loginCredentials } from '../actions/authActions'
import { useRouter } from "next/navigation";
import toast from 'react-hot-toast'
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
    const [loading, setLoading] = useState(false)
    const router = useRouter();

    const onSubmit: SubmitHandler<Inputs> = async (user) => {
        setLoading(true)
        try {
            const res = await loginCredentials(user.email, user.password)
            if (res?.status === 200) {
                router.push('/dashboard')
            } else {
                toast.error('invalid credentials')
            }
            setLoading(false)
        } catch (error) {
            setLoading(false)
            toast.error('something went wrong')
        }
    }

    return (
        <div className="w-full flex flex-col justify-center items-center h-screen ">
            <LoginForm props={{ register, handleSubmit, errors, onSubmit, loading }} />
        </div>
    )
}

export default Login




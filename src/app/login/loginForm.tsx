
import React from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const loginForm = ({ props }: { props: React.PropsWithChildren<any> }) => {
    return (
        <Card className="border-none shadow-none w-full max-w-md">
            <CardHeader>
                <CardTitle className="text-2xl">Login</CardTitle>
                <CardDescription>
                    Enter your email below to login to your account
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={props.handleSubmit(props.onSubmit)} className="p-6 md:p-10">
                    <div className="flex flex-col gap-6">
                        <div className="grid gap-1">
                            <Label htmlFor="email">Email</Label>
                            <Input {...props.register("email")} />
                            <p className="text-red-500">{props.errors.email?.message}</p>
                        </div>

                        <div className="grid gap-1">
                            <Label htmlFor="password">Password</Label>
                            <Input {...props.register("password")} type="password" />
                            <p className="text-red-500">{props.errors.password?.message}</p>
                        </div>

                        <Button type="submit" >
                            Login
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    )
}

export default loginForm
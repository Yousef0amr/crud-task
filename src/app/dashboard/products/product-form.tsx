"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { productSchema } from "@/lib/zod"
import { Button } from "@/components/ui/button"


export type ProductFormValues = z.infer<typeof productSchema>

export function ProductForm({
    productData,
    handleOnSubmit,
    handleClose
}: {
    productData: ProductFormValues | undefined,
    handleClose: () => void
    handleOnSubmit: (data: ProductFormValues) => void
}) {
    const form = useForm<ProductFormValues>({
        resolver: zodResolver(productSchema),
        defaultValues: productData,
    })


    const onSubmit = (data: ProductFormValues) => {
        handleOnSubmit(data)
    }

    return (
        <div style={{ padding: '10px' }}>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Title</FormLabel>
                                <FormControl>
                                    <Input  {...field} />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="price"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Price</FormLabel>
                                <FormControl>
                                    <Input type="number" {...field} />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <Textarea {...field} />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="categoryId"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Category ID</FormLabel>
                                <FormControl>
                                    <Input type="number"  {...field} />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="images"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Images</FormLabel>
                                <FormControl>
                                    <Input
                                        type="text"

                                        {...field}
                                    />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="flex items-center justify-end gap-2" style={{ marginTop: '10px' }}>
                        <Button onClick={handleClose} className="cursor-pointer" style={{ padding: '10px 20px' }}>Cancel</Button>
                        <Button className="cursor-pointer" style={{ padding: '10px 20px' }} type="submit">Submit</Button>

                    </div>
                </form>


            </Form>
        </div>

    )
}

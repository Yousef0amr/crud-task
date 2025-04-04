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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Category } from "./products-columns"


export type ProductFormValues = z.infer<typeof productSchema>

export function ProductForm({
    productData,
    handleOnSubmit,
    handleClose,
    categories
}: {
    productData: ProductFormValues | undefined,
    handleClose: () => void
    handleOnSubmit: (data: ProductFormValues) => void,
    categories: Category[]
}) {
    const form = useForm<ProductFormValues>({
        resolver: zodResolver(productSchema),
        defaultValues: productData,
    })


    const onSubmit = (data: ProductFormValues) => {
        handleOnSubmit(data)
    }

    return (
        <div style={{ padding: '20px' }}>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Title</FormLabel>
                                <FormControl style={{ padding: '10px' }}>
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
                                <FormControl style={{ padding: '10px' }}>
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
                                <FormControl style={{ padding: '10px' }}>
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
                            <FormItem className="w-full" >
                                <FormLabel>Category</FormLabel>
                                <FormControl className="w-full">
                                    <Select onValueChange={field.onChange} value={field.value}>
                                        <SelectTrigger className="w-full cursor-pointer" style={{ padding: '10px' }} >
                                            <SelectValue placeholder="Select a category">
                                                {categories.find(cat => cat.id === field.value)?.name}
                                            </SelectValue>
                                        </SelectTrigger>
                                        <SelectContent className="w-full" style={{ padding: '10px' }}>
                                            {categories.map((cat) => (
                                                <SelectItem key={cat.id} value={cat.id.toString()}>
                                                    {cat.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
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
                                        style={{ padding: '10px' }}
                                        type="text"
                                        placeholder="you can add  multiple images by add , between urls"
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

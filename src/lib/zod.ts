
import { object, string } from 'zod'



export const loginSchema = object(
    {
        email: string(
            {
                required_error: 'Email is required'
            }
        ).email(
            {
                message: 'Invalid email'
            }
        ),
        password: string(
            {
                required_error: 'Password is required'
            }
        ).min(8,
            {
                message: 'Password must be at least 8 characters'
            })
    }
)



export const productSchema = object({
    title: string().min(2, {
        message: "Title must be at least 2 characters.",
    }),
    price: string().min(1, {
        message: "Price must be a positive number.",
    }),
    description: string().min(5, {
        message: "Description must be at least 5 characters.",
    }),
    categoryId: string().min(1, {
        message: "Category ID must be a positive number.",
    }),
    images: string().min(1, {
        message: "At least one image is required.",
    })
})

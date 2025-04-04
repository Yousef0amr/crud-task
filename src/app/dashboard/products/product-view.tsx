'use client'

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import Autoplay from "embla-carousel-autoplay"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"


import { Product } from "./products-columns"
import { useRef } from "react"
import { Separator } from "@/components/ui/separator"


const ProductView = ({ product }: {
    product: Product
}) => {

    const plugin = useRef(
        Autoplay({ delay: 1000, stopOnFocusIn: true })
    )

    return (
        <Card style={{ margin: '30px' }} className="shadow-none border-none">
            <CardContent className="flex items-center justify-center">
                <Carousel
                    plugins={[plugin.current]}
                    className="w-full max-w-xs"
                    onMouseEnter={plugin.current.stop}
                    onMouseLeave={plugin.current.reset}
                >
                    <CarouselContent>
                        {product.images.map((img: string, index: number) => (
                            <CarouselItem key={index}>
                                <div className="p-1">
                                    <Card>
                                        <CardContent className="flex aspect-square items-center justify-center p-6">
                                            <img style={{ width: '100%' }} src={img} alt={''} />
                                        </CardContent>
                                    </Card>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>

                </Carousel>
            </CardContent>
            <CardHeader>
                <CardTitle>{product.title}</CardTitle>
                <CardDescription>{product.description}</CardDescription>
            </CardHeader>
            <Separator />
            <CardFooter className="flex justify-between items-center">
                <p style={{ padding: '5px 20px', borderRadius: '10px' }} className=" bg-cyan-500 text-white"> {product.price}$</p>
                <p className="text-gray-500"> {product.category.name}</p>
            </CardFooter>
        </Card>

    )
}

export default ProductView
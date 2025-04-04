"use client"

import { Button } from "@/components/ui/button"
import { ColumnDef } from "@tanstack/react-table"
import { DeleteIcon, Edit } from "lucide-react"

export interface Category {
    id: string
    name: string,
    image: string,
    slug: string
}

export type Product = {
    id: string
    title: number
    slug: string,
    price: string,
    description: string,
    category: Category,
    images: [string]
}



export const productsColumns = (
    {
        handleEdit,
        handleDelete,
        handleView
    }: {
        handleEdit: (data: Product) => void
        handleDelete: (data: Product) => void
        handleView: (data: Product) => void
    }
): ColumnDef<Product>[] => {
    return [
        {
            accessorKey: "id",
            enableSorting: true,
            enableColumnFilter: true,
            header: () => (
                <div className="text-center font-semibold text-gray-700" style={{ width: "50px" }}>ID</div>
            ),
            cell: ({ row }) => (
                <div className="text-center text-gray-500 p-2" style={{ width: "50px" }}>
                    {row.getValue("id")}
                </div>
            ),
        },
        {
            accessorKey: "title",
            header: () => (
                <div className="font-semibold p-2 text-center" style={{ width: "50px", padding: '10px' }}>Title</div>
            ),
            cell: ({ row }) => (
                <div className="font-semibold p-2 text-center" style={{ width: "150px", padding: '10px' }}>
                    {row.getValue("title")}
                </div>
            ),
            enableSorting: true,
            enableColumnFilter: true,
        },
        {
            accessorKey: "price",
            header: () => (
                <div className="text-center font-semibold p-2" style={{ width: "50px" }}>Price</div>
            ),
            cell: ({ row }) => (
                <div className="text-center font-bold p-2" style={{ width: "50px" }}>
                    ${row.getValue("price")}
                </div>
            ),
            enableSorting: true,
            enableColumnFilter: true,
        },
        {
            accessorKey: "slug",
            header: () => (
                <div className="text-center font-semibold p-2" style={{ width: "50px" }}>Slug</div>
            ),
            cell: ({ row }) => (
                <div className="text-center font-bold p-2" style={{ width: "150px" }}>
                    ${row.getValue("slug")}
                </div>
            ),
            enableSorting: true,
            enableColumnFilter: true,
        },
        {
            id: "actions",
            header: () => (
                <div className="font-semibold p-2 text-center" style={{ width: "50px" }}>Actions</div>
            ),
            cell: ({ row }) => (
                <div className="flex justify-center gap-2 p-2" style={{ width: "50px" }}>
                    <Button
                        onClick={() => handleView(row.original)}
                        variant="secondary"
                        className="cursor-pointer hover:text-green-500"
                        size="sm"
                    >
                        View
                    </Button>
                    <Button
                        onClick={() => handleEdit(row.original)}
                        className="cursor-pointer hover:text-blue-500"
                        variant={'ghost'}
                    >
                        <Edit className="hover:text-blue-500" />
                    </Button>

                    <Button
                        onClick={() => handleDelete(row.original)}
                        className="cursor-pointer hover:text-red-500"
                        variant={"ghost"}
                    >
                        <DeleteIcon className="hover:text-red-500" />
                    </Button>
                </div>
            ),
        },
    ]
}


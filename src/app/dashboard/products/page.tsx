'use client'

import { DataTable } from '@/components/data-table';
import { useAddProduct, useDeleteProduct, useProducts, useUpdateProduct } from '@/hooks/useProducts';
import { Product, productsColumns } from './products-columns';
import { Button } from '@/components/ui/button';
import { ModelDialog } from '@/components/model-dialog';
import { useState } from 'react';
import { ProductForm, ProductFormValues } from './product-form';
import { useProductStore } from '@/store/product-store';
import DeleteModel from '@/components/delete-model';
import toast from "react-hot-toast";



const Products = () => {
    const { data } = useProducts();
    const addProduct = useAddProduct();
    const updateProduct = useUpdateProduct();
    const deleteProduct = useDeleteProduct();

    const { products } = useProductStore((state) => state);
    const [open, setOpen] = useState({
        open: false,
        data: undefined as any | undefined,
        type: 'add'
    });



    const handleClose = () => {
        setOpen({
            open: false,
            data: undefined,
            type: 'add'
        })
    }
    const handleEdit = (data: Product) => {
        setOpen({
            open: true,
            data: { ...data, price: data.price.toString(), categoryId: data.category.id.toString(), images: data.images.join(',') },
            type: 'edit'
        })
    }

    const handleDelete = (data: Product) => {
        setOpen({
            open: true,
            data,
            type: 'delete'
        })
    }
    const handleView = (data: Product) => {
        setOpen({
            open: true,
            data,
            type: 'view'
        })
    }

    const handleOnSubmit = (data: ProductFormValues) => {
        if (open.type === 'add') {
            addProduct.mutate(data, {
                onSuccess: () => {
                    handleClose()
                    toast.success("Product added successfully!");
                }
            })
        }
        if (open.type === 'edit') {
            updateProduct.mutate({
                ...data,
                id: open.data?.id
            }, {
                onSuccess: () => {
                    handleClose()
                    toast.success("Product updated successfully!");
                }
            })
        }
    }


    const handleOnDelete = () => {
        if (open.data) {
            deleteProduct.mutate(open.data.id, {
                onSuccess: () => {
                    handleClose()
                    toast.success("Product deleted successfully!");
                }
            })
        }
    }

    return (
        <section >
            <nav className='flex items-center justify-between' style={{ marginBottom: '20px' }}>
                <span className='text-2xl font-bold'>List Products</span>
                <Button
                    className='px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-blue-600 cursor-pointer'
                    style={{ padding: '10px 20px' }}
                    onClick={() => {
                        setOpen({
                            open: true,
                            data: undefined,
                            type: 'add'
                        })
                    }}
                    size={'sm'}
                >
                    Add New Product
                </Button>
            </nav>
            <div>
                <DataTable columns={productsColumns({ handleEdit, handleDelete, handleView })} data={products || []} />
            </div>

            {
                open.type === 'delete' ? <DeleteModel handleClose={handleClose} open={open.open} handleSubmit={handleOnDelete} /> :
                    <ModelDialog open={open.open} handleClose={handleClose} >
                        <ProductForm handleOnSubmit={handleOnSubmit} productData={open.data} handleClose={handleClose} />
                    </ModelDialog>
            }
        </section>

    )
}

export default Products
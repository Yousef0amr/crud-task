'use client'

import { DataTable } from '@/components/table/data-table';
import { useAddProduct, useCategories, useDeleteProduct, useProducts, useUpdateProduct } from '@/hooks/useProducts';
import { Product, productsColumns } from './products-columns';
import { Button } from '@/components/ui/button';
import { ModelDialog } from '@/components/model-dialog';
import { Suspense, useState } from 'react';
import { ProductForm, ProductFormValues } from './product-form';
import { useProductStore } from '@/store/product-store';
import DeleteModel from '@/components/delete-model';
import toast from "react-hot-toast";
import { Separator } from '@/components/ui/separator';
import PageContainer from '@/components/layout/page-container';
import { Plus } from 'lucide-react';
import ProductView from './product-view';



const Products = () => {
    const { data } = useProducts();
    const { data: categories } = useCategories();
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
            type: ''
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

        <PageContainer scrollable={false}>
            <div className='flex flex-1 flex-col space-y-4'>
                <div className='flex items-start justify-between'>
                    <nav className='flex flex-col space-y-1' style={{ marginBottom: '10px' }}>
                        <span className='text-2xl font-bold'>List Products</span>
                        <p className='text-xs text-gray-400'>
                            Manage products</p>
                    </nav>
                    <Button
                        className='px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 cursor-pointer'
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
                        <Plus className='mr-2' /> New Product
                    </Button>
                </div>
                <Separator />
                <section style={{ marginTop: '10px' }} >
                    <div>
                        <DataTable columns={productsColumns({ handleEdit, handleDelete, handleView })} data={products || []} />
                    </div>
                    {
                        open.type === 'delete' ? <DeleteModel handleClose={handleClose} open={open.open} handleSubmit={handleOnDelete} /> :
                            <ModelDialog open={open.open} handleClose={handleClose} >
                                {
                                    open.type === 'view' && <ProductView product={open.data} />
                                }
                                {
                                    open.type === 'add' && <ProductForm categories={categories || []} handleOnSubmit={handleOnSubmit} productData={open.data} handleClose={handleClose} />
                                }
                                {
                                    open.type === 'edit' && <ProductForm categories={categories || []} handleOnSubmit={handleOnSubmit} productData={open.data} handleClose={handleClose} />
                                }
                            </ModelDialog>
                    }
                </section>
            </div>
        </PageContainer>

    )
}

export default Products

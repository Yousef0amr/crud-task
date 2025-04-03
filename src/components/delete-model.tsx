import React from 'react'
import { ModelDialog } from './model-dialog'
import { Button } from './ui/button';
import { LucideDelete } from 'lucide-react';

const DeleteModel = (
    {
        open,
        handleClose,
        handleSubmit
    }: {
        open: boolean;
        handleClose: () => void,
        handleSubmit: () => void
    }
) => {
    return (
        <ModelDialog open={open} handleClose={handleClose} >
            <div className='flex flex-col gap-4'>
                <h3 className='text-lg font-semibold'></h3>
                <p style={{ margin: '10px' }} className='text-md text-muted-foreground'>Are you sure you want to delete this product? This action can&apos;t be undone.</p>
                <div className='flex justify-end gap-2' style={{ padding: '10px' }}>
                    <Button className='cursor-pointer' style={{ padding: '10px 20px' }} onClick={handleClose}>Cancel</Button>
                    <Button style={{ padding: '10px 20px' }} className='bg-red-500 cursor-pointer' onClick={handleSubmit}>
                        Delete
                    </Button>
                </div>
            </div>
        </ModelDialog>
    )
}

export default DeleteModel
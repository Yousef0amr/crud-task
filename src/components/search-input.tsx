'use client';


import { Button } from './ui/button';
import { Search } from 'lucide-react';

export default function SearchInput() {

  return (
    <div className='w-full space-y-2' >
      <Button
        variant='outline'
        className='cursor-pointer bg-background text-muted-foreground relative h-9 w-full justify-start rounded-[0.5rem] text-sm font-normal shadow-none sm:pr-12 md:w-40 lg:w-64'
        style={{ padding: '10px' }}
      >
        <Search className='mr-2 h-4 w-4' />
        Search...
      </Button>
    </div>
  );
}

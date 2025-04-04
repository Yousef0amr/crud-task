'use client';


import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail
} from '@/components/ui/sidebar';

import { ChevronsDown, Home, LogOut, LogOutIcon, ShoppingBag } from 'lucide-react';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import * as React from 'react';


const navItems: any[] = [
    {
        title: 'Dashboard',
        url: '/dashboard',
        icon: <Home />
    },
    {
        title: 'Product',
        url: '/dashboard/products',
        icon: <ShoppingBag />,
    },
];

export default function AppSidebar() {
    const pathname = usePathname();

    return (
        <Sidebar collapsible='offcanvas'>
            <SidebarHeader className='flex items-center gap-2 bg-black text-2xl text-amber-50' style={{ padding: '10px' }}>
                <span>Logo</span>
            </SidebarHeader>
            <SidebarContent className='overflow-x-hidden' style={{ padding: '20px' }}>
                <SidebarGroup>
                    <SidebarGroupLabel>Overview</SidebarGroupLabel>
                    <SidebarMenu>
                        {navItems.map((item) => {
                            return <SidebarMenuItem key={item.title}>
                                <SidebarMenuButton
                                    asChild
                                    tooltip={item.title}
                                    isActive={pathname === item.url}
                                >
                                    <Link href={item.url}>
                                        {item.icon}
                                        <span>{item.title}</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        })
                        }
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter style={{ padding: '10px' }}>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <SidebarMenuButton
                                    size='lg'
                                    className='cursor-pointer data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'
                                >
                                    <LogOut className='ml-auto size-4' />
                                </SidebarMenuButton>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                className='w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg'
                                side='bottom'
                                align='end'
                                sideOffset={4}

                            >
                                <DropdownMenuItem onClick={() => signOut()} className='cursor-pointer' style={{ padding: '10px' }} >

                                    Log out
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    );
}

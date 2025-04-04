'use client'

import { SidebarProvider } from "@/components/ui/sidebar"
import AppSidebar from "@/components/app-sidebar"
import Header from "@/components/header"

const SideBar = ({ children }: { children: React.ReactNode }) => {
    return (

        <SidebarProvider>
            <AppSidebar />
            <main className="w-full">

                <Header />
                <div style={{ margin: "10px" }}>
                    {children}
                </div>

            </main>
        </SidebarProvider>
    )
}

export default SideBar
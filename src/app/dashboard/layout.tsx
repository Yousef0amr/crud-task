import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"

const SideBar = ({ children }: { children: React.ReactNode }) => {
    return (
        <SidebarProvider>
            <AppSidebar />
            <main className="w-full">
                <SidebarTrigger />
                <div style={{ margin: "10px" }}>
                    {children}
                </div>

            </main>
        </SidebarProvider>
    )
}

export default SideBar
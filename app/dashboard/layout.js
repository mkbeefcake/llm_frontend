import Navbar from "../components/navbar"

export default function DashboardLayout({ children }) {
    return (
        <main className="flex min-h-screen flex-col">
            <Navbar />
            <div>
                {children}
            </div>
        </main>  
    )
}
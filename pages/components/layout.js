import Navbar from "./navbar"

export default function DefaultLayout({ children }) {
    return (
        <main className="flex min-h-screen flex-col">
            <Navbar />
            <div>
                {children}
            </div>
        </main>  
    )
}
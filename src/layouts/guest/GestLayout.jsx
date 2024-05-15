import { Outlet } from "react-router-dom"

function GuestLayout() {
    return (
        <main className="min-h-screen">
            <Outlet />
        </main>
    )
}

export default GuestLayout
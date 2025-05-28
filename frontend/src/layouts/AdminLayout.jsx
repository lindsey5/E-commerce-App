import { Outlet } from "react-router-dom"
import Sidebar from "../components/Sidebar"

const AdminLayout = () => {
    return <main className="pl-55 w-screen h-screen">
        <Sidebar />
        <Outlet />
    </main>
}

export default AdminLayout
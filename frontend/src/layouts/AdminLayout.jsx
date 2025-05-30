import { Outlet } from "react-router-dom"
import Sidebar from "../components/Sidebar"

const AdminLayout = () => {
    return <main className="pl-55 h-screen">
        <Sidebar />
        <Outlet />
    </main>
}

export default AdminLayout
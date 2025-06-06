import { Outlet, useNavigate } from "react-router-dom"
import Sidebar from "../components/Sidebar"
import { useEffect } from "react"
import { fetchData } from "../services/api"

const AdminLayout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const getAdmin = async () => {
            const response = await fetchData('/api/admin')
            if(!response.success) navigate('/login')
        }

        getAdmin()
    }, [])

    return <main className="pl-55 h-screen">
        <Sidebar />
        <Outlet />
    </main>
}

export default AdminLayout
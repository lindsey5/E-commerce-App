import MonthlySales from "../components/dashboard/MonthSales";
import PendingOrders from "../components/dashboard/PendingOrders";
import SalesThisYear from "../components/dashboard/SalesThisYear";
import SalesToday from "../components/dashboard/SalesToday";
import TotalProducts from "../components/dashboard/TotalProducts";

const Dashboard = () => {

    return <main className="p-10 bg-gray-100">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <div className="w-full flex gap-5 grid grid-cols-4 mt-5">
            <SalesToday />
            <PendingOrders />
            <SalesThisYear />
            <TotalProducts />
        </div>
        <MonthlySales />
    </main>
}

export default Dashboard;
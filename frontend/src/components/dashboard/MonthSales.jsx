import { BarChart } from '@mui/x-charts/BarChart';
import { useState, useEffect } from 'react';
import { fetchData } from '../../services/api';

const monthLabels = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];

const MonthlySales = () => {
    const [sales, setSales] = useState([])
    const [year, setYear] = useState(new Date().getFullYear())

    useEffect(() => {
        const fetchMonthlySales = async () => {
            const response = await fetchData(`/api/order/sales/monthly?year=${year}`); 
            if(response.success){
                const monthlySales = response.monthlySales;
                const formattedData = monthLabels.map((label, index) => ({
                        month: label,
                        total: monthlySales[index],
                    })
                );

                setSales(formattedData);
                };
            }

        fetchMonthlySales();
    }, []);

    return <div className='bg-white shadow-md shadow-gray-300 rounded-md mt-10 p-5'>
        <select className="outline-none" onChange={(e) => setYear(e.target.value)} value={year}>
            <option value="2024">2024</option>
            <option value="2025">2025</option>
        </select>
        <BarChart
            dataset={sales}
            xAxis={[{ dataKey: 'month' }]}
            series={[{ dataKey: 'total', label: 'Monthly Sales' }]}
            height={350}
            colors={['#1f2536']}
            grid={{ horizontal: true }}
        />
    </div>
}

export default MonthlySales
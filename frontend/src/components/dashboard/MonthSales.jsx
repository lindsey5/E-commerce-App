import { BarChart } from '@mui/x-charts/BarChart';
import { useState, useEffect } from 'react';
import { fetchData } from '../../services/api';

const monthLabels = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];

const MonthlySales = () => {
    const [sales, setSales] = useState([])

    useEffect(() => {
        const fetchMonthlySales = async () => {
            const response = await fetchData('/api/order/sales/monthly'); 
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

    return <div className='bg-white shadow-md shadow-gray-300 rounded-md mt-20'>
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
import { useState } from "react"
import Card from "./Card"
import { useEffect } from "react";
import { fetchData } from '../../services/api';

const SalesToday = () => {
    const [total, setTotal] = useState(0);

    useEffect(() => {
        const getTotal = async () => {
            const response = await fetchData('/api/order/sales/today')
            if(response.success) setTotal(`₱ ${response.total.toFixed(2)}`)
        }

        getTotal();
    }, [])

    return <Card label="Sales Today" value={total}/>
}

export default SalesToday
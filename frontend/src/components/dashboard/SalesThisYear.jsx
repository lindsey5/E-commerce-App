import { useState } from "react"
import Card from "./Card"
import { useEffect } from "react";
import { fetchData } from '../../services/api';

const SalesThisYear = () => {
    const [total, setTotal] = useState(0);

    useEffect(() => {
        const getTotal = async () => {
            const response = await fetchData('/api/order/sales/year')
            if(response.success) setTotal(`₱ ${response.total.toFixed(2)}`)
        }

        getTotal();
    }, [])

    return <Card label="Sales this year" value={total}/>
}

export default SalesThisYear
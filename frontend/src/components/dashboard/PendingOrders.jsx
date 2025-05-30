import { useState } from "react"
import Card from "./Card"
import { useEffect } from "react";
import { fetchData } from '../../services/api';

const PendingOrders = () => {
    const [total, setTotal] = useState(0);

    useEffect(() => {
        const getTotal = async () => {
            const response = await fetchData('/api/order/pending')
            if(response.success) setTotal(response.total)
        }

        getTotal();
    }, [])

    return <Card label="Pending Orders" value={total}/>
}

export default PendingOrders
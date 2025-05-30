import { useState } from "react"
import Card from "./Card"
import { useEffect } from "react";
import { fetchData } from '../../services/api';

const TotalProducts = () => {
    const [total, setTotal] = useState(0);

    useEffect(() => {
        const getTotal = async () => {
            const response = await fetchData('/api/product/total')
            if(response.success) setTotal(response.total)
        }

        getTotal();
    }, [])

    return <Card label="Total Products" value={total}/>
}

export default TotalProducts
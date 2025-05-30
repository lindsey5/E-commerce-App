import BaseModal from "./BaseModal"
import CustomButton from "../CustomButton"
import CustomSelect from "../CustomSelect"
import { useEffect, useState } from "react"
import { IconButton } from "@mui/material"
import CloseIcon from '@mui/icons-material/Close';
import { updateData } from "../../services/api"
import { toast } from "react-toastify"

const EditOrder = ({ order, handleClose}) => {
    const [status, setStatus] = useState()
    
    const handleChange = (e) => {
        setStatus(e.target.value)
    }

    useEffect(() => {
        if(order) setStatus(order.status)
    }, [order])

    const save = async () => {
        const response = await updateData(`/api/order/status/${order._id}`, { status })
        if(response.success) window.location.reload();
        else toast.error(response.errors[0])
    }

    return <BaseModal open={order != null} handleClose={handleClose}>
        <div className="flex flex-col w-[400px] gap-5">
            <div className="flex justify-between items-center">
                <h1 className="font-bold text-3xl mb-5">Edit order</h1>
                <IconButton size="large" onClick={handleClose}>
                    <CloseIcon fontSize="inherit"/>
                </IconButton>
            </div>
            <div className="border-b-1 border-gray-300 py-5">
                <div className="flex w-full gap-3">
                    <img className="w-20 h-20" src={order?.product.image}/>
                    <div className="flex-1 flex flex-col gap-3">
                        <h1 className="font-bold text-xl">{order?.product.name}</h1>
                        <p>{order?.color} | {order?.size}</p>
                        <div className="flex w-full justify-between">
                            <p>Quantity: {order?.quantity}</p>
                            <p>₱{order?.price}</p>
                        </div>
                    </div>
                </div>
                <div className="flex justify-between w-full items-center mt-5">
                    <CustomSelect 
                        width="150px"
                        label="Status"
                        value={status}
                        onChange={handleChange}
                        items={['Pending', 'Confirmed', 'Shipped', 'Completed', 'Cancelled']}
                    />
                    <p className="font-bold">Total Price: {order?.price * order?.quantity}</p>
                </div>
            </div>
            <p>Order Id: {order?.order_id}</p>
            <p>Customer name: {order?.firstname} {order?.lastname}</p>
            <p>Full Address: {order?.address}, {order?.city}, {order?.zip}</p>
            <div className="w-full flex justify-end">
                <CustomButton onClick={save}>Save</CustomButton>
            </div>
        </div>
    </BaseModal>
}

export default EditOrder
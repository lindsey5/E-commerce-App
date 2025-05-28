import { useEffect, useState } from "react"
import CustomButton from "../CustomButton"
import CustomSelect from "../CustomSelect"
import CustomTextField from "../CustomTextField"
import BaseModal from "./BaseModal"
import { updateData } from "../../services/api"
import { toast } from "react-toastify"

const sizes = ["XS", "S", "M", "L", "XL", "2XL"]

const UpdateItemModal = ({ open, handleClose, item}) => {
    const [data, setData] = useState()

    useEffect(() => {
        setData(item)
    }, [item])

    const handleChange = (field, value) => {
        setData({...data, [field]: value});
    }

    const updateItem = async () => {
        if(!data.sku) toast.error("SKU is required");
        else if(!data.color) toast.error("Color is required");
        else if(!data.size) toast.error("Size is required");
        else if(!data.price) toast.error("Price is required");
        else if(!data.stock) toast.error("Stock is required");
        else {
            try{
                const response = await updateData(`/api/item/${item._id}`, {...data, product: data.product._id});
                if(response.success) window.location.reload();
            }catch(err){
                toast.error(err.response.data.message || err.response.data.errors[0])
            }
            
        }
    }

    return <BaseModal open={open} handleClose={handleClose}>
        <div className="flex flex-col gap-5 w-[400px]">
            <h1 className="text-2xl font-bold">Edit Item</h1>
            <CustomTextField 
                label="SKU" 
                value={data?.sku}
                onChange={(e) => handleChange("sku", e.target.value)}
            />
            <div className="grid grid-cols-2 gap-y-5 gap-x-2">
                <CustomTextField 
                    label="Color"
                    value={data?.color}
                    onChange={(e) => handleChange("color", e.target.value)}
                />
                <CustomSelect 
                    label="Size" 
                    items={sizes}
                    value={data?.size}
                    onChange={(e) => handleChange("size", e.target.value)}
                />
            </div>
            <CustomTextField 
                label="Price" 
                type="number"
                value={data?.price}
                onKeyDown={(e) => {
                    if (["e", "E", "+", "-",].includes(e.key)) e.preventDefault();
                }}
                onChange={(e) => handleChange("price", e.target.value)}
            />
            <CustomTextField 
                label="Stock"
                type="number"
                value={data?.stock}
                onKeyDown={(e) => {
                    if (["e", "E", "+", "-", "."].includes(e.key)) e.preventDefault();
                }}
                onChange={(e) => handleChange("stock", e.target.value)}
            />
            <CustomButton onClick={updateItem}>UPDATE ITEM</CustomButton>
        </div>

    </BaseModal>
}

export default UpdateItemModal
import { TextField, Autocomplete } from "@mui/material"
import BaseModal from "./BaseModal"
import { useEffect, useState } from "react"
import CustomTextField from "../CustomTextField"
import { fetchData, updateData } from "../../services/api"
import CustomButton from "../CustomButton"
import { toast } from "react-toastify"

const UpdateProductModal = ({ open, handleClose, product}) => {
    const [tags, setTags] = useState([]);
    const [data, setData] = useState({
        name: '',
        tags: [],
        image: null
    });

    useEffect(() => {
        console.log(data)
    }, [data])

    useEffect(() => {
        if(product) setData(product)
    }, [product])

    const handleTags = (e, value) => {
        setData(prev => ({ ...prev, tags: value }))
    }

    const handleCreate = async () => {
        if(!data.name) toast.error("Product name is required")
        else if(data.tags.length < 1) toast.error("Select atleast 1 tag")
        else if(!data.image) toast.error("Image is requried")
        else {
            try{
                const response = await updateData(`/api/product/${product._id}`, {
                    name: data.name,
                    tags: data.tags,
                    image: data.image
                });
                if(response.success){
                    window.location.reload();
                }
            }catch(err){
                toast.error(err.response.data.message);
            }
        }
    }

    useEffect(() => {
        const getData = async () => {
            const response = await fetchData('/api/tag');
            setTags(response.tags.map(tag => tag.tagName ))
        }

        getData()
    }, [])

    return <BaseModal open={open} handleClose={handleClose}>
        <div className="flex flex-col gap-8 w-[350px]">
            <h1 className="text-2xl font-bold text-[#9137db]">Create Product</h1>
            <CustomTextField 
                label="Name" 
                value={data.name}
                onChange={(e) => setData({...data, name: e.target.value})}
            />
            <Autocomplete
                onChange={handleTags}
                multiple
                limitTags={2}
                id="multiple-limit-tags"
                options={tags}
                value={data.tags}
                getOptionLabel={(option) => option}
                renderInput={(params) => (
                    <TextField {...params} label="Tags" placeholder="Select tag" />
                )}
                sx={{ width: '100%'}}
            />
            <CustomTextField 
                label="Image" 
                onChange={(e) => setData({...data, image: e.target.value})}
                placeholder="https://"
                value={data.image}
            />
            {data.image && <img className="w-24 h-24" src={data.image}/>}
            <CustomButton onClick={handleCreate}>UPDATE PRODUCT</CustomButton>
        </div>
    </BaseModal>

}

export default UpdateProductModal
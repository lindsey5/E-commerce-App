import { useState } from "react"
import { postData } from "../../services/api"
import CustomButton from "../CustomButton"
import CustomTextField from "../CustomTextField"
import BaseModal from "./BaseModal"
import { toast } from "react-toastify";

const CreateTagModal = ({ open, handleClose}) =>{
    const [tag, setTag] = useState('');

    const handleCreate = async () => {
        if(tag){
            const response = await postData('/api/tag', { tagName: tag})

            if(response.success) window.location.reload();
        }else{
            toast.error("Tag name is required.")
        }
    }

    return <BaseModal handleClose={handleClose} open={open}>
        
        <div className="flex flex-col gap-5 w-[300px]">
            <h1 className="text-2xl font-bold">Create new tag</h1>
            <CustomTextField label="Name" value={tag} onChange={(e) => setTag(e.target.value)}/>
            <CustomButton onClick={handleCreate}>Create</CustomButton>
        </div>

    </BaseModal>
}

export default CreateTagModal
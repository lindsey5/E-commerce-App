import { useEffect, useState } from "react"
import CustomizedTable from "../components/CustomizedTable";
import { IconButton, TableRow } from "@mui/material";
import { StyledTableCell, StyledTableRow } from "../components/CustomizedTable";
import { deleteData, fetchData } from "../services/api";
import CustomButton from "../components/CustomButton";
import CreateTagModal from "../components/modals/CreateTag";
import { formatDateTime } from '../utils/utils';
import DeleteIcon from '@mui/icons-material/Delete';

const Tags = () => {
    const [tags, setTags] = useState([]);
    const [openModal, setOpenModal] = useState(false);

    useEffect(() => {
        const getData = async () => {
            const response = await fetchData('/api/tag')
            setTags(response.tags)
        }

        getData()
    }, [])

    const handleDelete = async (id) => {
        if(confirm('Are you sure you want to delete?')){
            const response = await deleteData(`/api/tag/${id}`)
            if(response.success){
                window.location.reload();
            }
        }
    }

    return <main className="pb-5 bg-gray-100 w-full h-full flex flex-col gap-6 items-center">
        <CreateTagModal open={openModal} handleClose={() => setOpenModal(close)}/>
        <div className="w-full flex justify-between bg-white p-6 border-b-1 border-gray-300">
            <h1 className="text-3xl font-bold">Tags</h1>
            <CustomButton onClick={() => setOpenModal(true)}>Add tag</CustomButton>
        </div>
        <div className="w-[95%] p-5 bg-white flex-grow rounded-md shadow-xl border-1 border-gray-300">
        <CustomizedTable 
            cols={<TableRow sx={{ position: 'sticky', top: 0, backgroundColor: 'white'}}>
                <StyledTableCell>Name</StyledTableCell>
                <StyledTableCell align="center">Number of Products</StyledTableCell>
                <StyledTableCell align="center">Created at</StyledTableCell>
                <StyledTableCell align="center">Action</StyledTableCell>
              </TableRow>}
            rows={tags.map(tag => <StyledTableRow key={tag.tagName}>
                <StyledTableCell align="left">
                  {tag.tagName}
                </StyledTableCell>
                <StyledTableCell align="center">{tag.numberOfProducts}</StyledTableCell>
                <StyledTableCell align="center">{formatDateTime(tag.createdAt)}</StyledTableCell>
                <StyledTableCell align="center">
                    <IconButton onClick={() => handleDelete(tag._id)}>
                        <DeleteIcon />
                    </IconButton>
                </StyledTableCell>
              </StyledTableRow>)}
        />
        </div>
    </main>
}

export default Tags
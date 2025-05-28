import { useEffect, useState } from "react"
import CustomizedTable from "../components/CustomizedTable";
import { Pagination, TableRow } from "@mui/material";
import { StyledTableCell, StyledTableRow } from "../components/CustomizedTable";
import CreateProductModal from "../components/modals/CreateProductModal";
import CustomButton from '../components/CustomButton';
import { fetchData } from '../services/api';
import { useNavigate } from "react-router-dom";
import { SearchField } from "../components/CustomTextField";
import { formatDateTime } from "../utils/utils";

const Products = () => {
    const [openModal, setOpenModal] = useState(false);
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const handlePage = (e, value) => {
        setPage(value)
    }

    const getData = async () => {
        const response = await fetchData(`/api/product?page=${page}&limit=20&searchTerm=${searchTerm}`);
        setProducts(response.products)
        setTotalPages(response.totalPages)
    }

    useEffect(() => {
        const fetch = setTimeout(() => {
            getData()
        }, 300)
        return () => clearTimeout(fetch)
    }, [searchTerm])

    useEffect(() => {
        getData()
    }, [page])

    return <main className="pb-5 bg-gray-100 w-full h-full flex flex-col gap-6 items-center">
        <CreateProductModal open={openModal} handleClose={() => setOpenModal(false)}/>
        <div className="w-full flex justify-between bg-white p-6 border-b-1 border-gray-300">
            <h1 className="text-3xl font-bold">Products</h1>
            <CustomButton onClick={() => setOpenModal(true)}>Create Product</CustomButton>
        </div>
        <div className="w-[95%] gap-10 min-h-0 flex flex-col p-5 bg-white flex-grow rounded-md shadow-xl border-1 border-gray-300">
            <div className="flex justify-between">
                <SearchField placeholder="Search" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
                <Pagination count={totalPages} onChange={handlePage}/>
            </div>
            <div className="min-h-0 flex-grow overflow-y-auto">
                <CustomizedTable 
                    cols={<TableRow sx={{ position: 'sticky', top: 0, backgroundColor: 'white'}}>
                        <StyledTableCell align="left">Name</StyledTableCell>
                        <StyledTableCell align="center">Tags</StyledTableCell>
                        <StyledTableCell align="center">Stock</StyledTableCell>
                        <StyledTableCell align="center">Created at</StyledTableCell>
                    </TableRow>}
                    rows={products.map(product => <StyledTableRow onClick={() => navigate(`/product/${product._id}`)} sx={{ cursor: 'pointer'}} key={product.name}>
                        <StyledTableCell align="left">
                            <div className="flex items-center gap-3">
                            <img className="w-12 h-12" src={product.image}/>
                            {product.name}
                            </div>
                        </StyledTableCell>
                        <StyledTableCell align="center">
                            {product.tags.map((tag, i) => `${tag}${i !== product.tags.length - 1 ? ", " : ""}`)}
                        </StyledTableCell>
                        <StyledTableCell align="center">{product.stock}</StyledTableCell>
                        <StyledTableCell align="center">{formatDateTime(product.createdAt)}</StyledTableCell>
                    </StyledTableRow>)}
                />
            </div>
        </div>
    </main>
}

export default Products
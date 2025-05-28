import { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { deleteData, fetchData } from "../services/api";
import { Chip, IconButton, TableRow } from "@mui/material";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import DeleteIcon from '@mui/icons-material/Delete';
import CustomizedTable from "../components/CustomizedTable";
import { StyledTableCell, StyledTableRow } from "../components/CustomizedTable";
import { SearchField } from "../components/CustomTextField";
import CustomButton from "../components/CustomButton";
import CreateItemModal from "../components/modals/CreateItem";
import UpdateItemModal from "../components/modals/UpdateItem";
import UpdateProductModal from "../components/modals/UpdateProduct";

const ProductItems = () => {
    const { id } = useParams();
    const [product, setProduct] = useState();
    const [savedItems, setSavedItems] = useState([]);
    const [showCreate, setShowCreate] = useState(false);
    const [item, setItem] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [showEditProduct, setShowEditProduct] = useState(false);

    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1)
    };

    const getProduct = async () => {
        const response = await fetchData(`/api/product/${id}`);
        if(response.success) setProduct(response.product)
        else window.location.href = "/products"
    }

    const getItems = async () => {
        const response = await fetchData(`/api/item/product/${id}`);
        if(response.success) {
            setSavedItems(response.items)
        }
    }

    const items = useMemo(() => {
        if (savedItems) {
          return savedItems.filter(item =>
            item.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.color.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.size.toLowerCase().includes(searchTerm.toLowerCase())
          );
        } else {
          return [];
        }
      }, [searchTerm, savedItems]);

    useEffect(() => {
        const getData = async () => {
            await getProduct()
            await getItems()
        }

        getData()
    }, [])

    const deleteProduct = async () => {
        if(confirm('Are you sure you want to delete?')){
            const response = await deleteData(`/api/product/${id}`)
            if(response.success){
                 handleGoBack();
            }
        }
    } 

    return <main className="pb-10 bg-gray-100 w-full h-full flex flex-col gap-6 items-center">
            <UpdateProductModal 
                handleClose={() => setShowEditProduct(false)}
                open={showEditProduct}
                product={product}
            />
            <CreateItemModal 
                handleClose={() => setShowCreate(false)} 
                open={showCreate}
                id={id}
            />
            <UpdateItemModal 
                handleClose={() => setItem(null)}
                open={item !== null}
                item={item}
            />
            <div className="w-full bg-white p-5 flex justify-between items-start border-b-1 border-gray-300">
                <div className="flex gap-10 items-center">
                    <IconButton onClick={handleGoBack}>
                        <ArrowBackIosIcon />
                    </IconButton>
                    <img  className="w-30 h-30" src={product?.image} alt="" />
                    <div>
                        <h1 className="text-2xl mb-4">{product?.name}</h1>
                        <div className="flex gap-3">
                        {product?.tags.map(tag => <Chip key={tag} label={tag} />)}
                        </div>
                    </div>
                </div>
                <div className="flex gap-5">
                    <CustomButton onClick={() => setShowEditProduct(true)}>Edit</CustomButton>
                    <CustomButton 
                        onClick={deleteProduct}
                        sx={{ backgroundColor: 'red', color: 'white'}}
                    >Delete</CustomButton>
                </div>
            </div>
            <div className="w-[95%] min-h-0 gap-10 flex flex-col p-5 bg-white flex-grow rounded-md shadow-xl border-1 border-gray-300">
                <div className="flex justify-between">
                    <SearchField placeholder="Search" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
                    <CustomButton onClick={() => setShowCreate(true)}>Add Item</CustomButton>
                </div>
                <div className="min-h-0 flex-grow overflow-y-auto">
                    <CustomizedTable 
                        cols={<TableRow sx={{ position: 'sticky', top: 0, backgroundColor: 'white'}}>
                            <StyledTableCell align="left">Product name</StyledTableCell>
                            <StyledTableCell align="center">SKU</StyledTableCell>
                            <StyledTableCell align="center">Price</StyledTableCell>
                            <StyledTableCell align="center">Color</StyledTableCell>
                            <StyledTableCell align="center">Size</StyledTableCell>
                            <StyledTableCell align="center">Stock</StyledTableCell>
                            <StyledTableCell align="center">Action</StyledTableCell>
                        </TableRow>}
                        rows={items?.map(item => <StyledTableRow key={item._id}>
                            <StyledTableCell align="left">{item.product.name}</StyledTableCell>
                            <StyledTableCell align="center">{item.sku}</StyledTableCell>
                            <StyledTableCell align="center">{item.price}</StyledTableCell>
                            <StyledTableCell align="center">{item.color}</StyledTableCell>
                            <StyledTableCell align="center">{item.size}</StyledTableCell>
                            <StyledTableCell align="center" sx={{ color: item.stock < 10 ? 'red' : ''}}>{item.stock}</StyledTableCell>
                            <StyledTableCell align="center">
                                <IconButton onClick={() => setItem(item)}>
                                    <MoreHorizIcon />
                                </IconButton>
                                <IconButton>
                                    <DeleteIcon />
                                </IconButton>
                            </StyledTableCell>
                        </StyledTableRow>)}
                    />
                </div>
        </div>
    </main>
}

export default ProductItems
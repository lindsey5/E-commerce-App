import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import { fetchData } from "../services/api";
import CustomizedTable from "../components/CustomizedTable";
import { StyledTableCell, StyledTableRow } from "../components/CustomizedTable";
import { SearchField } from "../components/CustomTextField";
import { Pagination, TableRow, IconButton, Tooltip } from "@mui/material";
import { formatDateTime } from "../utils/utils";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import EditOrder from "../components/modals/EditOrder";

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [order, setOrder] = useState(null);

    const getOrders = async () => {
        const response = await fetchData(`/api/order?limit=100&page=${page}&searchTerm=${searchTerm}`)
        if(response.success) {
            setOrders(response.orders)
            console.log(response.orders)
            setTotalPages(response.totalPages)
        }
    }

    useEffect(() => {
        const fetch = setTimeout(() => {
            getOrders()
        }, 300)
        return () => clearTimeout(fetch)
    }, [searchTerm])

    const handlePage = (e, value) => {
        setPage(value)
    }

    return <main className="pb-5 bg-gray-100 w-full h-full flex flex-col gap-6 items-center">
        <EditOrder handleClose={() => setOrder(null)} order={order}/>
        <div className="w-full flex justify-between bg-white p-6 border-b-1 border-gray-300">
            <h1 className="text-3xl font-bold">Orders</h1>
        </div>
        <div className="w-[95%] gap-10 min-h-0 flex flex-col p-5 bg-white flex-grow rounded-md shadow-xl border-1 border-gray-300">
            <div>
                <SearchField placeholder="Search" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
            </div>
            <div className="min-h-0 flex-grow">
                <CustomizedTable 
                    cols={<TableRow sx={{ position: 'sticky', zIndex: 10, top: 0, backgroundColor: 'white'}}>
                        <StyledTableCell align="left">Order ID</StyledTableCell>
                        <StyledTableCell align="left">Order by</StyledTableCell>
                        <StyledTableCell align="center">Status</StyledTableCell>
                        <StyledTableCell align="center">Product name</StyledTableCell>
                        <StyledTableCell align="center">SKU</StyledTableCell>
                        <StyledTableCell align="center">Size</StyledTableCell>
                        <StyledTableCell align="center">Color</StyledTableCell>
                        <StyledTableCell align="center">Address</StyledTableCell>
                        <StyledTableCell align="center">ZIP</StyledTableCell>
                        <StyledTableCell align="center">City</StyledTableCell>
                        <StyledTableCell align="center">Quantity</StyledTableCell>
                        <StyledTableCell align="center">Total Price</StyledTableCell>
                        <StyledTableCell align="center">Order Date</StyledTableCell>
                        <StyledTableCell align="center">Action</StyledTableCell>
                    </TableRow>}
                    rows={orders.map(order => <StyledTableRow key={order._id}>
                        <StyledTableCell align="left">{order.order_id}</StyledTableCell>
                        <StyledTableCell align="left">{order.firstname} {order.lastname}</StyledTableCell>
                        <StyledTableCell align="center">{order.status}</StyledTableCell>
                        <StyledTableCell align="center">{order.product.name}</StyledTableCell>
                        <StyledTableCell align="center">{order?.item.sku}</StyledTableCell>
                        <StyledTableCell align="center">{order.size}</StyledTableCell>
                        <StyledTableCell align="center">{order.color}</StyledTableCell>
                        <StyledTableCell align="center">{order.address}</StyledTableCell>
                        <StyledTableCell align="center">{order.zip}</StyledTableCell>
                        <StyledTableCell align="center">{order.city}</StyledTableCell>
                        <StyledTableCell align="center">{order.quantity}</StyledTableCell>
                        <StyledTableCell align="center">{order.quantity * order.price}</StyledTableCell>
                        <StyledTableCell align="center">{formatDateTime(order.createdAt)}</StyledTableCell>
                        <StyledTableCell align="center">
                            <Tooltip title="Edit" arrow placement="top">
                                <IconButton onClick={() => setOrder(order)}>
                                <MoreHorizIcon />
                            </IconButton>
                            </Tooltip>
                        </StyledTableCell>
                    </StyledTableRow>)}
                />
            </div>
            <div className="flex justify-end">
                <Pagination count={totalPages} onChange={handlePage}/>
            </div>
        </div>

    </main>
}

export default Orders
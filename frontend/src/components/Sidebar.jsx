import DashboardIcon from '@mui/icons-material/Dashboard';
import StoreIcon from '@mui/icons-material/Store';
import SidebarButton from './SidebarButton';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useLocation, useNavigate } from 'react-router-dom';
import StorefrontIcon from '@mui/icons-material/Storefront';

const Sidebar = () => {
    const pathname = useLocation().pathname;
    const navigate = useNavigate();

    return <aside className="bg-[#1f2536] fixed index-y-0 left-0 flex flex-col gap-2 fixed border-r-1 border-gray-300 inset-y-0 px-2 py-4">
        <div className='font-bold flex items-center gap-3 mb-4 text-white'>
            <StorefrontIcon sx={{ fontSize: '40px'}}/>
            <h1 className='text-lg'>E-Commerce</h1>
        </div>
        <SidebarButton 
            sx={{ ...pathname === '/' && { color: 'white'}}}
            onClick={() => navigate('/')}
        >
            <DashboardIcon sx={{ fontSize: '25px' }}/>Dashboard
        </SidebarButton>
        <SidebarButton 
            sx={{ ...pathname === '/products' && { color: 'white'}}}
            onClick={() => navigate('/products')}
        >
            <StoreIcon sx={{ fontSize: '25px' }}/>Products
        </SidebarButton>
        <SidebarButton 
            sx={{...pathname === '/tags' && { color: 'white'}}}
            onClick={() => navigate('/tags')}
        >
           <LocalOfferIcon sx={{ fontSize: '25px' }}/> Tags
        </SidebarButton>
        <SidebarButton 
            sx={{...pathname === '/orders' && { color: 'white'}}}
            onClick={() => navigate('/orders')}
        >
           <ShoppingCartIcon sx={{ fontSize: '25px' }}/> Orders
        </SidebarButton>
        
    </aside>
}

export default Sidebar
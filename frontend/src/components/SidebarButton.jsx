import { Button } from "@mui/material"

const SidebarButton = ({ icon, sx, ...props}) => {
    return <Button 
            fullWidth 
            sx={[{
                width: '200px', 
                color: '#6e6e6e', 
                fontWeight: 'bold', 
                textTransform: 'none', 
                justifyContent: 'flex-start',
                gap: 1,
                borderRadius: '10px',
                fontSize: '16px',
                paddingLeft: '10px',
                ":hover": {
                    color: 'white'
                }
                }, 
                sx]}
            {...props}
    />
}

export default SidebarButton
import { Button } from "@mui/material"

const CustomButton = ({ sx, ...props }) => {
    return <Button
        sx={[{ 
        textTransform: 'none', 
        backgroundColor: '#9137db', 
        color: "white",
        ":hover": {
            opacity: 0.5
        },
        
    }, sx]}
    {...props}
   />
 
}

export default CustomButton
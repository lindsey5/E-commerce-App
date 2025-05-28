import { TextField } from "@mui/material";

export const SearchField = ({ sx, ...props}) => {
    return <TextField 
        sx={{
            '& .MuiInputLabel-root': {
                    '&.Mui-focused': {
                        color: '#9137db', 
                    },
                },
            '& .MuiOutlinedInput-root': {
                borderRadius: '15px',
                height: '35px',
                '&:hover fieldset': {
                    borderColor: '#9137db', 
                },
                '&.Mui-focused fieldset': {
                    borderColor: '#9137db',
                },
            },
            ...sx
        }}
        {...props}
    />
}

const CustomTextField = ({ sx, ...props }) => {

    return <TextField 
                sx={{
                    '& .MuiInputLabel-root': {
                            '&.Mui-focused': {
                                color: '#9137db', 
                            },
                        },
                    '& .MuiOutlinedInput-root': {
                        '&:hover fieldset': {
                            borderColor: '#9137db', 
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: '#9137db',
                        },
                    },
                    ...sx
                }}
                {...props}
        />
}

export default CustomTextField
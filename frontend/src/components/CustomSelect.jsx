import { FormControl, Select, MenuItem, InputLabel } from "@mui/material"

const CustomSelect = ({ label, value, onChange, items, width, height}) => {

    return <FormControl sx={{ width, height}}>
        <InputLabel 
            id="demo-select-small-label"
            sx={{
                '&.Mui-focused': {
                    color: '#9137db'
                },
            }}
        >{label}</InputLabel>
            <Select
                fullWidth
                labelId="demo-select-small-label"
                id="demo-select-small"
                value={value}
                label="Category"
                onChange={onChange}
                sx={{
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#9137db' 
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#9137db', 
                      borderWidth: '2px'
                    }
                  }}
            >
            {items.map(item => <MenuItem value={item}>{item}</MenuItem>)}
        </Select>
    </FormControl>
}

export default CustomSelect
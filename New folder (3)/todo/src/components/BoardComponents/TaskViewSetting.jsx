import React from 'react'
import {
  Popover,
  Box,
  Typography,
  Divider,
  IconButton,
  Button,
  Select,
  Checkbox,
  MenuItem,
  FormControl,
  ListItemText,
  InputLabel,
  OutlinedInput
} from "@mui/material"
const names = [
  'Compact',
  'Default',
  'Detailed',
];

export default function BoardViewSetting() {
  const [personName, setPersonName] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };
  return (
    <Box sx={{
      display: "flex",
      flexDirection: 'row',
      width: "100%",
      justifyContent: "space-between",
      mt: 1,
    }}>
      <Typography fontFamily="Poppins" fontWeight="500" fontSize="14px" sx={{ width: "100%" }}>Task View</Typography>
      <Select
        size='small'
        variant='outlined'
        fullWidth
        labelId="demo-multiple-checkbox-label"
        id="demo-multiple-checkbox"
        value={personName}
        onChange={handleChange}
        renderValue={(selected) => selected.join(', ')}
        sx={{
          m: 0,
          p: 0,
          "&:label": {
            color: "#fff"
          },
          ".MuiSelect-outlined": {
            border: '1px solid rgb(64 64 64)',
            m: 0,
            p: 0,
          },
        }}
      >
        {names.map((name) => (
          <MenuItem key={name} value={name}>
            <Checkbox checked={personName.indexOf(name) > -1} />
            <ListItemText primary={name} />
          </MenuItem>
        ))}
      </Select>
    </Box>
  )
}

import React from 'react'
import {
  Box,
  Typography,
  Divider,
  IconButton,
  Select,
  Checkbox,
  MenuItem,
  FormControl,
  ListItemText,
  InputLabel,
  OutlinedInput
} from "@mui/material"
const names = [
  'List',
  'Cards',
  'Roadmap'
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
      justifyContent: "space-between"
    }}>
      <Typography fontFamily="Poppins" fontWeight="500" fontSize="14px" sx={{ width: "100%" }}>Board View</Typography>
      <Select
        size='small'
        variant='outlined'
        fullWidth
        labelId="demo-multiple-checkbox-label"
        id="demo-multiple-checkbox"
        value={personName}
        onChange={handleChange}
        sx={{
          "&:label": {
            color: "#fff"
          },
          ".MuiSelect-outlined": {
            border: '1px solid rgb(64 64 64)',
            pt: '2px',
            pb: '2px',
            pr: "2px",
            fontFamily: "Poppins",
            fontSize: "14px"
          },
        }}
      >
        {names.map((name) => (
          <MenuItem
            key={name}
            value={name}
            disableGutters
            sx={{
              color: 'red',
            }}>
            <Checkbox checked={personName.indexOf(name) > -1} />
            <ListItemText primary={name} />
          </MenuItem>
        ))}
      </Select>
    </Box>
  )
}

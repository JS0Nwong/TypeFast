import { useContext, useState } from 'react'
import {
    Box,
    Button,
    Dialog,
    DialogTitle,
    List,
    TextField,
    DialogContent,
    InputAdornment,
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';

import ThemeButton from './ThemeButton';
import { ThemeContext } from '../hooks/useTheme';
import { useSearch } from "../hooks/useSearch"

import { themes } from "../static/themes/themes.json"

export default function ThemeModal({ open, onClose }) {
    const [search, setSearch] = useState('')
    const [searchData, setSearchData] = useState(null)

    const keys = Object.keys(themes)
    const { toggleTheme } = useContext(ThemeContext)
    const { searchByQuery, searchByFilter } = useSearch()

    const handleSearchByQuery = (query) => {
        setSearch(query)
        setSearchData(searchByQuery(query, themes))
    }

    const handleSearchByFilter = (query) => {
        query === 'all' 
        ? setSearchData(null) 
        : setSearchData(searchByFilter(query, themes))
    }

    return (
        <Dialog
            onClose={onClose}
            open={open}
            sx={{
                height: "100%"
            }}
        >
            <DialogTitle>themes</DialogTitle>
            <DialogContent sx={{ height: "100%", mb: -2 }}>
                <TextField
                    autoComplete='off'
                    InputProps={{
                        startAdornment:
                            <InputAdornment position="start" >
                                <SearchIcon />
                            </InputAdornment>
                    }}
                    fullWidth
                    placeholder='search for a theme'
                    onChange={(e) => handleSearchByQuery(e.target.value)}
                />
                <Box sx={{
                    display: "flex",
                    flexDirection: "row",
                    mt: 1,
                    justifyContent: 'space-between'
                }}>
                    <Box sx={{ display: "flex", flexDirection: "row" }}>
                    <Button
                            variant='text'
                            sx={{
                                mr: 1,
                                p: 0,
                                minHeight: 0,
                                minWidth: 0,
                            }}
                            onClick={() => handleSearchByFilter('all')}
                        >all</Button>
                        <Button
                            variant='text'
                            sx={{
                                mr: 1,
                                p: 0,
                                minHeight: 0,
                                minWidth: 0,
                            }}
                            onClick={() => handleSearchByFilter('dark')}
                        >dark</Button>
                        <Button
                            variant='text'
                            sx={{
                                m: 0,
                                p: 0,
                                minHeight: 0,
                                minWidth: 0,
                            }}
                            onClick={() => handleSearchByFilter('light')}
                        >light</Button>

                    </Box>
                    <Button
                        variant='text'
                        sx={{
                            m: 0,
                            p: 0,
                            minHeight: 0,
                            minWidth: 0,
                        }}
                    >custom</Button>
                </Box>
            </DialogContent>
            <List sx={{
                height: "500px",
                overflowY: 'scroll'
            }}>
                {searchData !== null ? searchData.map((theme, index) =>
                    <ThemeButton theme={theme} key={index} />
                ) :
                    keys.map((theme, index) =>
                        <ThemeButton theme={theme} key={index} />
                    )
                }
            </List>
        </Dialog>
    )
}

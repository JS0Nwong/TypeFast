import { useContext, useState, useCallback } from 'react'
import {
    Box,
    Button,
    Dialog,
    DialogTitle,
    List,
    TextField,
    DialogContent,
    InputAdornment,
    Pagination
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import FontButton from './FontButton';
import { useSearch } from "../hooks/useSearch"

import chunk from "lodash/chunk"
import debounce from "lodash/debounce"

import * as fonts from "../static/fonts/fonts.json"

export default function FontModal({ open, onClose }) {
    const [searchData, setSearchData] = useState(null)
    const [fontsData, setFontsData] = useState(fonts.default)
    const [chunkSize, setChunkSize] = useState(100)
    const [renderLimit, setRenderLimit] = useState(chunk(fontsData, chunkSize))
    const [currentPage, setCurrentPage] = useState(0)
    const [filters, setFilters] = useState([])
    const fontTypes = ['serif', 'display', 'sans-serif', 'handwriting', 'monospace']

    const { searchFonts, searchFontsByFilter } = useSearch()

    const handleSearchByFilter = (query) => {
        if(filters.includes(query)) {
            const arr = filters.filter(font => font !== query)
            setFilters(arr)
            console.log(filters)
        } else {
            filters.push(query)
            console.log(filters)

        }
        // filters.includes(query) === true
        //     ? filters.filter((filter) => filter !== query)
        //     : filters.push(query)
        // console.log(filters)
        setSearchData(searchFontsByFilter(filters))
    }



    const handleSearch = (query) => {
        query.trim() !== "" ? setSearchData(searchFonts(query)) : setSearchData(null)
    }

    const searchDebounce = useCallback(debounce(handleSearch, 500), [])

    const handleChunkValueChange = (value) => {
        setChunkSize(value)
    }

    const handlePageChange = (e, value) => {
        setCurrentPage(value - 1)
    }

    return (
        <Dialog
            onClose={onClose}
            open={open}
            sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                width: "100%"
            }}
        >
            <DialogTitle>fonts</DialogTitle>
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
                    placeholder='search for a font'
                    onChange={(e) => searchDebounce(e.target.value)}
                />
                <Box sx={{ display: "flex", flexDirection: "row", mt: 1 }}>
                    {fontTypes.map((type) =>
                        <Button
                            key={type}
                            variant='text'
                            sx={{
                                mr: 1,
                                minHeight: 0,
                                minWidth: 0,
                                opacity: filters.includes(type) ? 1 : 0.55
                            }}
                            onClick={() => handleSearchByFilter(type)}
                        >{type}</Button>
                    )}
                </Box>
            </DialogContent>

            <List sx={{
                height: "500px",
                overflowY: 'scroll',
            }}>
                {
                    searchData !== null ?
                        searchData.map((font, index) =>
                            <FontButton
                                key={index}
                                fontName={font.family}
                            />
                        )
                        : renderLimit[currentPage].map((font, index) =>
                            <FontButton
                                key={index}
                                fontName={font.family}
                            />
                        )
                }
            </List>

            <Box
                sx={{
                    width: "100%",
                    display: 'flex',
                    justifyContent: "space-between",
                    p: 2,
                }}
            >
                <Box sx={{ display: 'flex', flexDirection: "row", ml: 1, }}>
                    {Array.from({ length: 4 }).map((_, index) =>
                        <Button
                            key={index}
                            variant='text'
                            sx={{
                                mr: 1,
                                minHeight: 0,
                                minWidth: 0,
                                opacity: chunkSize === (index + 1) * 25 ? "1" : "0.55"
                            }}
                            onClick={() => handleChunkValueChange((index + 1) * 25)}
                        >{(index + 1) * 25}
                        </Button>
                    )}
                </Box>
                <Pagination
                    onChange={handlePageChange}
                    count={renderLimit.length}
                    variant="outlined"
                    shape="rounded"
                    sx={{
                        width: "100%",
                        display: 'flex',
                        justifyContent: "end",
                    }}
                />
            </Box>

        </Dialog>
    )
}

import React from 'react'
import {
    Box,
    Typography,
    Chip,
    Link,
    Divider
} from "@mui/material"
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import ImageMarquee from './ImageMarquee';
import { useSearchParams } from 'react-router-dom';

export default function WorksTab({ data, number, opened }) {
    const [expanded, setExpanded] = React.useState(opened)
    const [searchParams, setSearchParams] = useSearchParams()

    const handleExpanded = () => {
        if (searchParams.has('name')) {
            if (searchParams.get('name').toLowerCase() === data.name.toString().toLowerCase()) {

                searchParams.delete('name');
                setSearchParams({ });
                setExpanded(!expanded)

            }
            else {
                searchParams.delete('name');
                setSearchParams({
                    name: data.name.toString()
                });
                setExpanded(!expanded)
            }
        }
        else {
            setSearchParams({
                name: data.name.toString()
            })
        }
        setExpanded(!expanded)
    }

    return (
        <>
            <Box 
                className="works-top-border"
                sx={{
                    position: "relative",
                    p: 2,
                }}>
                <Typography
                    fontFamily="Fira Code"
                    fontWeight="500"
                    fontSize="2rem"
                >
                    {data.name}
                </Typography>
                <Box sx={{
                    display: "flex",
                    flexDirection: "column"
                }}>
                    <Typography
                        fontFamily="Fira Code"
                        fontWeight="500"
                        sx={{
                            color: "rgba(255, 255, 255, 0.45)"
                        }}
                    >
                        {data.date}
                    </Typography>
                </Box>

                {/* MORE INFORMATION */}
                {expanded && <Box sx={{
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                    mt: 2,
                }}>
                    {/* IMAGE GALLERY */}

                    <ImageMarquee images={data.images}/>

                    <Chip
                        label="About"
                        variant='outlined'
                        sx={{
                            ".MuiChip-label": {
                                fontFamily: "Fira Code",
                                color: "rgba(255, 255, 255, 0.45)",
                            },
                            "&.MuiChip-outlined": {
                                border: "1px solid rgba(255, 255, 255, 0.2)",
                            },
                            width: 'min-content',
                            mt: 2,
                        }}
                    />

                    <Typography
                        fontFamily="Fira Code"
                        fontWeight="500"
                        sx={{
                            color: "rgba(255, 255, 255, 1)",
                            mt: 2,
                        }}
                    >
                        {data.description}
                    </Typography>

                    <Chip
                        label="Tech Stack"
                        variant='outlined'
                        sx={{
                            ".MuiChip-label": {
                                fontFamily: "Fira Code",
                                color: "rgba(255, 255, 255, 0.45)",
                            },
                            "&.MuiChip-outlined": {
                                border: "1px solid rgba(255, 255, 255, 0.2)",
                            },
                            width: 'min-content',
                            mt: 2,
                        }}
                    />
                    <Typography
                        fontFamily="Fira Code"
                        fontWeight="500"
                        sx={{
                            color: "rgba(255, 255, 255, 0.45)",
                            mt: 2,
                        }}
                    >
                        {data.tech_stack}
                    </Typography>
                    <Divider 
                        sx={{
                            background: "rgba(255, 255, 255, 0.3)",
                            mt: 3
                        }}
                    />
                </Box>}

                <Box sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    mt: 2,
                }}>
                    <Link href={data.website}>
                        <Chip
                            label="Website"
                            variant='outlined'
                            clickable
                            icon={<ArrowOutwardIcon />}
                            sx={{
                                mr: 2,
                                ".MuiChip-label": {
                                    fontFamily: "Fira Code",
                                    color: "rgba(255, 255, 255, 0.45)",
                                },
                                "&.MuiChip-outlined": {
                                    border: "1px solid rgba(255, 255, 255, 0.2)",
                                },
                            }}

                        />
                    </Link>

                    <Chip
                        label= {expanded ? "Show Less" : "More Info"}
                        variant='outlined'
                        clickable
                        icon={expanded ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon />}
                        sx={{
                            ".MuiChip-label": {
                                fontFamily: "Fira Code",
                                color: "rgba(255, 255, 255, 0.45)",
                            },
                            "&.MuiChip-outlined": {
                                border: "1px solid rgba(255, 255, 255, 0.2)",
                            },
                        }}
                        onClick={() => handleExpanded()}
                    />

                </Box>
                <Typography
                    fontFamily="Fira Code"
                    fontWeight="500"
                    fontSize="3rem"
                    sx={{
                        position: "absolute",
                        top: 0,
                        right: 20,
                        color: '#EEFC57'
                    }}
                >
                    {number + 1}
                </Typography>
            </Box>
        </>
    )
}

import { useState, useRef } from 'react'
import { useNavigate } from "react-router-dom";
import { Card, CardActionArea, CardContent, Box, Typography, IconButton } from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert';

import CardPopover from './CardPopover';

export default function BoardListCard({ data, id }) {
    const [openPopover, setOpenPopover] = useState(false)
    const [anchorEl, setAnchorEl] = useState(null)

    const navigate = useNavigate()

    const anchor = useRef()

    const onClose = (e) => {
        e.stopPropagation()
        setOpenPopover(!openPopover)
        setAnchorEl(anchor.current)
    }

    return (
        <>
            <Card sx={{
                background: `rgba(${data.color.replace(/['"]+/g, '')}, 0.15)`,
                border: `1px solid rgb(${data.color})`,
                width: { xs: "100%", md: "200px" },
                mt: { xs: 1, md: 0 },
                mb: { xs: 1, md: 0 },
                m: { md: 1 },
                cursor: 'pointer',
                '&:hover': {
                    background: `rgba(${data.color.replace(/['"]+/g, '')}, 0.35)`,
                },
                '&:first-of-type': {
                    mt: { xs: 2, md: 0 },
                    m: { md: 1 },
                },
            }}
                onClick={() => navigate(`/boards/${data.id}`)}
            >
                <CardContent sx={{
                    color: "white",
                    display: "flex",
                    flexDirection: "column",
                    position: 'relative'
                }}>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: "space-between",
                        width: '100%'
                    }}>
                        <Typography
                            fontWeight="500"
                            fontSize="1.3rem"
                            fontFamily="Poppins"
                            sx={{
                                textOverflow: "ellipsis",
                                maxWidth: '100%',
                                overflow: "hidden"
                            }}
                        >{data.name}
                        </Typography>
                        <IconButton
                            aria-label="close"
                            onClick={(e) => onClose(e)}
                            sx={{

                                color: 'rgba(115, 115 ,115)',
                                m: 0,
                                p: 0,
                            }}
                            ref={anchor}
                        >
                            <MoreVertIcon />
                        </IconButton>
                    </Box>
                    
                    <Typography
                        variant='body2'
                        fontFamily="Poppins"
                        sx={{
                            textOverflow: "ellipsis",
                            maxWidth: '100%',
                            overflow: "hidden",
                            color: "rgba(255, 255, 255, 0.5)"
                        }}
                    >{data.description}
                    </Typography>
                    <Typography
                        variant='caption'
                        sx={{
                            mt: 2,
                            color: "rgba(255, 255, 255, 0.3)"
                        }}>
                        Last Modified: {data.createdAt.slice(0, 9)}
                    </Typography>

                </CardContent>
            </Card>
            {openPopover && <CardPopover 
                open={openPopover}
                onClose={() => setOpenPopover(false)}
                anchor={anchorEl}
                id={id}
            />}
        </>
    )
}

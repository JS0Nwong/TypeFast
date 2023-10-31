import React from 'react'
import Marquee from "react-fast-marquee"
import { Box, Typography, Skeleton } from "@mui/material"

export default function ImageMarquee({ images }) {
    
    const [loading, setLoading] = React.useState(true)

    return (
        <Marquee
            speed={150}
            pauseOnHover={true}
            style={{
                cursor: "grab",
                minHeight: "100%",
            }}
        >
            {
                images.image.map((image, key) => (
                    <div className='image-wrapper' key={key}>
                        {image == undefined || null ?
                            <Skeleton
                                variant="rectangular"
                                height="100%"
                                width="100%"
                            />
                            :
                            <img
                                src={image}
                                className="marquee-image"
                            />
                        }
                    </div>
                ))
            }
            <Box sx={{
                minHeight: "100%",
                width: "100%",
                background: "#0A0A0A",
                display: "flex",
                alignItems: " center",
                justifyContent: "center",
            }}>
                <Typography
                    sx={{
                        fontSize: '3rem',
                        minHeight: '100%',
                        width: "100%",
                    }}
                >
                    🦄
                </Typography>
            </Box>
        </Marquee>
    )
}

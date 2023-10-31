import React from 'react'
import { Box, Typography, Chip, IconButton, Link, Button } from "@mui/material"
import MarqueeText from './components/Marquee'
import Preloader from './components/Preloader'
import CanvasContainer from "../src/CanvasContainer"
import WorksButtonMobile from './components/WorksButtonMobile'
import transition from './components/Transition'

import FaceIcon from '@mui/icons-material/Face';
import CodeIcon from '@mui/icons-material/Code';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import { RiSpyLine, RiCodeSSlashFill } from "react-icons/ri/index"
import Resume from "./assets/Resume.pdf"

import { motion } from 'framer-motion'

const staggerVariants = {
    initial: {
        opacity: 0,
        x: -100,
    },
    animate: (index) => ({
        opacity: 1,
        x: 0,
        transition: {
            delay: 0.02 * index
        },
        duration: 1,
        ease: "easeOut",
    })
}

const staggerHeading = {
    initial: {
        opacity: 0
    },
    animate: (index) => ({
        opacity: 1,
        transition: {
            delay: 0.02 * index
        }
    })

}

const fadeIn = {
    initial: {
        opacity: 0
    },
    animate: {
        opacity: 1,
        transition: {
            delay: 1
        },
        ease: "easeIn",
    }
}

const links = [
    {
        type: 'CV',
        link: Resume,
    },
    {
        type: 'LinkedIn',
        link: 'https://www.linkedin.com/in/jason-wong-/',
    },
    {
        type: 'Github',
        link: 'https://github.com/JS0Nwong',
    },
    {
        type: 'Email',
        link: 'mailto:JasonWong47@myhunter.cuny.edu',
    },
]

const works = [
    {
        name: 'SchoolsDB',
        link: '/works',
    },
    {
        name: 'Pokedex',
        link: '/works',
    },
]

function Home() {
    const [expanded, setExpandAboutMe] = React.useState(false)

    return (
        // <Box>
        //     {loading ? <Preloader 
        //         loading={loading} 
        //         updateLoading={(bool) => setLoading(bool)}
        //         />
        //         :
        <Box>
            <CanvasContainer />

            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    p: 2,
                    maxWidth: {
                        xs: "100%",
                        md: "30%",
                    },
                    height: "100%",
                    zIndex: 99,
                }}
            >
                <Box
                    component={motion.div}
                    variants={staggerVariants}
                    initial='initial'
                    whileInView='animate'
                    custom={20}
                >
                    <Box
                        className="glass-morphism scale"
                        sx={{
                            height: "100%",
                            p: 2,
                            display: "flex",
                            flexDirection: "row",
                            flexWrap: 'wrap',
                            cursor: "pointer",
                        }}
                    >
                        <Typography
                            fontFamily="Fira Code"
                            fontWeight="300"
                        >
                            <span className='about-hover'>
                                <FaceIcon sx={{ fontSize: ".9rem", mr: 0.5 }} />Jason Wong<span>&nbsp;</span>
                            </span>
                        </Typography>
                        <Typography
                            fontFamily="Fira Code"
                            fontWeight="300"
                        >
                            is a<span>&nbsp;</span>
                        </Typography>
                        <Typography
                            fontFamily="Fira Code"
                            fontWeight="300"
                        >
                            <span className='about-hover'>
                                <CodeIcon sx={{ fontSize: ".9rem", mr: 0.5 }} />Software Engineer <span>&nbsp;</span>
                            </span>
                        </Typography>
                        <Typography
                            fontFamily="Fira Code"
                            fontWeight="300"
                        >
                            <span>based in</span>
                        </Typography>
                        <span>&nbsp;</span>
                        <Typography
                            fontFamily="Fira Code"
                            fontWeight="300"
                        >
                            <span className='about-hover'>
                                <LocationOnIcon sx={{ fontSize: ".9rem", mr: 0.5 }} /> New York City
                                <span style={{
                                    color: "white",
                                    fontFamily: "Fira Code",
                                    fontWeight: 100,
                                }}>,&nbsp;</span>NY
                            </span>
                        </Typography>

                        <Typography
                            fontFamily="Fira Code"
                            fontWeight="300"
                            sx={{
                                mt: 1,
                                display: expanded ? 'block' : 'none'
                            }}
                        >

                            I'm Jason, a recent graduate from <span className='more-hover'>CUNY Hunter College</span> passionate about web development and software engineering.
                            I'm always looking to expand my network, so feel free to connect with me on <span className='more-hover'>Github</span> or <span className='more-hover'>LinkedIn</span>!

                            <br />

                            I currently have 5 years experience with
                            <span className='more-hover'> HTML/CSS</span>, <span className='more-hover'>JavaScript</span>, <span className='more-hover'>React.js</span> and <span className='more-hover'>C++</span> as a developer,
                            but I would love to work with other langauges and softwares!
                            <br />

                            I'm always looking for
                            cool stuff to work on. Got a cool idea?
                            Contact me!

                        </Typography>

                        <IconButton
                            className='animated-down'
                            sx={{
                                m: 0,
                                p: 0,
                                position: 'absolute',
                                bottom: 15,
                                right: 20,
                            }}
                            onClick={() => setExpandAboutMe(!expanded)}
                        >
                            {expanded ? <KeyboardDoubleArrowUpIcon sx={{
                                color: "#EEFC57"
                            }} /> : <KeyboardDoubleArrowDownIcon sx={{
                                color: "#EEFC57"
                            }} />}
                        </IconButton>
                    </Box>
                </Box>

                <Typography
                    component={motion.p}
                    fontFamily="Fira Code"
                    fontWeight="500"
                    sx={{
                        mt: 2,
                        color: 'rgba(255, 255, 255, 0.5)',
                        zIndex: 2
                    }}
                    variants={staggerHeading}
                    initial='initial'
                    whileInView='animate'
                    custom={25}
                >Current
                </Typography>
                <Box
                    component={motion.div}
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        mt: 1,
                    }}
                    variants={staggerVariants}
                    initial='initial'
                    whileInView='animate'
                    custom={30}
                >
                    <Box
                        className="glass-morphism-card scale code-background"
                        sx={{
                            p: 2,
                            width: {
                                xs: "100%",
                                md: "240px"
                            },
                            position: "relative",
                            mr: 1,
                        }}
                    >
                        <Typography
                            fontFamily="Fira Code"
                            fontWeight="400"
                            sx={{
                                cursor: 'crosshair'
                            }}
                        >Software Engineer
                        </Typography>
                        <Typography
                            fontFamily="Fira Code"
                            fontWeight="300"
                            sx={{
                                color: "rgba(255, 255, 255, 0.4)"
                            }}
                        >for the people</Typography>
                        <RiCodeSSlashFill style={{
                            fontSize: "5rem",
                            color: "rgba(255, 255, 255, 0.3)",
                            position: "absolute",
                            bottom: 5,
                            right: 5,
                        }} />
                    </Box>

                    <Box
                        className="glass-morphism-card scale"
                        sx={{
                            p: 2,
                            width: {
                                xs: "100%",
                                md: "240px"
                            },
                            ml: 1,
                        }}
                    >
                        <Typography
                            fontFamily="Fira Code"
                            fontWeight="400"
                            sx={{
                                cursor: 'crosshair'
                            }}
                        >Software Engineer
                        </Typography>
                        <Typography
                            fontFamily="Fira Code"
                            fontWeight="300"
                            sx={{
                                color: "rgba(255, 255, 255, 0.4)"
                            }}
                        >for ?</Typography>
                        <RiSpyLine style={{
                            fontSize: "5rem",
                            color: "rgba(255, 255, 255, 0.3)",
                            position: "absolute",
                            bottom: 5,
                            right: 5,
                        }}
                        />
                    </Box>
                </Box>

                <Typography
                    component={motion.p}
                    fontFamily="Fira Code"
                    fontWeight="500"
                    sx={{
                        mt: 2,
                        color: 'rgba(255, 255, 255, 0.5)',
                        zIndex: 2
                    }}
                    variants={staggerHeading}
                    initial='initial'
                    whileInView='animate'
                    custom={35}
                >Interests
                </Typography>
                <Box
                    component={motion.div}
                    sx={{
                        display: 'flex',
                        flexDirection: "column",
                        zIndex: 1,
                    }}
                    variants={staggerVariants}
                    initial='initial'
                    whileInView='animate'
                    custom={40}
                >
                    <MarqueeText />
                </Box>

                <Typography
                    component={motion.p}
                    fontFamily="Fira Code"
                    fontWeight="500"
                    sx={{
                        mt: 2,
                        color: 'rgba(255, 255, 255, 0.5)',
                        zIndex: 2
                    }}
                    variants={staggerHeading}
                    initial='initial'
                    whileInView='animate'
                    custom={45}
                >Works & Projects
                </Typography>

                <Box
                    component={motion.div}
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        flexWrap: 'wrap',
                    }}
                    variants={staggerVariants}
                    initial='initial'
                    whileInView='animate'
                    custom={50}
                >
                    {works.map((work, key) => (
                        <Link href="/works" className="works-margin" key={key}>
                            <Chip
                                label={work.name}
                                className='works-chip'
                                clickable
                                sx={{
                                    "&:hover" :{
                                        background: "rgba(0, 0, 0, 0.5)",
                                    }
                                }}
                            />
                        </Link>
                    ))}
                </Box>


                <Typography
                    component={motion.p}
                    fontFamily="Fira Code"
                    fontWeight="500"
                    sx={{
                        mt: 2,
                        color: 'rgba(255, 255, 255, 0.5)',
                        zIndex: 2
                    }}
                    variants={staggerHeading}
                    initial='initial'
                    whileInView='animate'
                    custom={55}
                >Links
                </Typography>

                <Box
                    component={motion.div}
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        flexWrap: 'wrap',
                    }}
                    variants={staggerVariants}
                    initial='initial'
                    whileInView='animate'
                    custom={60}
                >
                    {links.map((link, key) => (
                        <Link href={link.link} className="link-margin" key={key}>
                            <Chip
                                label={link.type}
                                className='link-chip'
                                clickable
                                size='small'
                                sx={{
                                    backgroundColor: "#EEFC57",
                                    "&:hover": {
                                        backgroundColor: "#EEFC57",
                                    },
                                }}
                            />
                        </Link>
                    ))}
                </Box>
            </Box>
            <WorksButtonMobile />
            <Typography
                component={motion.p}
                variants={fadeIn}
                initial='initial'
                whileInView='animate'
                fontFamily="Fira Code"
                fontWeight="400"
                fontSize="11px"
                sx={{
                    position: "absolute",
                    bottom: 20,
                    left: 20,
                }}
            >Last Updated: 10/4/23</Typography>
        </Box>
        //     }
        // </Box>
    )
}

export default transition(Home)
import React from 'react'
import {
    Box,
    Typography,
    IconButton,
    Link
} from "@mui/material"

import transition from './components/Transition'
import WorksTab from './components/WorksTab'
import CanvasContainer from "./CanvasContainer"

import Homepage from "./assets/schoolsdb_images/homepage.png"
import Mappage from "./assets/schoolsdb_images/mappage(1).png"
import ExpandedMapPage from "./assets/schoolsdb_images/mappage.png"
import SchoolPage from "./assets/schoolsdb_images/schoolpage.png"
import ProfilePage from "./assets/schoolsdb_images/profilepage.png"

import PokemonHomepage from "./assets/pokedex_images/pokemonhomepage.png"
import PokemonSearch from "./assets/pokedex_images/pokemonsearch.png"
import PokemonCard from "./assets/pokedex_images/pokemoncard.png"
import PokemonBio from "./assets/pokedex_images/pokemonbio.png"
import PokemonMoves from "./assets/pokedex_images/pokemonmoves.png"

import { useSearchParams } from 'react-router-dom';


const works = {
    schoolsDB: {
        name: 'SchoolsDB',
        date: "01/2023 - 05/2023",
        website: "https://schoolsdb-be6ea.web.app/",
        description: "Led a small team of 3 engineers to develop and design a React application that aggregates data about high schools in the New York City area to allow users to make informed decisions selecting which high school to go to and allowing users to review those schools.",
        tech_stack: "React.js, JS, Material UI, HTML, CSS, Google Maps API, Google Directions API, Google Firebase, Firebase Authentication, Firestore Database",
        images: {
            image: [Homepage, Mappage, ExpandedMapPage, SchoolPage, ProfilePage,],
            alt: ["the home page", "the map page", 'the card expanded map page', 'the more school information page', 'the profile page'],
        },
    },
    pokeydex: {
        name: 'Pokey.dex',
        date: "10/2021 - 10/2021",
        website: "https://js0nwong.github.io/old-portfolio/medp331/class_6_midterm/",
        description: "A lightweight vanilla JavaScript, HTML and CSS web application that uses the PokeAPI to get data about Pokemons. Fully mobile responsive with searching and filtering features.",
        tech_stack: "HTML, CSS, JS, PokeAPI",
        images: {
            image: [PokemonHomepage, PokemonSearch, PokemonCard, PokemonBio, PokemonMoves],
            alt: [],
        },
    },
}

const keys = Object.keys(works)

function Works() {
    const [searchParams] = useSearchParams()

    return (
        <>
            <Box sx={{
                background: "rgba(0, 0, 0, 1)",
                height: "100%",
                width: "100%",
                position: "absolute",
                top: 0,
                overflowY: "auto",
                backdropFilter: 'blur(100rem)'
            }}>

                <Typography
                    fontFamily="Fira Code"
                    fontSize={{
                        xs: '4rem',
                        md: "6rem",
                    }}
                    sx={{
                        pl: 2,
                        pt: 1,
                        pr: 2,
                    }}
                >Selected Works <span style={{ color: "#EEFC57" }}>({keys.length})</span>
                </Typography>

                <Link href="/">
                    <IconButton
                        className='opened'
                        sx={{
                            display: {
                                xs: 'none',
                                md: 'flex'
                            },
                            position: {
                                xs: "sticky",
                                md: 'absolute'
                            },
                            right: {
                                xs: 'none',
                                md: 20
                            },
                            top: {
                                xs: 'none',
                                md: 20
                            },
                            width: {
                                xs: '100%',
                                md: 'auto',
                            },
                            justifyContent: "flex-end",
                            p: {
                                xs: "auto",
                                md: 0,
                            },
                        }}
                    >
                        <svg width="48" height="48" viewBox="0 0 100 100">
                            <path className="line line1" d="M 20,29.000046 H 80.000231 C 80.000231,29.000046 94.498839,28.817352 94.532987,66.711331 94.543142,77.980673 90.966081,81.670246 85.259173,81.668997 79.552261,81.667751 75.000211,74.999942 75.000211,74.999942 L 25.000021,25.000058" />
                            <path className="line line2" d="M 20,50 H 80" />
                            <path className="line line3" d="M 20,70.999954 H 80.000231 C 80.000231,70.999954 94.498839,71.182648 94.532987,33.288669 94.543142,22.019327 90.966081,18.329754 85.259173,18.331003 79.552261,18.332249 75.000211,25.000058 75.000211,25.000058 L 25.000021,74.999942" />
                        </svg>
                    </IconButton>
                </Link>

                {/* Description */}
                <Typography
                    fontFamily="Fira Code"
                    fontSize="1rem"
                    sx={{
                        color: "rgba(255, 255, 255, 0.45)",
                        pl: 2,
                        pr: 2,
                        zIndex: 99,
                    }}>
                    Some of my curated works accumulated over my past years
                </Typography>
                <Box sx={{
                    display: "flex",
                    flexDirection: "column",
                    mt: 4,
                }}>
                    {keys.map((key, index) => (
                        <WorksTab
                            data={works[key]}
                            key={index}
                            number={index}
                            opened={searchParams.get('name') !== null ?
                                (key.toLowerCase() === searchParams.get('name').replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "").toLowerCase() ? true : false)
                                : false}
                        />
                    ))}
                </Box>
            </Box>
        </>
    )
}

export default transition(Works)

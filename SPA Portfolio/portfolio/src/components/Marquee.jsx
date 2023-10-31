import React from 'react'
import Marquee from "react-fast-marquee"
import { Chip } from "@mui/material"

export default function MarqueeText() {

    const interests =
    {
        subject: [
            "user interaction",
            'front end',
            'back end',
            'video games',
            'human computer interaction',
            '🦄'
        ],

        technology: [
            "git",
            "linux",
            'vs code',
            'aws',
            'gcp',
            'figma',
            'blender',
            '✨'
        ],

        languages: [
            "react",
            'javascript',
            'html',
            'css',
            'c++',
            'material ui',
            'bootstrap',
            '🎉',
        ],
    }

    return (
        <>
            <Marquee
                speed={40}
            >
                {interests.subject.map((key, index) => (
                    <Chip
                        label={key}
                        key={index}
                        className='marquee-chip'
                        sx={{
                            mr: 2,
                        }}
                    />
                ))}
            </Marquee>

            <Marquee
                speed={40}
                direction='right'
            >
                {interests.technology.map((key, index) => (
                    <Chip
                        label={key}
                        key={index}
                        className='marquee-chip'
                        sx={{
                            mr: 2,
                        }}
                    />
                ))}
            </Marquee>

            <Marquee
                speed={40}
            >
                {interests.languages.map((key, index) => (
                    <Chip
                        label={key}
                        key={index}
                        className='marquee-chip'
                        sx={{
                            mr: 2,
                        }}
                    />
                ))}
            </Marquee>
        </>
    )
}

import React from 'react'
import { styled, Box } from "@mui/material"

export default function Gutter() {
    const Gutter = styled("div", {
        name: "MuiGutter",
        overridesResolver: (props, styles) => {
            return [styles.root]
        }
    })``;
    return (
        <Gutter />
    )
}

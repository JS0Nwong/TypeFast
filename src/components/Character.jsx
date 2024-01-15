import { styled } from '@mui/material'

export default function Character({ char, className }) {
    const Character = styled("span", {
        name: "MuiSpan",
        overridesResolver: (props, styles) => {
            return [styles.root]
        }
    })``;

    return (
        <Character
            className={className}
        >
            {char}
        </Character>
    )
}
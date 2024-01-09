import { styled } from '@mui/material'

export default function Character({char, className}) {
    const Character = styled("span", {
        name: "MuiSpan",
        overridesResolver: (props, styles) => {
            return [styles.root]
        }
    })``;

    return (
        <Character className={className}>
            {char}
        </Character>
    )
}
// all characters will have a starting color of the 
// correct color and an opacity of 0.55 

// on user input, the styling will change based on 
// whether or not the user input the correct character 
// if it is the correct character the opacity will change to be 1,
// else it will change to the incorrect color and be underlined and opacity will be,
// changed to 1

// sx={{
//     color: isCorrectCharacter === undefined ? correctColor :
//         isCorrectCharacter === true ? correctColor : incorrectColor,
//     textDecoration: isCorrectCharacter === undefined ? 'none' :
//         isCorrectCharacter === true ? 'none': 'underline',
//     textDecorationColor: isCorrectCharacter === undefined ? 'none' :
//         isCorrectCharacter === true ? 'none' : incorrectColor,
//     opacity: isCorrectCharacter === undefined ? 0.55 :
//         isCorrectCharacter === true ? 1 : 0.55
// }}
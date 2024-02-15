import { styled } from '@mui/material'
import { useContext } from 'react';
import { useBoundStore } from '../../utils/stores/boundStore';
import { motion } from "framer-motion"
import { ThemeContext } from '../../hooks/useTheme';

export default function Caret() {
  const Caret = styled("div", {
    name: "MuiCaretLine",
    overridesResolver: (props, styles) => {
      return [styles.root]
    }
  })``;

  const { caretSpeedValue } = useContext(ThemeContext)

  const {
    cursorPositionLeft,
    cursorPositionTop,
    gameStatus,
  } = useBoundStore((state) => ({
    gameStatus: state.gameStatus,
    cursorPositionLeft: state.cursorPositionLeft,
    cursorPositionTop: state.cursorPositionTop,
  }))

  return (
    <motion.div
      animate={{
        x: cursorPositionLeft,
        y: cursorPositionTop + 6,
      }}
      transition={{
        type: 'keyframes',
        duration: caretSpeedValue
      }}
    >
      <Caret
        id='caret'
        sx={{
          animation: gameStatus === 'ready' ? 'none' : '1s infinite ease blinking-cursor',
          transition: "0.1s ease",
          '@keyframes blinking-cursor': {
            '0%': { opacity: 1 },
            '50%': { opacity: 0 },
            '100%': { opacity: 1 },
          },
        }} />
    </motion.div>
  )
}

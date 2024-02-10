import { styled } from '@mui/material'
import { useBoundStore } from '../utils/stores/boundStore';
import { motion } from "framer-motion"

export default function Caret() {
  const Caret = styled("div", {
    name: "MuiCaret",
    overridesResolver: (props, styles) => {
      return [styles.root]
    }
  })``;
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
        duration: 0.1
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

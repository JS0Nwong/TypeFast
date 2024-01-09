import { useCallback, useState } from 'react'

const useGameSettings = () => {
  const [textOptions, setTextOptions] = useState('')
  const [mode, setMode] = useState('time')
  const [modeOptions, setModeOptions] = useState('time')
  const [time, setTime] = useState(60)

  const changeMode = useCallback((param) => {
    setMode(param)
  }, [setMode])

  return {
    textOptions,
    mode,
    modeOptions,
    time,
    setTextOptions,
    setMode,
    changeMode,
    setModeOptions,
    setTime
  }
}

export { useGameSettings }
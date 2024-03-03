import {
    Box,
    Button,
    FormControlLabel,
    Checkbox,
    TextField,
    RadioGroup,
    Radio,
    FormLabel,
} from '@mui/material'
import { useState, useEffect } from 'react';
import useFirebase from '../../hooks/useFirebase';
import { useSearchParams } from 'react-router-dom';
import { useBoundStore } from '../../utils/stores/boundStore'

export default function LobbyGameOptions() {
    const { currentLobbyInfo, editRoomSettings } = useBoundStore()

    const {
        mode,
        setMode,
        includeNumbers,
        includePunctuation,
        customTest,
        quoteLength,
        time,
        setTime,
        wordsAmount,
        isLobbyPublic,
        maxPlayers,
        setWordsAmount,
        setIncludePunctuation,
        setIncludeNumbers,
        setLobbyMaxPlayers,
        setLobbyPublic,
    } = useBoundStore((state) => ({
        mode: state.mode,
        includeNumbers: state.includeNumbers,
        includePunctuation: state.includePunctuation,
        customTest: state.customTest,
        quoteLength: state.quoteLength,
        time: state.time,
        wordsAmount: state.wordsAmount,
        isLobbyPublic: state.isLobbyPublic,
        maxPlayers: state.maxPlayers,
        setTime: state.setTime,
        setMode: state.setMode,
        setWordsAmount: state.setWordsAmount,
        setIncludePunctuation: state.setIncludePunctuation,
        setIncludeNumbers: state.setIncludeNumbers,
        setLobbyMaxPlayers: state.setLobbyMaxPlayers,
        setLobbyPublic: state.setLobbyPublic,
    }))

    const { startGame } = useFirebase()

    const [searchParams] = useSearchParams()
    const roomID = searchParams.get('room')

    const handleGameModeChange = (e) => {
        setMode(e.target.value);
        handleEditGameSettings()
    };
    const handleTimeSettingsChange = (e) => {
        setTime(e.target.value);
        handleEditGameSettings()

    };
    const handleWordSettingsChange = (e) => {
        setWordsAmount(e.target.value)
        handleEditGameSettings()
    }

    const handleQuoteLengthChange = (e) => {
        setQuoteLength(e.target.value)
        handleEditGameSettings()
    }

    const handleIncludePunctuationChange = (e) => {
        setIncludePunctuation(e.target.checked);
        handleEditGameSettings()
    };

    const handleIncludeNumbersChange = (e) => {
        setIncludeNumbers(e.target.checked);
        handleEditGameSettings()
    };

    const handleRoomPrivacyChange = (e) => {
        setLobbyPublic(e.target.value)
        handleEditGameSettings()
    }

    const handleSetMaxPlayers = (e) => {
        setLobbyMaxPlayers(e.target.value)
        handleEditGameSettings()
    }
    const handleEditGameSettings = () => {
        editRoomSettings(roomID)
    }

    const renderSwitch = (param) => {
        switch (param) {
            case 'time':
                return (
                    <RadioGroup
                        row
                        aria-labelledby="game-mode-buttons-group-label"
                        value={time}
                        name="game-mode-buttons-group"
                        onChange={handleTimeSettingsChange}
                    >
                        <FormControlLabel value="15" control={<Radio />} label="15" />
                        <FormControlLabel value="30" control={<Radio />} label="30" />
                        <FormControlLabel value="60" control={<Radio />} label="60" />
                        <FormControlLabel value="120" control={<Radio />} label="120" />
                        <FormControlLabel value="custom" control={<Radio />} label="custom" />
                    </RadioGroup>
                )
            case 'words':
                return (
                    <RadioGroup
                        row
                        aria-labelledby="game-mode-buttons-group-label"
                        value={wordsAmount}
                        name="game-mode-buttons-group"
                        onChange={handleWordSettingsChange}
                    >
                        <FormControlLabel value="10" control={<Radio />} label="10" />
                        <FormControlLabel value="25" control={<Radio />} label="25" />
                        <FormControlLabel value="50" control={<Radio />} label="50" />
                        <FormControlLabel value="100" control={<Radio />} label="100" />
                        <FormControlLabel value="custom" control={<Radio />} label="custom" />
                    </RadioGroup>
                )
            case 'quote':
                return (
                    <RadioGroup
                        row
                        aria-labelledby="game-mode-buttons-group-label"
                        value={quoteLength}
                        name="game-mode-buttons-group"
                        onChange={handleQuoteLengthChange}
                    >
                        <FormControlLabel value="short" control={<Radio />} label="short" />
                        <FormControlLabel value="medium" control={<Radio />} label="medium" />
                        <FormControlLabel value="long" control={<Radio />} label="long" />
                        <FormControlLabel value="all" control={<Radio />} label="all" />
                        <FormControlLabel value="custom" control={<Radio />} label="custom" />
                    </RadioGroup>
                )
            default:
                return (
                    <RadioGroup
                        row
                        aria-labelledby="game-mode-buttons-group-label"
                        value={time}
                        name="game-mode-buttons-group"
                        onChange={handleTimeSettingsChange}
                    >
                        <FormControlLabel value="15" control={<Radio />} label="15" />
                        <FormControlLabel value="30" control={<Radio />} label="30" />
                        <FormControlLabel value="60" control={<Radio />} label="60" />
                        <FormControlLabel value="120" control={<Radio />} label="120" />
                        <FormControlLabel value="custom" control={<Radio />} label="custom" />
                    </RadioGroup>
                )
        }
    }
    return (
        <>
            <Box sx={{
                mt: 2,
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                mb: 4
            }}>
                <Box
                    sx={{
                        maxWidth: "100%",
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between'
                    }}>
                    <Box>
                        <FormLabel id="game-mode-buttons-group-label-group">game mode</FormLabel>
                        <RadioGroup
                            row
                            aria-labelledby="game-mode-buttons-group-label"
                            value={mode}
                            name="game-mode-buttons-group"
                            onChange={handleGameModeChange}
                        >
                            <FormControlLabel value="time" control={<Radio />} label="time" />
                            <FormControlLabel value="words" control={<Radio />} label="words" />
                            <FormControlLabel value="quote" control={<Radio />} label="quote" />
                        </RadioGroup>
                    </Box>
                    <Box sx={{ mt: 2 }}>
                        <FormLabel id="game-settings-buttons-group-label-group">game settings</FormLabel>
                        {renderSwitch(mode)}
                    </Box>
                    <Box sx={{ mt: 2 }}>
                        <FormLabel id="game-text-options-buttons-group-label-group">text options</FormLabel>

                        <Box>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={includePunctuation}
                                        onChange={handleIncludePunctuationChange}
                                    />
                                }
                                label="Include Punctuation"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={includeNumbers}
                                        onChange={handleIncludeNumbersChange}
                                    />
                                }
                                label="Include Numbers"
                            />
                        </Box>
                    </Box>
                </Box>

                {/* Second game options column  */}
                <Box
                    sx={{
                        maxWidth: "100%",
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                    }}>
                    <Box>
                        <FormLabel id="game-mode-buttons-group-label-group">room privacy</FormLabel>
                        <RadioGroup
                            row
                            aria-labelledby="game-mode-buttons-group-label"
                            value={isLobbyPublic}
                            name="game-mode-buttons-group"
                            onChange={(e) => handleRoomPrivacyChange(e)}
                        >
                            <FormControlLabel value={true} control={<Radio />} label="public" />
                            <FormControlLabel value={false} control={<Radio />} label="private" />
                        </RadioGroup>
                    </Box>
                    <Box>
                        <FormLabel id="game-mode-buttons-group-label-group">max players</FormLabel>
                        <TextField
                            InputProps={{
                                inputProps: {
                                    min: 2,
                                    max: 25,
                                },
                                disableUnderline: true,
                            }}
                            sx={{
                                ml: 1,
                                p: 0,
                                "& fieldset": { border: 'none' },
                                '& input[type=number]::-webkit-inner-spin-button': {
                                    opacity: 1,
                                }
                            }}
                            size='small'
                            variant='standard'
                            type='number'
                            value={maxPlayers}
                            max='25'
                            onChange={(e) => handleSetMaxPlayers(e)}
                        />
                    </Box>
                </Box>
            </Box>
            <Box sx={{
                width: '100%',
                display: 'flex',
                justifyContent: 'flex-end'
            }}>
                <Button sx={{ mr: 2 }}>end game</Button>
                <Button
                    variant={'contained'}
                    sx={{
                        p: 1
                    }}
                    onClick={() => startGame(roomID)}
                >
                    start game</Button>
            </Box>
        </>
    )
}

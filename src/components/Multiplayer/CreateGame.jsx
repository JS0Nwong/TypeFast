import React, { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Box,
    Button,
    FormControlLabel,
    Checkbox,
    TextField,
    MenuItem,
    RadioGroup,
    Radio,
    FormControl,
    FormLabel,
} from '@mui/material';
import { useNavigate, createSearchParams } from 'react-router-dom';

import useFirebase from '../../hooks/useFirebase';

const CreateGameDialog = ({ open, onClose }) => {
    const [gameMode, setGameMode] = useState('time');
    const [time, setTime] = useState(60);
    const [words, setWords] = useState(25);
    const [quoteLength, setQuoteLength] = useState('short')
    const [includePunctuation, setIncludePunctuation] = useState(false);
    const [includeNumbers, setIncludeNumbers] = useState(false);
    const [maxPlayers, setMaxPlayers] = useState(2)
    const [roomPrivacy, setRoomPrivacy] = useState(true)
    const [roomCode, setRoomCode] = useState('')

    const navigate = useNavigate()

    const { createGameLobby } = useFirebase()

    const handleGameModeChange = (e) => {
        setGameMode(e.target.value);
    };

    const handleTimeSettingsChange = (e) => {
        setTime(e.target.value);
    };
    const handleWordSettingsChange = (e) => {
        setWords(e.target.value)
    }

    const handleIncludePunctuationChange = (e) => {
        setIncludePunctuation(e.target.checked);
    };

    const handleIncludeNumbersChange = (e) => {
        setIncludeNumbers(e.target.checked);
    };

    const handleRoomPrivacyChange = (e) => {
        setRoomPrivacy(e.target.value)
    }

    const handleCreateGame = async () => {
        // Logic to create the game with the selected settings
        await createGameLobby({
            mode: gameMode,
            includePuncuation: includePunctuation,
            includeNumbers: includeNumbers,
            maxPlayers: maxPlayers,
            roomPrivacy: roomPrivacy
        }).then((res) => {
            navigate({
                pathname: '/lobby',
                search: createSearchParams({
                    room: res
                }).toString()
            })
            onClose()
        })
    };

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
                        value={words}
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
                        onChange={handleWordSettingsChange}
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
                        value={gameMode}
                        name="game-mode-buttons-group"
                        onChange={handleChangeGameSettings}
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
        <div>
            <Dialog open={open} onClose={() => onClose()}>
                <DialogTitle>create game</DialogTitle>
                <DialogContent>

                    <Box>
                        <FormLabel id="game-mode-buttons-group-label-group">game mode</FormLabel>
                        <RadioGroup
                            row
                            aria-labelledby="game-mode-buttons-group-label"
                            value={gameMode}
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
                        {renderSwitch(gameMode)}
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

                    <Box sx={{ mt: 2 }}>
                        <FormLabel
                            id="game-text-options-buttons-group-label-group"
                        >room options</FormLabel>

                        <Box>
                            <RadioGroup
                                row
                                aria-labelledby="game-mode-buttons-group-label"
                                value={roomPrivacy}
                                name="game-mode-buttons-group"
                                onChange={handleRoomPrivacyChange}
                            >
                                <FormControlLabel value={true} control={<Radio />} label="public" />
                                <FormControlLabel value={false} control={<Radio />} label="private" />
                            </RadioGroup>
                            
                            <FormControlLabel
                                control={<TextField
                                    InputProps={{
                                        inputProps: {
                                            min: 2,
                                            max: 50,
                                        },
                                        disableUnderline: true,
                                    }}
                                    autoFocus={true}
                                    sx={{
                                        ml: 1,
                                        p: 0,
                                        "& fieldset": { border: 'none' },
                                    }}
                                    size='small'
                                    variant='standard'
                                    type='number'
                                    value={maxPlayers}
                                    max='50'
                                    onChange={(e) => setMaxPlayers(e.target.value)}
                                />}
                                sx={{
                                    m: 0,
                                    mt: 2,
                                }}
                                label="max players: "
                                labelPlacement='start'
                            />
                        </Box>
                    </Box>
                </DialogContent>
                <DialogActions sx={{ m: 2, }}>
                    <Button
                        variant="outlined"
                        onClick={() => onClose()}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleCreateGame}
                        variant="contained"
                        color="primary"
                        sx={{
                            p: 1,
                        }}
                    >
                        Create Game
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default CreateGameDialog;

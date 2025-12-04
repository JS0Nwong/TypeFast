import { Box, Typography } from "@mui/material"

export default function PlayerList({setCurrentPage, renderLimit, currentPage, setChunkSize, players}) {

    const handlePageChange = (e, value) => {
        setCurrentPage(value - 1)
        setChunkSize(currentPage !== 0 ? 20 : 4)
    }

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            height: '100%',
            alignItems: "flex-end",
        }}>
            {/* Replace the placeholder data with your actual player data */}
            {players?.map((player, index) => (
                <Box
                    key={player.id}
                    sx={{
                        display: 'flex',
                        flexDirection: "row",
                        justifyContent: 'space-between',
                        width: '100%',
                        p: 1.5,
                        borderBottom: index === players.length - 1 ? 0 : 1,
                    }}
                >
                    <Box sx={{
                        display: 'grid',
                        gridTemplateColumns: '30px 160px 500px',
                        gridTemplateRows: '3px 0px 0px',
                        alignItems: 'start',
                        justifyItems: 'center'
                    }}
                    >
                        <Typography
                            fontFamily='League Spartan'
                            fontWeight='600'
                            >
                            #{player.id}
                        </Typography>
                        <Typography
                            fontFamily='League Spartan'
                            fontWeight='500'
                            sx={{
                                ml: 5
                            }}
                        >
                            {player.username}
                        </Typography>
                    </Box>
                    {/* Replace the placeholder data with the player's stats */}
                    <Box sx={{
                        display: 'flex',
                        flexDirection: "row",
                        justifyContent:"space-between",
                    }}>
                        <Typography>{`${player.stats} wpm`}</Typography>
                        <Typography sx={{ml: 2}}>{`${player.stats} raw`}</Typography>
                    </Box>
                </Box>
            ))}
        </Box>
    )
}

import { Box, Typography, Avatar, styled } from "@mui/material"
import { PiCrownSimpleFill } from "react-icons/pi";

const Podium = styled("div", {
    name: "MuiPodium",
    overridesResolver: (props, styles) => {
        return [styles.root]
    }
})``;

export default function TopThree({ topThree }) {
    return (
        // Top Three Wrapper
        <Box sx={{
            width: '100%',
            display: 'flex',
            flexDirection: "row",
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            mt: 1,
            mb: 1,
        }}>
            <Box sx={{
                width: '100%',
                mr: 0.5,
                background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0) 0%,  rgba(255, 255, 255, 0) 30%, rgba(173, 181, 189, 0.35) 97%, rgba(173, 181, 189, 0) 100%)',
                height: '350px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                alignItems: 'flex-end'
            }}>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                    height: '100%',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                }}>
                    <PiCrownSimpleFill style={{
                        color: "rgba(173, 181, 189, 0.85)",
                        fontSize: '2.5rem'
                    }} />
                    <Avatar sx={{
                        width: '72px',
                        height: '72px',
                    }} />
                    <Typography>{topThree[1].username}</Typography>
                </Box>
                <Podium>
                    #2
                </Podium>
            </Box>
            <Box sx={{
                width: '100%',
                ml: 0.5,
                mr: 0.5,
                background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0) 30%, rgba(252, 191, 73, 0.35) 97%, rgba(252, 191, 73, 0) 100%)',
                height: '350px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                alignItems: 'flex-end'
            }}>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                    height: '100%',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                }}>
                    <PiCrownSimpleFill style={{ color: "rgba(252, 191, 73, 0.85)", fontSize: '2.5rem' }} />
                    <Avatar sx={{
                        width: '72px',
                        height: '72px',
                    }} />
                    <Typography>{topThree[0].username}</Typography>
                </Box>
                <Podium sx={{
                    padding: '3rem',
                }}>
                    #1
                </Podium>
            </Box>
            <Box sx={{
                width: '100%',
                ml: 0.5,
                background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0) 0%,  rgba(255, 255, 255, 0) 30%, rgba(147, 102, 57, 0.35) 97%, rgba(147, 102, 57, 0) 100%)',
                height: '350px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                alignItems: 'flex-end'
            }}>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                    height: '100%',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                }}>
                    <PiCrownSimpleFill style={{ color: "rgba(147, 102, 57, 0.85)", fontSize: '2.5rem' }} />
                    <Avatar sx={{
                        width: '72px',
                        height: '72px',
                    }} />
                    <Typography>{topThree[2].username}</Typography>
                </Box>
                <Podium>
                    #3
                </Podium>
            </Box>
        </Box>
    )
}

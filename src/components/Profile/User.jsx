import { Box, Typography, Stack, styled, IconButton, Avatar } from '@mui/material'
import YouTubeIcon from '@mui/icons-material/YouTube';
import XIcon from '@mui/icons-material/X';
import InstagramIcon from '@mui/icons-material/Instagram';
import { useContext } from 'react';
import AuthContext from '../../hooks/AuthProvider';

export default function User() {
  const { auth } = useContext(AuthContext)

  const ProfileBox = styled("div", {
    name: "MuiDiv",
    overridesResolver: (props, styles) => {
      return [styles.root]
    }
  })``;

  return (
    <>
      <Box sx={{
        height: '100%',
        width: '100%',
        mt: 6,
      }}>
        <ProfileBox sx={{
          width: '100%',
          borderRadius: "4px",
          p: 3,
        }}>
          <Stack
            direction='row'
            justifyContent="space-between"
          >
            <Box sx={{
              height: '100%',
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <Avatar
                sx={{
                  height: 300,
                  width: 300,

                  borderRadius: "999px"
                }}
                alt="User profile avatar"
                src={auth.currentUser.photoURL}
              />
            </Box>
            <Stack
              direction="column"
              sx={{ height: '100%', width: '100%', }}
            >
              <Typography variant='h4'>
                {auth.currentUser.displayName
                  ? auth.currentUser.displayName
                  : auth.currentUser.uid}
              </Typography>
              <Box sx={{ mt: 2 }}>
                <Typography
                  variant='h6'
                  sx={{ opacity: 0.45 }}
                >bio</Typography>
                <Typography variant='body2'>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                </Typography>
              </Box>
              <Box sx={{ mt: 2 }}>
                <Typography variant='h6'
                  sx={{ opacity: 0.45 }}>
                  keyboard
                </Typography>
                <Typography variant='body2'>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                </Typography>
              </Box>

              <Stack
                direction="row"
                spacing={3}
                sx={{ mt: 2 }}
              >
                <IconButton>
                  <YouTubeIcon />
                </IconButton>
                <IconButton>
                  <XIcon />
                </IconButton>
                <IconButton>
                  <InstagramIcon />
                </IconButton>
              </Stack>
            </Stack>
          </Stack>

        </ProfileBox>

        <ProfileBox sx={{
          width: '100%',
          borderRadius: "4px",
          mt: 2,
          p: 3,
          pl: 13,
          pr: 13,
        }}>
          <Typography>All time leaderboard</Typography>
        </ProfileBox>

        <Stack
          direction="row"
          justifyContent="space-between"
          sx={{
            mt: 2
          }}>
          <ProfileBox sx={{
            width: '100%',
            p: 3,
            borderRadius: "4px",
            mr: 2
          }}>
            <Stack direction='row' spacing={2} justifyContent='space-around'>
              <Stack direction='column' spacing={1} alignItems="center">
                <Typography variant='subtitle2'>15 seconds</Typography>
                <Typography variant='h4'>0</Typography>
                <Typography variant='h4' sx={{ opacity: 0.85 }}>100%</Typography>
              </Stack>
              <Stack direction='column' spacing={1} alignItems="center">
                <Typography variant='subtitle2'>30 seconds</Typography>
                <Typography variant='h4'>0</Typography>
                <Typography variant='h4' sx={{ opacity: 0.85 }}>100%</Typography>
              </Stack>
              <Stack direction='column' spacing={1} alignItems="center">
                <Typography variant='subtitle2'>60 seconds</Typography>
                <Typography variant='h4'>0</Typography>
                <Typography variant='h4' sx={{ opacity: 0.85 }}>100%</Typography>
              </Stack>
              <Stack direction='column' spacing={1} alignItems="center">
                <Typography variant='subtitle2'>120 seconds</Typography>
                <Typography variant='h4'>0</Typography>
                <Typography variant='h4' sx={{ opacity: 0.85 }}>100%</Typography>
              </Stack>
            </Stack>
          </ProfileBox>

          <ProfileBox sx={{
            width: '100%',
            p: 3,
            borderRadius: "4px",
            ml: 2,
          }}>
            <Stack direction='row' spacing={2} justifyContent='space-around'>
              <Stack direction='column' spacing={1} alignItems="center">
                <Typography variant='subtitle2'>10 words</Typography>
                <Typography variant='h4'>0</Typography>
                <Typography variant='h4' sx={{ opacity: 0.85 }}>100%</Typography>
              </Stack>
              <Stack direction='column' spacing={1} alignItems="center">
                <Typography variant='subtitle2'>20 words</Typography>
                <Typography variant='h4'>0</Typography>
                <Typography variant='h4' sx={{ opacity: 0.85 }}>100%</Typography>
              </Stack>
              <Stack direction='column' spacing={1} alignItems="center">
                <Typography variant='subtitle2'>50 words</Typography>
                <Typography variant='h4'>0</Typography>
                <Typography variant='h4' sx={{ opacity: 0.85 }}>100%</Typography>
              </Stack>
              <Stack direction='column' spacing={1} alignItems="center">
                <Typography variant='subtitle2'>100 words</Typography>
                <Typography variant='h4'>0</Typography>
                <Typography variant='h4' sx={{ opacity: 0.85 }}>100%</Typography>
              </Stack>
            </Stack>
          </ProfileBox>
        </Stack>
      </Box>
    </>
  )
}

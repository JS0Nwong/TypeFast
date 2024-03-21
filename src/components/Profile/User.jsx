import { Box, Typography, Stack, styled, IconButton, Avatar, Link } from '@mui/material'
import { useContext, useState } from 'react';

import YouTubeIcon from '@mui/icons-material/YouTube';
import XIcon from '@mui/icons-material/X';
import EditIcon from '@mui/icons-material/Edit';
import InstagramIcon from '@mui/icons-material/Instagram';

import AuthContext from '../../hooks/AuthProvider';
import EditUserProfile from './EditUserProfile';

export default function User() {
  const { auth, userData } = useContext(AuthContext)

  const ProfileBox = styled("div", {
    name: "MuiDiv",
    overridesResolver: (props, styles) => {
      return [styles.root]
    }
  })``;

  const [openEdit, setOpenEdit] = useState(false)

  const handleOpenEdit = () => {
    setOpenEdit(!openEdit)
  }

  if(userData !== null) {
    return (
      <>
        <Box sx={{
          height: '100%',
          width: '100%',
          mt: 6,
          display: 'flex',
          flexDirection: 'row',
        }}>
          <ProfileBox sx={{
            width: '100%',
            borderRadius: "4px",
            p: 3,
            mr: 1,
          }}>
            <Stack
              direction='column'
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
                    height: 250,
                    width: 250,
  
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
                    sx={{ opacity: 0.45, display: 'flex', alignItems: 'center' }}
                  >bio
                    <IconButton sx={{ml: 1}} onClick={() => handleOpenEdit()}>
                      <EditIcon sx={{fontSize: '18px'}}/>
                    </IconButton>
                  </Typography>
                  <Typography variant='body2'>
                    {userData.bio !== null
                    ? userData.bio
                    : `We don't know much about ${auth.currentUser.displayName} but we're sure they're pretty cool.`}
                  </Typography>
                </Box>
                <Box sx={{ mt: 2 }}>
                  <Typography
                    variant='h6'
                    sx={{ opacity: 0.45, display: 'flex', alignItems: 'center' }}
                  >keyboard
                    <IconButton sx={{ ml: 1 }} onClick={() => handleOpenEdit()}>
                      <EditIcon sx={{ fontSize: '18px' }} />
                    </IconButton>
                  </Typography>
                  <Typography variant='body2'>
                    {userData.keyboard 
                    ? userData.keyboard 
                    : `We don't know much about what ${auth.currentUser.displayName} uses but we're sure it's pretty cool.`}
                  </Typography>
                </Box>
  
                <Stack
                  direction="row"
                  spacing={3}
                  sx={{ mt: 2 }}
                >
                  {userData.youtube ?
                    <IconButton>
                      <YouTubeIcon />
                    </IconButton> : <></>}
                  {userData.twitter ?
                    <IconButton>
                      <XIcon />
                    </IconButton> : <></>}
                  {userData.instagram ?
                    <IconButton>
                      <InstagramIcon />
                    </IconButton> : <></>}
                </Stack>
              </Stack>
            </Stack>
          </ProfileBox>
  
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            ml: 1,
          }}>
            <ProfileBox sx={{
              borderRadius: "4px",
              p: 3,
            }}>
              <Typography>All time leaderboard</Typography>
            </ProfileBox>
  
  
            <ProfileBox sx={{
              width: '100%',
              p: 3,
              borderRadius: "4px",
              mt: 2
            }}>
              <Stack direction='row' spacing={2} justifyContent='space-around'>
                <Stack direction='column' spacing={1} alignItems="center">
                  <Typography variant='subtitle2'>15 sec</Typography>
                  <Typography variant='h4'>0</Typography>
                  <Typography variant='h4' sx={{ opacity: 0.85 }}>100%</Typography>
                </Stack>
                <Stack direction='column' spacing={1} alignItems="center">
                  <Typography variant='subtitle2'>30 sec</Typography>
                  <Typography variant='h4'>0</Typography>
                  <Typography variant='h4' sx={{ opacity: 0.85 }}>100%</Typography>
                </Stack>
                <Stack direction='column' spacing={1} alignItems="center">
                  <Typography variant='subtitle2'>60 sec</Typography>
                  <Typography variant='h4'>0</Typography>
                  <Typography variant='h4' sx={{ opacity: 0.85 }}>100%</Typography>
                </Stack>
                <Stack direction='column' spacing={1} alignItems="center">
                  <Typography variant='subtitle2'>120 sec</Typography>
                  <Typography variant='h4'>0</Typography>
                  <Typography variant='h4' sx={{ opacity: 0.85 }}>100%</Typography>
                </Stack>
              </Stack>
            </ProfileBox>
  
            <ProfileBox sx={{
              width: '100%',
              p: 3,
              borderRadius: "4px",
              mt: 2
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
          </Box>
        </Box>
        {openEdit && <EditUserProfile open={openEdit} onClose={() => setOpenEdit(false)}/>}
      </>
    )
  }
}

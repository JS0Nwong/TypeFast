import { useEffect } from 'react';
import { motion } from 'framer-motion'
import { 
  Box, 
  Stack, 
  Tooltip, 
  IconButton,
  Typography
} from '@mui/material'
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import PanoramaIcon from '@mui/icons-material/Panorama';

import MPResultsDataGrid from './MPResultsDataGrid';
import { useBoundStore } from '../../utils/stores/boundStore';
import useFirebase  from '../../hooks/useFirebase';

export default function MPResultsScreen(id) {

  const { isGameEnded } = useBoundStore((state) => ({ isGameEnded: state.isGameEnded }))
  const { endMultiplayerGame } = useFirebase()

  useEffect(() => {
    endMultiplayerGame()
  } ,[])

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        height: '100%',
        width: '100%',
      }}
    >
      <Box sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        {isGameEnded
          ? <MPResultsDataGrid id={id}/>
          : <Typography>
            Waiting for other players to finish...
          </Typography>}
      </Box>
      <Box sx={{
        width: '100%',
        mt: 10,
      }}>
        <Stack direction='row' sx={{ mb: 3, justifyContent: 'center'}}>
          <Tooltip title="play again">
            <IconButton sx={{ mr: 10, ml: 10 }} tabIndex={0}>
              <NavigateNextIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="leave lobby">
            <IconButton sx={{ mr: 10, ml: 10 }} tabIndex={0}>
              <RestartAltIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="copy screenshot to clipboard">
            <IconButton sx={{ mr: 10, ml: 10 }} tabIndex={0} >
              <PanoramaIcon />
            </IconButton>
          </Tooltip>
        </Stack>
      </Box>
    </Box>
  )
}

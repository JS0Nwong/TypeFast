import React from 'react'
import {
  Box,
  Button,
  Link,
  Typography
} from "@mui/material"
import GitHubIcon from '@mui/icons-material/GitHub';
import EmailIcon from '@mui/icons-material/Email';
import CodeIcon from '@mui/icons-material/Code';
import InfoIcon from '@mui/icons-material/Info';
import { IoMdGitBranch } from "react-icons/io";
import useStore from '../../utils/store';

export default function Footer() {
  const {hideElements} = useStore()
  return (
    <Box sx={{
      mt: 10,
      mb: 4,
      width: "100%",
      display: 'flex',
      flexDirection: "row",
      justifyContent: 'space-between',
      opacity: hideElements ? "0" : "1"
    }}>
      <Box sx={{
        display: 'flex',
        flexDirection: "row",
        justifyContent: 'space-between'
      }}>
        <Link href="https://github.com/JS0Nwong/" tabIndex={-1}>
          <Button
            variant="text"
            startIcon={<GitHubIcon />}
          >
            Github
          </Button>
        </Link>
        <Link href="mailto:Jason.Wong47@myhunter.cuny.edu" tabIndex={-1}> 
          <Button
            variant="text"
            startIcon={<EmailIcon />}
            sx={{
              ml: 2,
            }}
          >
            Email
          </Button>
        </Link>
      </Box>
      <Box sx={{
        display: 'flex',
        flexDirection: "row",
        justifyContent: 'space-between'
      }}>
        <Button
          variant="text"
          startIcon={<CodeIcon />}
          sx={{
            ml: 2
          }}
        >
          source
        </Button>
        <Button
          variant="text"
          startIcon={<IoMdGitBranch />}
          sx={{
            ml: 2
          }}
        >
          v0.7.50
        </Button>
        <Link href="https://monkeytype.com/"  tabIndex={-1}>
          <Button
            variant="text"
            startIcon={<InfoIcon />}
            sx={{
              ml: 2
            }}
          >
            inspired by @monkeytype
          </Button>
        </Link>
      </Box>
    </Box>
  )
}

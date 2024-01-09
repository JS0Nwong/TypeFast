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

export default function Footer() {
  return (
    <Box sx={{
      mt: 10,
      mb: 4,
      width: "100%",
      display: 'flex',
      flexDirection: "row",
      justifyContent: 'space-between',
    }}>
      <Box sx={{
        display: 'flex',
        flexDirection: "row",
        justifyContent: 'space-between'
      }}>
        <Button
          variant="text"
          startIcon={<GitHubIcon />}

        >
          Github
        </Button>
        <Button
          variant="text"
          startIcon={<EmailIcon />}
          sx={{
            ml: 2,
          }}
        >
          Email
        </Button>
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
          v0.0.01
        </Button>
        <Button
          variant="text"
          startIcon={<InfoIcon />}
          sx={{
            ml: 2
          }}
        >
          inspired by @monkeytype
        </Button>
      </Box>
    </Box>
  )
}

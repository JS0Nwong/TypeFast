import { useMemo, useEffect, useState, useContext, createContext } from 'react'
import './App.css'
import { useTheme, createTheme, ThemeProvider, CssBaseline } from '@mui/material'

import { Routes, Route } from 'react-router-dom'

import LoginView from './LoginView'
import BoardListView from './BoardListView'
import BoardView from './BoardView'

import { AuthProvider } from './utils/AuthProvider'
import PrivateRoute from "./utils/PrivateRoute"
import PublicRoute from "./utils/PublicRoute"

import useStore from './store'

export const ThemeContext = createContext({ toggleTheme: () => { } })
const defaultTheme = "dark"

function AppRoutes() {
  // get view and edit permissions for board routes
  const { publiclyEditable, publiclyViewable } = useStore()
  return (
    <>
      <CssBaseline />
      <AuthProvider>
        <div className='App'>
          <Routes>
            <Route path="/" element={<PublicRoute Component={LoginView} />} />
            <Route path="/boards" element={<PrivateRoute Component={BoardListView} />} />
            <Route path="/boards/:id" element={
              publiclyViewable ? <PublicRoute Component={BoardView} /> : <PrivateRoute Component={BoardView} />
            } />
            <Route path='*' element={<LoginView />} />
          </Routes>
        </div>
      </AuthProvider>
    </>
  )
}

function App() {
  const [currentTheme, setTheme] = useState(() => (localStorage.getItem('theme') || defaultTheme))
  const themeMode = useMemo(() => ({
    toggleTheme: () => {
      setTheme((prevMode) => (prevMode == 'light' ? 'dark' : 'light'))
      localStorage.setItem('theme', currentTheme)
    }
  }), [])

  const theme = useMemo(() => createTheme({
    palette: {
      currentTheme,
      ...(currentTheme === 'light' ? {
        background: {
          default: "rgb(245 245 245)",
          secondary: 'rgb(229 229 229)'
        },
        text: {
          primary: 'rgb(23 23 23)',
          secondary: 'rgba(255, 255, 255, 0.4)',
        },
      } :
        {
          background: {
            default: 'rgb(23 23 23)',
            secondary: 'rgb(17 17 17)'
          },
          text: {
            primary: 'rgb(255 255 255)',
            secondary: 'rgba(255, 255, 255, 0.4)',
          },
          borderColor: {
            default: 'rgba(229, 229, 229, 0.25)'
          }
        })
    },
    typography: {
      fontFamily: "Poppins, sans-serif"
    },
    borders: {
      currentTheme,
      ...(currentTheme === 'light' ? {
        border: "1px solid rgb(64 64 64)"
      } :
        {
          borderColor: 'orange'
        })
    }
  }), [currentTheme])

  return (
    <ThemeContext.Provider value={themeMode}>
      <ThemeProvider theme={theme}>
        <AppRoutes />
      </ThemeProvider>
    </ThemeContext.Provider>
  )
}

export default App

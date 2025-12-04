import { BrowserRouter as Router } from 'react-router-dom'
import './App.css'

import { UserTheme } from "../src/hooks/useTheme"
import { ExperimentalUseTheme } from './hooks/experimentalUseTheme';
import { AuthProvider } from './hooks/AuthProvider';

import AnimatedRoutes from './utils/AnimatedRoutes';
import BaseLayout from './views/BaseLayout';

function App() {
  return (
    <>
      <UserTheme>
        <div className='App'>
          <AuthProvider>
            <BaseLayout>
              <Router>
                <AnimatedRoutes />
              </Router>
            </BaseLayout>
          </AuthProvider>
        </div>
      </UserTheme>
    </>
  )
}

export default App

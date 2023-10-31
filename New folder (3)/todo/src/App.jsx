import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import Board from './components/Board'
import Menubar from './components/Menubar'

function App() {
  const [count, setCount] = useState(0)
  const [completed, setCompleted] = useState([]);
  const [incomplete, setIncomplete] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((response) => response.json())
      .then((json) => {
        setCompleted(json.filter((task) => task.completed));
        setIncomplete(json.filter((task) => !task.completed));
      });
  }, []);

  return (
    <>
      <div className='App'>
        <Menubar />
        <Board completed={completed} incomplete={incomplete} />
      </div>
    </>
  )
}

export default App

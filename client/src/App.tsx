import { Outlet } from 'react-router-dom'
import './App.css'
import Navigation from './components/navigation/Navigation'

function App() {

  return (
    <div className='app'>
      <Navigation />
      <Outlet />
    </div>
  )
}

export default App

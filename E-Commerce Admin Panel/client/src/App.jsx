import {React} from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import LoginPage from './pages/LoginPage'

// PrimeReact CSS
import 'primereact/resources/themes/lara-light-blue/theme.css'
import 'primeicons/primeicons.css'
import 'primereact/resources/primereact.min.css'
import 'primeflex/primeflex.css'

function App() {


  return (
    <>
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
    </>
  )
}

export default App

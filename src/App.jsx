import {BrowserRouter,Routes,Route} from 'react-router-dom'
import './App.css'
import Signin from './Pages/Signin'
import DashboardLayoutAccount from './Pages/JobPanel'
import JobPanel from './Pages/JobPanel'

function App() {
  

  return (
    <>
     <BrowserRouter>
     <Routes>
      <Route path="/" element={<Signin />} />
      <Route path="/home" element={<JobPanel />} />
     </Routes>
     </BrowserRouter>
    </>
  )
}

export default App

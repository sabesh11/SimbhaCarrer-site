import {BrowserRouter,Routes,Route} from 'react-router-dom'
import './App.css'
import Signin from './Pages/Signin'

import JobPanel from './Pages/JobPanel'

import Layout from './Components/Layout'
import Applicant from './Pages/Applicant'

function App() {
  

  return (
    <>
     <BrowserRouter>
     <Routes>
      <Route path="/" element={<Signin />} />
      <Route element={<Layout />}>
      <Route path="/home" element={<JobPanel />} />
      <Route path="/applicantpanel" element={<Applicant />} />
      </Route>
     </Routes>
     </BrowserRouter>
    </>
  )
}

export default App

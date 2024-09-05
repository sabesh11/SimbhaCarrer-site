import {BrowserRouter,Routes,Route} from 'react-router-dom'
import './App.css'
import Signin from './Pages/Signin'

function App() {
  

  return (
    <>
     <BrowserRouter>
     <Routes>
      <Route path="/" element={<Signin />} />
     </Routes>
     </BrowserRouter>
    </>
  )
}

export default App

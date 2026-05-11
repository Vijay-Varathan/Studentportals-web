import './App.css'
import Login from './Component/Login'
import Dashboard from './Component/Dashboard'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Students from './Component/Students';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Studentmarks from './Component/Studentmarks';

function App() {
  

  return (
    <>
    <ToastContainer />
    <Router>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/students" element={<Students />}></Route>
        <Route path="/students/:id" element={<Dashboard />}></Route>
        <Route path='/students/marks/:id' element={<Studentmarks/>}></Route>

      </Routes>
    </Router>
     
    </>
  )
}

export default App

import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import './App.css'
import Home from "./pages/Home"
import { Edit } from "@mui/icons-material"
import CoursesForm from "./pages/CoursesForm"


function App() {

  return (
    <Router>
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/courses" element={<CoursesForm />} />
      <Route path="/edit" element={<Edit />} />
      </Routes>
    </Router>
  )
}

export default App

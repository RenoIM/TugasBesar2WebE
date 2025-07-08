import { BrowserRouter, Route, Routes } from "react-router-dom"
import Layout from "./components/Layout"
import Login from "./pages/Login"
import Dashboard from "./pages/dashboard"
import Ddosen from "./pages/ddosen"
import Register from "./pages/Register"
import Dkelas from "./pages/dkelas"
import Dmatakuliah from "./pages/dmatakuliah"
function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route element={<Layout/>}>
        <Route path="/" element={<Login/>}/>
        <Route path="/Register" element={<Register/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/ddosen" element={<Ddosen/>}/>
        <Route path="/dkelas" element={<Dkelas/>}/>
        <Route path="/dmatakuliah" element={<Dmatakuliah/>}/>
      </Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App
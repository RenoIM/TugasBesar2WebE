import { BrowserRouter, Route, Routes } from "react-router-dom"
import Layout from "./components/Layout"
import Login from "./pages/Login"
import Dashboard from "./pages/dashboard"
import Ddosen from "./pages/ddosen"
import Dkelas from "./pages/dkelas"
import Dmatakuliah from "./pages/dmatakuliah"
import DashboardLayout from "./components/DashboardLayout"
import Register from "./pages/Register"

function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route element={<Layout/>}>
        <Route path="/" element={<Login/>}/>
        <Route path="/Register" element={<Register/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
      </Route>
      <Route element={<DashboardLayout/>}>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/home" element={<Ddosen/>}/>
        <Route path="/home" element={<Dkelas/>}/>
        <Route path="/home" element={<Dmatakuliah/>}/>
      </Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App

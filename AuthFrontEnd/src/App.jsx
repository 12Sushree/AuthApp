import { Route, Routes } from "react-router-dom"
import Navbar from "./components/Navbar"
import LandingPage from "./pages/LandingPage"
import HomePage from "./pages/HomePage"
import { useState } from "react";

function App() {
  const [formType, setFormType] = useState("");
  return (
    <>
      <div className=" w-screen h-screen flex flex-col mx-auto">
        <div className="w-full">
          <Navbar setFormType={setFormType} />
        </div>
        <div className="w-full h-full">
          <Routes>
            <Route path="/" element={<LandingPage formType={formType} setFormType={setFormType} />} />
            <Route path="/home" element={<HomePage />} />
          </Routes>
        </div>
      </div>

    </>
  )
}

export default App

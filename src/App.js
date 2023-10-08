import "./App.css"
import { Route, Routes } from "react-router-dom"
import { Login } from "./components/auth/Login"
import { Register } from "./components/auth/Register"
import { Authorized } from "./views/Authorized"
import { ApplicationViews } from "./views/ApplicationViews"

export const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route 
      path="*"
      element={
        // checks if the user is authorized
        <Authorized>
          {/* if so then ApplicationViews is the CHILD of Authorized which will return its children ie. the page */}
          <ApplicationViews />
        </Authorized>
      } />



    </Routes>
  )
}
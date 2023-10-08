import { Route, Outlet, Routes } from "react-router-dom"
import { NavBar } from "../components/NavBar/NavBar"
import { Welcome } from "../components/welcome/Welcome"
import { TicketList } from "../components/tickets/TicketList"
import { EmployeeList } from "../components/employees/EmployeeList"
import { EmployeeDetails } from "../components/employees/EmployeeDetails"
import { CustomerDetails } from "../components/customers/CustomerDetails"
import { CustomerList } from "../components/customers/CustomersList"
import { useEffect, useState } from "react"
import { EmployeeForm } from "../components/forms/EmployeeForm"

export const ApplicationViews = () => {
  const [currentUser, setCurrentUser] = useState({})

  useEffect(() => {
    const localHoneyUser = localStorage.getItem("honey_user")
    const honeyUserObject = JSON.parse(localHoneyUser)

    setCurrentUser(honeyUserObject)
  }, [])

  return <>
    <Routes>
      {/* parent route for home to always load navbar on all pages */}
      <Route
        path="/"
        element={
          <>
            <NavBar />
            {/* tells parent where to load children in relation to own position */}
            <Outlet />
          </>
        }
      >
        <Route index element={<Welcome />} />
        <Route path="tickets" element={<TicketList currentUser={currentUser} />} />
        <Route path="employees" >
          <Route index element={<EmployeeList />} />
          <Route path=":employeeId" element={<EmployeeDetails />} />
        </Route>
        <Route path="customers" >
          {/* first page of /customers loads customer list */}
          <Route index element={<CustomerList />} />
          {/* the :customerId is the name of the useParams we will use in CustomerDetails to display specific employee */}
          <Route path=":customerId" element={<CustomerDetails />} />
        </Route>
        <Route path="profile" element={<EmployeeForm currentUser={currentUser}/>} />
      </Route>
    </Routes>
  </>
}

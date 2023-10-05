import "./App.css"
import { CustomerList } from "./components/customers/CustomersList"
import { TicketList } from "./components/tickets/TicketList"
import { EmployeeList } from "./components/employees/EmployeeList"
import { Outlet, Route, Routes } from "react-router-dom"
import { NavBar } from "./components/NavBar/NavBar"
import { Welcome } from "./components/welcome/Welcome"
import { CustomerDetails } from "./components/customers/CustomerDetails"
import { EmployeeDetails } from "./components/employees/EmployeeDetails"

export const App = () => {
  return (
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
        <Route path="tickets" element={<TicketList />} />
        <Route path="employees" >
            <Route index element={<EmployeeList />}/>
            <Route path=":employeeId" element={<EmployeeDetails />}/>
        </Route>
        <Route path="customers" >
          <Route index element={<CustomerList />} />
          {/* the :customerId is the name of the useParams we will use in CustomerDetails */}
          <Route path=":customerId" element={<CustomerDetails />} />
        </Route>
      </Route>

    </Routes>
  )
}
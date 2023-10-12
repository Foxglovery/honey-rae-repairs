import { Outlet, Route, Routes } from "react-router-dom";
import { EmployeeNavBar } from "../components/NavBar/EmployeeNavBar";
import { Welcome } from "../components/welcome/Welcome";
import { TicketList } from "../components/tickets/TicketList";
import { EmployeeList } from "../components/employees/EmployeeList";
import { EmployeeDetails } from "../components/employees/EmployeeDetails";
import { CustomerList } from "../components/customers/CustomersList";
import { CustomerDetails } from "../components/customers/CustomerDetails";
import { EmployeeForm } from "../components/forms/EmployeeForm";

export const EmployeeViews = ({currentUser}) => {
  return (
    <Routes>
      {/* parent route for home to always load navbar on all pages */}
      <Route
        path="/"
        element={
          <>
            <EmployeeNavBar />
            {/* tells parent where to load children in relation to own position */}
            <Outlet />
          </>
        }
      >
        <Route index element={<Welcome />} />
        <Route
          path="tickets"
          element={<TicketList currentUser={currentUser} />}
        />
        <Route path="employees">
          <Route index element={<EmployeeList />} />
          <Route path=":employeeId" element={<EmployeeDetails />} />
        </Route>
        <Route path="customers">
          {/* first page of /customers loads customer list */}
          <Route index element={<CustomerList />} />
          {/* the :customerId is the name of the useParams we will use in CustomerDetails to display specific employee */}
          <Route path=":customerId" element={<CustomerDetails />} />
        </Route>
        <Route
          path="profile"
          element={<EmployeeForm currentUser={currentUser} />}
        />
      </Route>
    </Routes>
  );
};

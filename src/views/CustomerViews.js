import { Routes, Route, Outlet } from "react-router-dom";

import { Welcome } from "../components/welcome/Welcome";
import { CustomerNavBar } from "../components/NavBar/CustomerNavBar";
import { TicketList } from "../components/tickets/TicketList";
import { TicketForm } from "../components/forms/TicketForm";
//had to pass down currentUser from ApplicationViews through too the customer Views and to Ticket List
export const CustomerViews = ({ currentUser }) => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <CustomerNavBar />
            <Outlet />
          </>
        }
      >
        <Route index element={<Welcome />} />
        <Route path="tickets">
          <Route index element={<TicketList currentUser={currentUser} />} />
          <Route
            path="create"
            element={<TicketForm currentUser={currentUser} />}
          />
        </Route>
      </Route>
    </Routes>
  );
};

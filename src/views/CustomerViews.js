import { Routes, Route, Outlet } from "react-router-dom"

import { Welcome } from "../components/welcome/Welcome"
import { CustomerNavBar } from "../components/NavBar/CustomerNavBar"
import { TicketList } from "../components/tickets/TicketList"
//had to pass down currentUser from ApplicationViews through too the customer Views and to Ticket List
export const CustomerViews = ({currentUser}) => {
    return <Routes>
        <Route
        path="/"
        element={
            <>
            <CustomerNavBar />
            <Outlet />
            </>
        }>
         <Route index element={<Welcome />}/>
         <Route path="tickets" element={<TicketList currentUser={currentUser} />} />
        </Route>
    </Routes>
}
import { useEffect, useState } from "react"
import { getAllEmployees } from "../../services/employeeService"

export const Ticket = ({ ticket, name }) => {

    const [employees, setEmployees] = useState([])
    const [assignedEmployee, setAssignedEmployee] = useState({})


    useEffect(() => {
        getAllEmployees().then(employeeArray => {

            setEmployees(employeeArray)
            console.log(`employees set`)

        })

    }, [])

    useEffect(() => {
        const foundEmployee = employees.find(employee => employee.id === ticket.employeeTickets[0]?.employeeId)
        setAssignedEmployee(foundEmployee)

    }, [employees, ticket])

 
    
    //if employees > 0
    //iterate through employees
    //look for matching employeeId on employee Ticket Id
    //assignedEmployee.user.fullName

    return (
        <section className="ticket" >
            <header className="ticket-info">#{ticket.id}</header>
            <div>{ticket.description}</div>
            <footer>
                <div>
                    <div className="ticket-info">Assignee</div>
                    <div>{assignedEmployee ? assignedEmployee.user?.fullName : "None"}</div>
                </div>
                <div>
                    <div className="ticket-info">Emergency</div>
                    <div>{ticket.emergency ? "yes" : "no"}</div>
                </div>
            </footer>
        </section>
    )
}
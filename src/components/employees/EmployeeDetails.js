import { useParams } from "react-router-dom"
import "./Employees.css"
import { useEffect, useState } from "react"
import { getEmployeeById } from "../../services/employeeService"

export const EmployeeDetails = () => {
    const [employee, setEmployee] = useState({})
    const { employeeId } = useParams()

    useEffect(() => {
        getEmployeeById(employeeId).then(data => {
            const employeeObj = data[0]
            setEmployee(employeeObj)
            console.log(employeeObj)
        })
    }, [employeeId])

    return (
        <section className="employee">
            <header className="employee-header">{employee.user?.fullName}</header>
            <div>
                <span className="employee-info">Email: </span>
                {employee.user?.email}
            </div>
            <div>
                <span className="employee-info">Specialty: </span>
                {employee.specialty}
            </div>
            <div>
                <span className="employee-info">Hourly Rate:  </span>
                {employee.rate}
            </div>
            {/* Had to use a ternery here to get it to wait for the id to populate */}
            <div>This User has {employee.employeeTickets?.length} active Tickets</div>
        </section>

    )



}

//a filter of employee tickets to return an array of tickets with a userId matching employee.id

//email
//specialty
//rate
//number of tickets
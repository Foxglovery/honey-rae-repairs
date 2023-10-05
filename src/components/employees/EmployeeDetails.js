import { useParams } from "react-router-dom"
import "./Employees.css"
import { useEffect, useState } from "react"
import { getEmployeeById } from "../../services/employeeService"

export const EmployeeDetails = () => {
 const [employee, setEmployee] = useState({})
    const {employeeId} = useParams()   

useEffect(() => {
    getEmployeeById(employeeId).then(data => {
        const employeeObj = data[0]
        setEmployee(employeeObj)
    })
},[employeeId])

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
            {/* LEFT OFF HERE TRYING TO ACCESS NUMBER OF TICKETS. CANT ACCESS LENGTH EVEN THOUGH I CAN CONSOLE LOG THE LENGTH? */}
            <div>This User has {}}</div>
        </section>
   
)



}

//a filter of employee tickets to return an array of tickets with a userId matching employee.id

//email
//specialty
//rate
//number of tickets
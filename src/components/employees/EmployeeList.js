import { useState, useEffect } from "react"
import { getStaffUsers } from "../../services/userService"
import { User } from "../users/User"
import "./Employees.css"
import { Link } from "react-router-dom"
//define function to gen list
export const EmployeeList = () => {
    //sets up state to hold data
    const [staffUsers, setStaffUsers] = useState([])

    //gets data and sets it to state
    useEffect(() => {
        getStaffUsers().then((staffArray) => {
            setStaffUsers(staffArray)
        })
    }, [])

//returns a parent div and maps each item in data

    return <div className="employees">
        {staffUsers.map(staffObj => {
            //for each item in data, run User which interpolates the data object info
            return (
                <Link to={`/employees/${staffObj.id}`}>
                    <User
                //passing in props for to feed the child component 
                key={staffObj.id}
                user={staffObj}
                /></Link>)
                
        })}
    </div>
}
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import "./Form.css"
import { getEmployeeById, updateEmployee } from "../../services/employeeService"
//want to edit the specialty and rate
export const EmployeeForm = ({currentUser}) => {
    const [employee, setEmployee] = useState({})
    const navigate = useNavigate()
    useEffect(() => {
        //gets employee logged in
        getEmployeeById(currentUser.id).then(data => {
            //strips away array layer
            const employeeObj = data[0]
            //sets state with object
            setEmployee(employeeObj)
        })
    },[currentUser])

    const handleSave = (event) => {
        event.preventDefault()
        console.log('clicked')

        const editedEmployee = {
            id: employee.id,
            specialty: employee.specialty,
            rate: employee.rate,
            userId: employee.userId,
        }
        updateEmployee(editedEmployee).then(() => {
            navigate(`/employees/${currentUser.id}`)
        })
    }

    const handleInputChange = (event) => {
        const stateCopy = {...employee}
        //this works by referencing the name given to each input which corresponds to the value we wish to change.
        stateCopy[event.target.name] = event.target.value
        setEmployee(stateCopy)
    }


    return (
    <form className="profile">
        <h2>Update Profile</h2>
        <fieldset>
            <div className="form-group">
                <label>Specialty</label>
                <input 
                    name="specialty"
                    type="text"
                    required
                    className="form-control"
                    //added the ternary to handle the changing state error
                    value={employee.specialty ? employee.specialty : ''}
                    onChange={handleInputChange}
                />
            </div>
        </fieldset>
        <fieldset>
            <div className="form-group">
                <label>Hourly Rate</label>
                <input 
                    type="number"
                    name="rate"
                    required
                    className="form-control"
                    //added the ternary to handle the changing state error
                    value={employee.rate ? employee.rate : 0}
                    onChange={handleInputChange}
                />
            </div>
        </fieldset>
        <fieldset>
            <div className="form-group">
                <button onClick={handleSave} className="form-btn btn-primary">Save Profile</button>
            </div>
        </fieldset>
    </form>
)
}
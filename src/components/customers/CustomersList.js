import { useEffect, useState } from "react"
import { getNonStaffUsers } from "../../services/userService"
import "./Customers.css"
import { User } from "../users/User"
import { Link } from "react-router-dom"
export const CustomerList = () => {
    const [customers, setCustomers] = useState([])
    //get state of nonstaff
    //save to state
    useEffect(() => {
        getNonStaffUsers().then((customerArray) => {
            setCustomers(customerArray)
        })
    }, [])
    //passes in objects as props
    return <div className="customers">
        {customers.map(customerObj => {
            return (
                <Link to={`/customers/${customerObj.id}`}>
                    <User
                        key={customerObj.id}
                        user={customerObj} />
                </Link>)

        })}
    </div>
}


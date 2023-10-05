import { useParams } from "react-router-dom"
import "./Customer.css"
import { useEffect, useState } from "react"
import { getCustomerByUserId } from "../../services/customerService"

export const CustomerDetails = () => {
    const [customer, setCustomer] = useState({})
    const { customerId } = useParams()

    useEffect(() => {
        //fetch data on customer clicked
        getCustomerByUserId(customerId).then(data => {
            //becuase fetch value is an object inside of an array, strip array level
            const customerObj = data[0]
            setCustomer(customerObj)
        })
    }, [customerId])

    return <section className="customer">
        {/* //because user will be undefined initially. give it an optional chain */}
        <header className="customer-header">{customer.user?.fullName}</header>
        <div>
            <span className="customer-info">Email: </span>
            {customer.user?.email}
        </div>
        <div>
            <span className="customer-info">Address: </span>
            {customer.address}
        </div>
        <div>
            <span className="customer-info">Phone Number: </span>
            {customer.phoneNumber}
        </div>
    </section>
}
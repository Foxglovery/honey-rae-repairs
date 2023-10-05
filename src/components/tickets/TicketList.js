import { useEffect, useState } from "react"
import { getAllTickets } from "../../services/ticketService"
import "./Tickets.css"
import { Ticket } from "./Ticket"
import { getAllEmployees } from "../../services/employeeService"
import { TicketFilterBar } from "./TicketFilterBar"

export const TicketList = () => {
    const [allTickets, setAllTickets] = useState([]) // returns a state value and a function to update it
    const [employees, setEmployees] = useState([])
    const [showEmergencyOnly, setShowEmergencyOnly] = useState(false)// returns a state value and a function to update it
    const [filteredTickets, setFilteredTickets] = useState([])
    const [searchTerm, setSearchTerm] = useState("")
    //On initial render, get tickets
    useEffect(() => {
        getAllTickets().then(ticketArray => {
            setAllTickets(ticketArray)//fills a new array with state of database tickets
            console.log("tickets set")
        })
        //MOVED THIS HERE FROM TICKET.JS TO CUT DOWN ON FETCH CALLS.
        getAllEmployees().then(employeeArray => {
            setEmployees(employeeArray)
        })
    }, [])

    useEffect(() => {
        if (searchTerm) {
            const ticketSearch = allTickets.filter(ticket => ticket.description.toLowerCase().includes(searchTerm.toLowerCase()))
            //all matches replace the current filtered tickets
            setFilteredTickets(ticketSearch)
        } else {
            setFilteredTickets(allTickets)
        }

        //when searchterm changes, filter filteredTickets 
        //to include value of searchterm
        //if so filtered tickets 
    }, [searchTerm])

    useEffect(() => {
        if (showEmergencyOnly) {
            const emergencyTickets = allTickets.filter(ticket => ticket.emergency === true)
            setFilteredTickets(emergencyTickets)
        } else {
            setFilteredTickets(allTickets)
        }
    }, [showEmergencyOnly, allTickets]) //when showEmergencyOnly changes, this useEffect will run

    return (<div className="tickets-container">
        <h2>Tickets</h2>
        <TicketFilterBar 
            setSearchTerm={setSearchTerm}
            setShowEmergencyOnly={setShowEmergencyOnly} />
        <article className="tickets">
            {filteredTickets.map((ticketObject) => {
                return (
                    <Ticket
                        ticket={ticketObject}
                        employees={employees} //EASILY PASS IN FETCHED DATA AS PROPS FOR CHILD MODULE. EASY TO EAT!!!
                        key={ticketObject.id} />//passes in prop called ticket
                )
            })}
        </article>
    </div>)
}

import { useEffect, useState } from "react"
import { getAllTickets } from "../../services/ticketService"
import "./Tickets.css"
import { Ticket } from "./Ticket"

export const TicketList = () => {
    const [allTickets, setAllTickets] = useState([]) // returns a state value and a function to update it
    const [showEmergencyOnly, setShowEmergencyOnly] = useState(false)// returns a state value and a function to update it
    const [filteredTickets, setFilteredTickets] = useState([])
    const [searchTerm, setSearchTerm] = useState("")
    //On initial render, get tickets
    useEffect(() => {
        getAllTickets().then(ticketArray => {
            setAllTickets(ticketArray)//fills a new array with state of database tickets
            console.log("tickets set")
        })
    }, [])

    useEffect(() => {
        if (searchTerm) {
            const ticketSearch = allTickets.filter(ticket => ticket.description.toLowerCase().includes(searchTerm.toLowerCase()))
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
        <div className="filter-bar">
            <button className="filter-btn btn-primary" onClick={() => { //button on click sets emergency state to true
                setShowEmergencyOnly(true)
            }}>Emergency</button>


            <button className="filter-btn btn-info" onClick={() => {
                setShowEmergencyOnly(false)
            }}>Show All</button>
            <input
                onChange={(event) => {
                    setSearchTerm(event.target.value)

                }}
                type="text"
                placeholder="Search Tickets"
                className="ticket-search"
                value={searchTerm}
            />
        </div>
        <article className="tickets">
            {filteredTickets.map((ticketObject) => {
                return (
                    <Ticket ticket={ticketObject} name="Joe" key={ticketObject.id} />//passes in prop called ticket
                )
            })}
        </article>
    </div>)
}

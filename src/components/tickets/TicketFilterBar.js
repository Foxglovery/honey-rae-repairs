export const TicketFilterBar = ({setSearchTerm, setShowEmergencyOnly}) => {
    return (
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
            />
        </div>
    )
}
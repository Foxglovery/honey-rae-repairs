import { useNavigate } from "react-router-dom";

export const TicketFilterBar = ({
  setSearchTerm,
  setShowEmergencyOnly,
  setShowOpenTickets,
  currentUser
}) => {
    const navigate = useNavigate()

  return (
    <div className="filter-bar">
      {currentUser.isStaff ? (
        <>
          <button
            className="filter-btn btn-primary"
            onClick={() => {
              //button on click sets emergency state to true
              setShowEmergencyOnly(true);
            }}
          >
            Emergency
          </button>

          <button
            className="filter-btn btn-info"
            onClick={() => {
              setShowEmergencyOnly(false);
            }}
          >
            Show All
          </button>
          <input
            onChange={(event) => {
              setSearchTerm(event.target.value);
            }}
            type="text"
            placeholder="Search Tickets"
            className="ticket-search"
          />
        </>
      ) : (
        <>
        <button className="filter-btn btn-primary" onClick={() => {
            navigate("/tickets/create")
        }} >Create Ticket</button>
        {/* DONT FORGET THE ANONYMOUS FUNCTION IN THE ONCLICK */}
        <button className="filter-btn btn-info" onClick={() => {setShowOpenTickets(true)}}>Open Tickets</button>
        <button className="filter-btn btn-secondary" onClick={() => {setShowOpenTickets(false)}} >All Tickets</button>
        </>
      )}
    </div>
  );
};

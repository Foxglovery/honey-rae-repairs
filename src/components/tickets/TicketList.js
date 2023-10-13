import { useEffect, useState } from "react";
import { getAllTickets } from "../../services/ticketService";
import "./Tickets.css";
import { Ticket } from "./Ticket";
import { TicketFilterBar } from "./TicketFilterBar";

export const TicketList = ({ currentUser }) => {
  const [allTickets, setAllTickets] = useState([]); // returns a state value and a function to update it
  const [showEmergencyOnly, setShowEmergencyOnly] = useState(false); // returns a state value and a function to update it
  const [showOpenTickets, setShowOpenTickets] = useState(false)
  const [filteredTickets, setFilteredTickets] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  //added state for opentickets
  
  //On initial render, get tickets
  //this updates our tickets when edited
  const getAndSetTickets = () => {
    getAllTickets().then((ticketArray) => {
      //added logic to only display customer tickets they created if currentUser is not Staff
        if (currentUser.isStaff) {
        setAllTickets(ticketArray); //fills a new array with state of database tickets
        console.log("tickets set");
      } else {
        const customerTickets = ticketArray.filter(
          (ticket) => ticket.userId === currentUser.id
        );
        setAllTickets(customerTickets)
      }
    });
  };

  useEffect(() => {
    getAndSetTickets();
    //adding currentUser to Dependency array allows customer ticket list to persist upon refresh by updating the state anytime the currentuser changes
  }, [currentUser]);

  useEffect(() => {
    if (searchTerm) {
      const ticketSearch = allTickets.filter((ticket) =>
        ticket.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
      //all matches replace the current filtered tickets
      setFilteredTickets(ticketSearch);
    } else {
      setFilteredTickets(allTickets);
    }

    //when searchterm changes, filter filteredTickets
    //to include value of searchterm
    //if so filtered tickets
  }, [searchTerm]);

  useEffect(() => {
    if (showEmergencyOnly) {
      const emergencyTickets = allTickets.filter(
        (ticket) => ticket.emergency === true
      );
      setFilteredTickets(emergencyTickets);
    } else {
      setFilteredTickets(allTickets);
    }
  }, [showEmergencyOnly, allTickets]); //when showEmergencyOnly changes, this useEffect will run

  //user toggles tickets without completion date
  useEffect(() => {
    if(showOpenTickets) {
      const openTickets = allTickets.filter((ticket) => ticket.dateCompleted === "");
      setFilteredTickets(openTickets)
    } else {
      setFilteredTickets(allTickets)
    }
  },[showOpenTickets, allTickets])

  return (
    <div className="tickets-container">
      <h2>Tickets</h2>
      <TicketFilterBar
        setSearchTerm={setSearchTerm}
        setShowEmergencyOnly={setShowEmergencyOnly}
        setShowOpenTickets={setShowOpenTickets}
        currentUser={currentUser}
      />
      <article className="tickets">
        {filteredTickets.map((ticketObject) => {
          return (
            <Ticket
              ticket={ticketObject}
              key={ticketObject.id} //passes in prop called ticket
              currentUser={currentUser}
              getAndSetTickets={getAndSetTickets}
            />
          );
        })}
      </article>
    </div>
  );
};

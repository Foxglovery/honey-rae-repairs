import { useState } from "react";
import "./Form.css";
import { submitTicket } from "../../services/ticketService";
import { useNavigate } from "react-router-dom";

export const TicketForm = ({ currentUser }) => {
  //   placed default values for properties in useState to ensure no blank fields upon submission
  const [ticket, setTicket] = useState({ description: "", emergency: false });

  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    if (ticket.description) {
      const newTicket = {
        userId: currentUser.id,
        description: ticket.description,
        emergency: ticket.emergency,
        dateCompleted: "",
      };
      submitTicket(newTicket).then(() => {
        navigate(`/tickets`);
      });
    } else {
      window.alert("You gotta tell us whats going on!");
    }
  };

  return (
    <form>
      <h2>New Service Ticket</h2>
      <fieldset>
        <div className="form-group">
          <label>Description</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Brief Description Of Problem"
            onChange={(event) => {
              // spreads out all the properties of ticket into copy allowing us to update individual properties
              const ticketCopy = { ...ticket };
              //specifies which entry to populate with user input from event
              ticketCopy.description = event.target.value;
              //sets state of ticket to include user inputs on copy
              setTicket(ticketCopy);
            }}
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          {/* wrap checkbox in label to keep it from misbehaving */}
          <label>
            Emergency
            <input
              type="checkbox"
              onChange={(event) => {
                const ticketCopy = { ...ticket };
                ticketCopy.emergency = event.target.checked;
                setTicket(ticketCopy);
              }}
            />
          </label>
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <button className="form-btn btn-info" onClick={handleSubmit}>
            Submit Ticket
          </button>
        </div>
      </fieldset>
    </form>
  );
};

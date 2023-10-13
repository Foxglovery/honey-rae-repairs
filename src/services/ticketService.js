export const getAllTickets = async () => {
  const res = await fetch(
    "http://localhost:8088/serviceTickets?_embed=employeeTickets"
  );
  return await res.json();
};

export const assignTicket = (employeeTicket) => {
  return fetch("http://localhost:8088/employeeTickets", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(employeeTicket),
  });
};

export const updateTicket = (ticket) => {
  // fetches and updates service ticket with id of ticket closed
  return fetch(`http://localhost:8088/serviceTickets/${ticket.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(ticket),
  });
};

export const deleteTicket = (ticketId) => {
  return fetch(`http://localhost:8088/serviceTickets/${ticketId}`, {
    method: "DELETE",
  });
};

export const submitTicket = (ticket) => {
  return fetch("http://localhost:8088/serviceTickets", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(ticket),
  });
};

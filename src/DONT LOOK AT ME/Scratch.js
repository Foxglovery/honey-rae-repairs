useEffect(() => {
  if(showOpenTickets) {
    const openTickets = allTickets.filter((ticket) => !ticket.dateCompleted);
    setFilteredTickets(openTickets)
  } else {
    setFilteredTickets(allTickets)
  }
},[showOpenTickets, allTickets])
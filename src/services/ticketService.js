export const getAllTickets = async () => {
    const res = await fetch("http://localhost:8088/serviceTickets?_embed=employeeTickets")
    return await res.json()

}


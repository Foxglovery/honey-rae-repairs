export const getAllEmployees = async () => {
    const res = await fetch('http://localhost:8088/employees?_expand=user')
    return await res.json()
}

export const getEmployeeById = (userId) => {
    return fetch(`http://localhost:8088/employees?userId=${userId}&_expand=user&_embed=employeeTickets`).then((res) =>
    res.json())
}
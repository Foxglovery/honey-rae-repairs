export const getAllEmployees = async () => {
    const res = await fetch('http://localhost:8088/employees?_expand=user')
    return await res.json()
}
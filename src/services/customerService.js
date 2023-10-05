export const getCustomerByUserId = (userId) => {
    //fetches customer deets based upon the userId passed in by clicking 
    return fetch(`http://localhost:8088/customers?userId=${userId}&_expand=user`).then((res) =>
    res.json())
}
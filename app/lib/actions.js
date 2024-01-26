import axios from "axios";
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const insertEmployee = async (data) => {
    let res = await fetch(`${API_URL}/employee`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    })
}

export const deleteEmployee = async (empId) => {
    let res = await fetch(`${API_URL}/employee/${empId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    })
}

export const editEmployee = async (empId,data) => {
    console.log(empId,data)
    let res = await fetch(`${API_URL}/employee/${empId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json", 
        },
        body: JSON.stringify(data)
    })

    return res;
}
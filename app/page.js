"use client";
import Image from "next/image";
import List from "./employee/list/page";
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const ListContext = createContext([]);

export const useListContext = () =>{
  return useContext(ListContext);
}

export default function Home() {
  const [employeeData, setEmployeeData] = useState([]);
  const fetchEmployees = async () => {
    try {
      const response = await axios.get(`${API_URL}/employee`);
      console.log(response.data);
      setEmployeeData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, [])
  return (
    <ListContext.Provider value={{employeeData, setEmployeeData}}>
      <List />
    </ListContext.Provider>
  );
}

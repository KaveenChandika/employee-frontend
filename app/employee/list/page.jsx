"use client";
import React, { useEffect, useState } from 'react'
import Cards from '../../components/Cards'
import { deleteEmployee, getEmployee } from '../../lib/actions'
import axios from 'axios';
import Table from '../../components/Table';
import GridSvg from '../../components/GridSvg';
import TableIcon from '../../components/TableIcon';
import Link from 'next/link';
import Swal from 'sweetalert2';
const API_URL = process.env.NEXT_PUBLIC_API_URL;

const List = () => {
  const [employeeData, setEmployeeData] = useState([]);
  const [viewStatus, setViewStatus] = useState(true);
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

  const handleView = () => {
    setViewStatus(state => !state);
  }

  const handleDeleteEmployee = (id) => {
    Swal.fire({
      title: '',
      text: 'Do you want to delete this employee?',
      icon: 'error',
      showCancelButton: true,
      confirmButtonText: 'Yes delete!',
    }).then((value) => {
      if (value.isConfirmed) {
        Swal.fire(
          'Deleted!',
          'Employee Delete Successfully',
          'success'
        ).then((value) => {
          if (value) {
            deleteEmployee(id)
            window.location.reload();
          }
        })
      }
    })
  }

  return (
    <>
      <div className='m-6 flex justify-end items-center gap-2' >
        <Link href="/employee/add">
          <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-3xl text-sm px-5 py-2.5  dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
            Add Employee
          </button>
        </Link>
        <button className='rounded-full bg-blue-950 p-2' onClick={handleView} >
          {viewStatus ? (<TableIcon />) : (<GridSvg />)}
        </button>

      </div>
        {viewStatus ? (
          <div className='grid grid-cols-4 gap-4 m-10'>
          {employeeData?.map((dt) => (
            <Cards
              name={`${dt.first_name} ${dt.last_name}`}
              email={dt.email}
              gender={dt.gender}
              number={dt.number}
              photo={dt.photo ? dt.photo : ""}
              id={dt._id}
              handleDeleteEmployee={handleDeleteEmployee}
              key={dt._id}
            />
          ))}
          </div>
        ) : (
          <Table employeeData={employeeData} handleDeleteEmployee={handleDeleteEmployee} />
        )}

    </>
  )
}

export default List
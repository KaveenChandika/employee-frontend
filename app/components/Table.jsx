import React from 'react'
import { useListContext } from '../page';
import BinSvg from './BinSvg';
import EditIcon from './EditIcon';
import Swal from 'sweetalert2';
import { useRouter } from 'next/router';
import { deleteEmployee } from '../lib/actions';
const IMAGE_PLACEHOLDER = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"

const Table = ({ employeeData,handleDeleteEmployee }) => {
    return (
        <div className='m-3'>
            <table border="1" className="bg-white border border-gray-300 w-[100%]">
                <thead className="bg-blue-500 text-xs  uppercase dark:bg-gray-700 dark:text-gray-400 text-white">
                    <tr>
                        <th className="px-6 py-3">Image</th>
                        <th className='w-30'>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Gender</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {employeeData && employeeData.map((dt) => (
                        <tr key={dt._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 ">
                            <td className='p-2'><img alt='' className='rounded-xl' src={dt.photo ? dt.photo : IMAGE_PLACEHOLDER} width="128" height={'128'} /></td>
                            <td className='p-2' >{dt.first_name}</td>
                            <td className='p-2' >{dt.last_name}</td>
                            <td className='p-2' >{dt.email}</td>
                            <td className='p-2' >{dt.number}</td>
                            <td className='p-2' >{dt.gender === "M" ? "Male" : "Female"}</td>
                            <td className='flex justify-center items-center gap-1 mt-4'>
                                <button className='bg-red-700 rounded-full p-2' onClick={() => { handleDeleteEmployee(dt._id) }}><BinSvg /></button>
                                <a href={`/employee/edit/${dt._id}`}>
                                    <button className='bg-green-600 rounded-full p-2' onClick={() => { handleEditView(dt._id) }}><EditIcon /></button>
                                </a>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Table
import React from 'react'
import BinSvg from './BinSvg'
import EditIcon from './EditIcon'
import Link from 'next/link'
const IMAGE_PLACEHOLDER = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"

const Cards = ({ photo, name, email, number, gender, id, handleDeleteEmployee }) => {
    return (
        <div>
            <div className="bg-white border w-[100%] border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <a href="#">
                    <img className="rounded-t-lg w-[100%] h-full" src={photo ? photo : IMAGE_PLACEHOLDER} alt="" />
                </a>
                <div className="p-5">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{name}</h5>
                    <p className="mb-2  tracking-tight text-gray-900 dark:text-white">{email}</p>
                    <p className="mb-2  tracking-tight text-gray-900 dark:text-white">{number}</p>
                    <p className="mb-2  tracking-tight text-gray-900 dark:text-white">{gender == 'M' ? 'Male' : 'Female'}</p>
                    <div className='flex justify-end gap-2'>
                        <button className='bg-red-700 rounded-full p-2' onClick={() => { handleDeleteEmployee(id) }}><BinSvg /></button>
                        <a href={`/employee/edit/${id}`}>
                            <button className='bg-green-600 rounded-full p-2'><EditIcon /></button>
                        </a>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Cards
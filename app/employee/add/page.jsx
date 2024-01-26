import React from 'react'
import Form from '../../components/Form'
import Link from 'next/link'

const EmployeeAdd = () => {
    return (
        <>
            <div className='flex justify-end m-4'>
                <Link href="/employee/list">
                    <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-3xl text-sm px-5 py-2.5  dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                        List View
                    </button>
                </Link>
            </div>
            <Form formName="Add Employee" btnName="Add" />
        </>
    )
}

export default EmployeeAdd
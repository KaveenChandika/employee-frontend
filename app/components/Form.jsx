"use client";
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { editEmployee, getEmployeeById, insertEmployee } from '../lib/actions';
import axios from 'axios';
import Image from 'next/image';
import Swal from 'sweetalert2';
const API_URL = process.env.NEXT_PUBLIC_API_URL;
const IMAGE_PLACEHOLDER = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"

const Form = ({ formName, btnName, id = "" }) => {
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [gender, setGender] = useState("");
    const [employeeId, setEmployeeId] = useState("");
    const [photo, setPhoto] = useState("");

    const [isValidFname, setIsValidFname] = useState(true);
    const [isValidLname, setIsValidLname] = useState(true);
    const [isValidEmail, setIsValidEmail] = useState(true);
    const [isValiPhone, setIsValidPhone] = useState(true);

    // Form Validation
    const handleFnameChange = (e) => {
        const inputValue = e.target.value;
        setFirstName(inputValue);

        const nameRegex = /^[A-Za-z ]{6,10}$/;
        setIsValidFname(nameRegex.test(inputValue));
    };
    const handleLnameChange = (e) => {
        const inputValue = e.target.value;
        setLastName(inputValue)

        const nameRegex = /^[A-Za-z ]{6,10}$/;
        setIsValidLname(nameRegex.test(inputValue))
    };
    const handleEmailChange = (e) => {
        const inputValue = e.target.value;
        setEmail(inputValue)

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setIsValidEmail(emailRegex.test(inputValue))
    };
    const handlePhoneChange = (e) => {
        const inputValue = e.target.value;
        setPhone(inputValue);

        const phoneNumberRegex = /^(?:\+94|0)?(?:7\d{8}|[1-5]\d{7})$/;
        setIsValidPhone(phoneNumberRegex.test(inputValue));
    }

    // Insert Employee Details
    const handleSubmit = () => {
        if ((isValidFname && firstName !="" ) && (isValidLname && lastName !="") && (isValidEmail) && (isValiPhone)) {
            let objEmployeeDetails = {
                first_name: firstName,
                last_name: lastName,
                email,
                number: phone,
                gender,
                photo: photo,
                id: employeeId
            }
            insertEmployee(objEmployeeDetails);
            window.location.href="/employee/list";
        } else {
            Swal.fire({
                title: '',
                text: 'Fields Cannot Be Empty Or Invalid Fields',
                icon: 'error',
            })
        }
    }

    const handleEdit = () => {
        if (id != "") {
            if ((isValidFname && firstName !="" ) && (isValidLname && lastName !="") && (isValidEmail) && (isValiPhone)) {
                let editedEmployee = {
                    first_name: firstName,
                    last_name: lastName,
                    email,
                    number: phone,
                    gender,
                    photo: photo,
                    id: employeeId
                }
                editEmployee(id, editedEmployee)
                window.location.href="/employee/list";
            } else {
                Swal.fire({
                    title: '',
                    text: 'Fields Cannot Be Empty Or Invalid Fields',
                    icon: 'error',
                })
            }
        }
    }

    // Get Employee By Id
    const getEmployee = async (id) => {
        try {
            const response = await axios.get(`${API_URL}/employee/${id}`);
            setFirstName(response.data.first_name)
            setLastName(response.data.last_name)
            setEmail(response.data.email)
            setPhone(response.data.number)
            setGender(response.data.gender)
            setPhoto(response.data.photo)
            setEmployeeId(response.data.id)
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    useEffect(() => {
        if (id) {
            getEmployee(id)
        }
    }, [id])


    return (
        <div className='flex justify-center items-center w-[100%]'>
            <form className="w-[40%]  p-10 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400">
                <div className='flex justify-center'>
                    <h1 className='font-bold text-2xl uppercase'>{formName}</h1>
                </div>
                <div >
                    <div className="mt-5 flex justify-end items-center gap-2">
                        <label for="" className=" flex-3 block mb-2 text-sm font-medium text-gray-900 dark:text-white">Firstname</label>
                        <input
                            type="text"
                            className="bg-gray-50 border flex-3 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Firstname" required
                            value={firstName}
                            onChange={handleFnameChange}
                        />
                    </div>
                    {!isValidFname && (
                        <p style={{ color: 'red' }}>
                            Fisrtname should only contain alphabets, be between 6 and 10 characters.
                        </p>
                    )}
                </div>
                <div >
                    <div className="mt-5 flex justify-end items-center gap-2">
                        <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Lastname</label>
                        <input
                            type="text"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Lastname" required
                            value={lastName}
                            onChange={handleLnameChange}
                        />
                    </div>
                    {!isValidLname && (
                        <p style={{ color: 'red' }}>
                            Lastname should only contain alphabets, be between 6 and 10 characters.
                        </p>
                    )}
                </div>
                <div>
                    <div className="mt-5 flex justify-end items-center gap-2">
                        <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                        <input
                            type="text"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Email" required
                            value={email}
                            onChange={handleEmailChange}
                        />
                    </div>
                    {!isValidEmail && (
                        <p style={{ color: 'red' }}>
                            Please Enter the valid Email
                        </p>
                    )}
                </div>
                <div>
                    <div className="mt-5 flex justify-between items-center gap-2">
                        <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone</label>
                        <input
                            type="text"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Phone" required
                            value={phone}
                            onChange={handlePhoneChange}
                        />
                    </div>
                    {!isValiPhone && (
                        <p style={{ color: 'red' }}>
                            Invalid Mobile Number
                        </p>
                    )}
                </div>
                <div className="mt-5 mb-5 flex justify-between items-center gap-2">
                    <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Gender</label>
                    <select value={gender} onChange={(e) => setGender(e.target.value)} id="countries_multiple" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option selected>Choose Gender</option>
                        <option value="M">Male</option>
                        <option value="F">Female</option>
                    </select>
                </div>
                <div className='flex justify-end'>
                    {id ? (
                        <div>
                            <Image src={photo} alt='Profile Image' width={200} height={200} />
                        </div>
                    ) : ""}
                </div>
                <div className='flex justify-end mt-2'>
                    {id ? (
                        <button onClick={handleEdit} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">{btnName}</button>
                    ) : (
                        <div>
                            <button onClick={handleSubmit} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">{btnName}</button>
                        </div>
                    )}
                </div>
            </form>
        </div>
    )
}

export default Form
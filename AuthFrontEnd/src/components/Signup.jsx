import React, { useState } from 'react'
import Input from './Input';
import axios from 'axios';

const Signup = ({ formType, setFormType }) => {
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [middleName, setMiddleName] = useState("");
    const [lastName, setLastName] = useState("");
    const [role, setRole] = useState("");
    const [password, setPassword] = useState("");
    const [otp, setOtp] = useState(0);

    const [formStage, setFormStage] = useState(false);

    async function mailHandler(e) {
        e.preventDefault();
        try {
            const response = await axios.post(`http://localhost:3000/api/v1/sendotp`, {
                email
            });
            console.log(response);
            if (response.data.success == true) {
                setFormStage(!formStage);
            }
        }
        catch (e) {
            console.log(e.message);
        }
    }

    async function createUserHandler(e) {
        e.preventDefault();
        try {
            const response = await axios.post(`http://localhost:3000/api/v1/signup`, {
                firstName,
                middleName,
                lastName,
                email,
                password,
                role,
                otp
            })
            console.log(response);
            if (response.data.success == true) {
                setFormType("Login");
            }
        }
        catch (e) {
            console.log(e.message);
        }
    }

    return (
        <>
            {
                formStage ? <>
                    <div className='w-full h-full flex justify-center items-center'>
                        <form className='w-1/3 h-1/2'>
                            <div className='bg-gray-100 p-2 flex flex-col gap-3 rounded-2xl'>
                                <h2 className="text-2xl font-bold text-center text-gray-900">Create Account</h2>
                                <Input inputValue={firstName} type={"text"} setInputValue={setFirstName} placeholder={"First Name"} labelName={"First Name"} />
                                <Input inputValue={middleName} type={"text"} setInputValue={setMiddleName} placeholder={"Middle Name"} labelName={"Middle Name"} />
                                <Input inputValue={lastName} type={"text"} setInputValue={setLastName} placeholder={"Last Name"} labelName={"Last Name"} />
                                <Input inputValue={email} type={"email"} setInputValue={setEmail} placeholder={"Email Address"} labelName={"Email"} />
                                <Input inputValue={password} type={"password"} setInputValue={setPassword} placeholder={"Password"} labelName={"Password"} />
                                <Input inputValue={role} type={"text"} setInputValue={setRole} placeholder={"Role"} labelName={"Role"} />
                                <Input inputValue={otp} type={"text"} setInputValue={setOtp} placeholder={"OTP"} labelName={"OTP"} />
                                <div className='w-full flex justify-center items-center'>

                                    <button className='w-full bg-blue-600 text-white py-2 px-4 rounded-xl hover:bg-blue-900 hover:cursor-pointer transition' onClick={(e) => {
                                        createUserHandler(e)
                                    }}>Submit</button>
                                </div>

                            </div>
                        </form>
                    </div>
                </> : <div className='w-full h-full flex justify-center items-center'>
                    <form className='w-1/3 h-1/2'>
                        <div className=' bg-gray-100 p-2 flex flex-col gap-3 rounded-2xl'>
                            <h2 className="text-2xl font-bold text-center text-gray-900">Generate OTP</h2>
                            <Input inputValue={email} type={"email"} setInputValue={setEmail} placeholder={"Email Address"} labelName={"Email"} />
                            <div className='w-full flex justify-center items-center'>

                                <button className='w-full bg-blue-600 text-white py-2 px-4 rounded-xl hover:bg-blue-900 hover:cursor-pointer transition' onClick={(e) => { mailHandler(e) }}>Send Email</button>
                            </div>
                        </div>
                    </form>
                </div>
            }

        </>
    )
}

export default Signup
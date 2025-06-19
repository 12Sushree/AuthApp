import React, { useState } from 'react'
import Input from './Input'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const loginHandler = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/api/v1/login', {
                email,
                password
            });
            if (response.data.success == true) {
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("role", response.data.role);
                navigate('/home');
            }
            else {
                alert("Login failed!");
            }
        }
        catch (err) {
            console.log(err);
        }
    }

    return (
        <div className='w-full h-full flex justify-center items-center'>
            <form className='w-1/3 h-1/2'>
                <div className=' bg-gray-100 p-2 flex flex-col gap-3 rounded-2xl'>
                    <h2 className="text-2xl font-bold text-center text-gray-900">Login</h2>
                    <Input inputValue={email} type={"email"} setInputValue={setEmail} placeholder={"Email Address"} labelName={"Email"} />
                    <Input inputValue={password} type={"password"} setInputValue={setPassword} placeholder={"Password"} labelName={"Password"} />
                    <div className='w-full flex justify-center items-center'>

                        <button className='w-full bg-blue-600 text-white py-2 px-4 rounded-xl hover:bg-blue-900 transition hover:cursor-pointer' onClick={(e)=>{
                            loginHandler(e)
                        }}>Submit</button>
                    </div>

                </div>
            </form>
        </div>
    )
}

export default Login
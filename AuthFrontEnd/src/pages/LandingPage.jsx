import React, { useEffect } from 'react'
import Login from '../components/Login';
import Signup from '../components/Signup';
import { useNavigate } from 'react-router-dom';

const LandingPage = ({ formType, setFormType }) => {
    const navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            navigate('/home');
        }
    }, [])
    return (
        <div className='flex flex-col items-center justify-center text-2xl text-black font-bold w-full h-full'>
            {
                formType == "Login" ? <Login /> :
                    formType == "Signup" ? <Signup setFormType={setFormType} /> :
                        <>Landing Page</>

            }


        </div>
    )
}

export default LandingPage
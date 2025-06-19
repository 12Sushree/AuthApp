import React, { useEffect, useState } from 'react'
import LandingPage from '../pages/LandingPage';

const Navbar = ({ setFormType }) => {

    return (
        <div className=' bg-gray-900 h-14 w-full flex justify-between items-center'>
            <div>
                <ul className='text-2xl font-semibold flex gap-4 cursor-pointer text-white'>
                    <li>Home</li>
                    <li>Products</li>
                    <li>About us</li>
                    <li>Contact Us</li>
                </ul>
            </div>

            <div className=' flex mr-3 gap-3'>
                <button className='bg-yellow-700 w-20 p-2 text-white rounded hover:scale-95 duration-200' onClick={(e) => { setFormType("Login") }}>Login</button>
                <button className='bg-red-700 w-20 p-2 text-white rounded hover:scale-95 duration-200' onClick={(e) => { { setFormType("Signup") } }}>Signup</button>
            </div>

        </div>
    )
}

export default Navbar
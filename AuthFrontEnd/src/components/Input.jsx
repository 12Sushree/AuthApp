import React from 'react'

const Input = ({ labelName, placeholder, inputValue, setInputValue, type }) => {
    return (
        <div className='flex gap-3 justify-between items-center '>
            <label className='text-md text-gray-800 mb-1'>{labelName}</label>
            <input className='w-full px-4 py-2 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:border-blue-700 transition' type={type} placeholder={placeholder} value={inputValue} onChange={(e) => {
                setInputValue(e.target.value);
            }} />
        </div>
    )
}

export default Input
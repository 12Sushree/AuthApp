import axios from "axios";
import { useEffect } from "react";

const HomePage = () => {

    useEffect(() => {
        const token = localStorage.getItem("token");
        async function getUserDetails() {
            const response = await axios.get(`http://localhost:3000/api/v1/getuserdetails`, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            })
            console.log(response.data);
        }
        getUserDetails();
    }, [])

    
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-200">
            <h1 className="text-4xl font-bold text-blue-900">Home Page</h1>
        </div>
    )
}

export default HomePage;
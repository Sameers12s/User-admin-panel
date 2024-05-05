import React from 'react'
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import NavBar from '../components/NavBar';

function ForgotPassword() {
    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    axios.defaults.withCredentials = true;

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/forgot-password', { email });
            if (response.data.Status === "Success") {
                navigate('/login');
            } else {
                alert(response.data.message || "An error occurred. Please try again.");
            }
        } catch (err) {
            console.error(err);
            alert("An error occurred. Please try again.");
        }
    };

    return (
        <div><NavBar />
            <div className="min-h-screen flex flex-col justify-center items-center">

                <div className="w-full max-w-md p-8 bg-white rounded shadow-lg rounded-3xl">
                    <h4 className="flex justify-center text-center text-3xl font-semibold mb-4 text-black">Forgot Password</h4>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="flex flex-col">
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Enter your email address"
                                className="rounded-lg p-3 border border-gray-900 p-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-medium rounded-lg p-2 shadow-sm"
                        >
                            Send Reset Link
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ForgotPassword;

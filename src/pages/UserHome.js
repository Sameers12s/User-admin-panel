import React from "react";
import NavBar from "../components/NavBar";

export default function UserHome({
    userData }) {
    const logOut = () => {
        window.localStorage.clear();
        window.location.href = "./login";
    };


    if (!userData) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <NavBar />

            <div className="container mx-auto px-4 py-8">
                <div className="max-w-md mx-auto bg-white shadow-md rounded-lg overflow-hidden">
                    <div className="p-6">
                        <h1 className="text-3xl font-bold text-gray-800 mb-4">Welcome, {userData.name}</h1>
                        <div className="mb-2">
                            <p className=" font-bold text-gray-600 text-sm">Username: {userData.username}</p>
                        </div>
                        <div className="mb-2">
                            <p className="font-bold text-gray-600 text-sm">Account-type: {userData.userType}</p>
                        </div>
                        <div className="mb-6">
                            <p className="font-bold text-gray-600 text-sm">Email: {userData.email}</p>
                        </div>
                        <button
                            onClick={logOut}
                            className="bg-red-500 hover:bg-red-600 text-white py-2 px-6 rounded-md transition-colors duration-300 ease-in-out"
                        >
                            Log Out
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

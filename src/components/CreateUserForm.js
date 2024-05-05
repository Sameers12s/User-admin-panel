import React, { useState } from "react";


export default function CreateUserForm({ setCreateUserOpen, onCreateUser }) {
    const [newUser, setNewUser] = useState({
        name: "",
        username: "",
        email: "",
        password: "",
        userType: "",
        secretKey: "",
    });

    const handleInputChange = (event) => {
        setNewUser({ ...newUser, [event.target.name]: event.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onCreateUser(newUser);
        setCreateUserOpen(false);
    };

    return (
        <div className="">
            <div className="my-5 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
                <h5 className="text-4xl font-bold mb-4">Create User</h5>
            </div>
            <div className="grid grid-cols-3 mb-4">
                <div></div>
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-2 mb-4">
                        <div className="flex items-center">
                            <input
                                id="userTypeUser"
                                type="radio"
                                value="User"
                                name="userType"
                                onChange={handleInputChange}
                            />
                            <label
                                htmlFor="userTypeUser"
                                className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                            >
                                User
                            </label>
                        </div>
                        <div className="flex items-center">
                            <input
                                id="userTypeAdmin"
                                type="radio"
                                value="Admin"
                                name="userType"
                                onChange={handleInputChange}
                            />
                            <label
                                htmlFor="userTypeAdmin"
                                className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                            >
                                Admin
                            </label>
                        </div>
                    </div>
                    {newUser.userType === "Admin" && (
                        <div className="mb-4">
                            <input
                                type="text"
                                id="secretKey"
                                name="secretKey"
                                placeholder="Secret Key"
                                value={newUser.secretKey}
                                onChange={handleInputChange}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                required
                            />
                        </div>
                    )}
                    <div className="mb-4">
                        <input
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Name"
                            value={newUser.name}
                            onChange={handleInputChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <input
                            type="text"
                            id="username"
                            placeholder="Username"
                            name="username"
                            value={newUser.username}
                            onChange={handleInputChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Email Address"
                            value={newUser.email}
                            onChange={handleInputChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Password"
                            value={newUser.password}
                            onChange={handleInputChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            required
                        />
                    </div>
                    <div className="flex items-center justify-end">
                        <button
                            type="button"
                            onClick={() => setCreateUserOpen(false)}
                            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400 mr-2"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400"
                        >
                            Create User
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

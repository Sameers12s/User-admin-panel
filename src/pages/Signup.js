import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


const Signup = () => {
    const navigate = useNavigate();


    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [userType, setUserType] = useState("");
    const [secretKey, setSecretKey] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email, password, username, userType, secretKey);
        if (!name || !username || !email || !password || !confirmPassword || !userType) {
            alert("Please fill in all required fields");
            return;
        }

        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }


        if (userType === "Admin" && secretKey !== "Admin1201") {
            alert("Invalid Admin Secret Key");
            return;
        }


        const userData = {
            name,
            username,
            email,
            password,
            userType,
        };
        fetch("http://localhost:5000/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                if (data.status === "ok") {
                    alert("Registration Successful");
                    navigate("/login");
                } else {
                    alert("Something went wrong");
                }
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    };

    return (
        <section className="h-screen flex flex-col md:flex-row justify-center space-y-10 md:space-y-0 md:space-x-16 items-center my-2 mx-5 md:mx-0 md:my-0">
            <div className="md:w-1/3 max-w-sm">
                <img src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp" alt="" />
            </div>
            <div className="md:w-1/3 max-w-sm">
                <form onSubmit={handleSubmit}>
                    <div className="my-5 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
                        <p className="mx-4 mb-0 text-center text-4xl text-slate-500 font-extrabold " >

                            SIGN UP
                        </p>
                    </div>
                    <div className="grid grid-cols-2 mb-4">
                        <div className="flex items-center">
                            <input id="userTypeUser" type="radio" value="User" name="userType" onChange={(e) => setUserType(e.target.value)} />
                            <label htmlFor="userTypeUser" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">User</label>
                        </div>
                        <div className="flex items-center">
                            <input id="userTypeAdmin" type="radio" value="Admin" name="userType" onChange={(e) => setUserType(e.target.value)} />
                            <label htmlFor="userTypeAdmin" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Admin</label>
                        </div>
                    </div>
                    {userType === "Admin" && (
                        <div className="mb-4">
                            <input className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded" type="text" placeholder="Secret Key" onChange={(e) => setSecretKey(e.target.value)} />
                        </div>
                    )}
                    <input className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mb-4" type="text" placeholder="Name" onChange={(e) => setName(e.target.value)} />
                    <input className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mb-4" type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
                    <input className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mb-4" type="email" placeholder="Email Address" onChange={(e) => setEmail(e.target.value)} />
                    <input className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mb-4" type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />

                    <input
                        className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded "
                        type="password"
                        placeholder="Confirm Password"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <button className="w-full mt-4 bg-blue-600 hover:bg-blue-700 px-4 py-2 text-white uppercase rounded text-xs tracking-wider" type="submit">SIGNUP</button>
                </form>
                <div className="flex item-center mt-4 font-semibold text-sm text-slate-500 text-center md:text-left">
                    Already have an account? <Link to="/" className="ml-1 text-red-600 hover:underline hover:underline-offset-4 font-bold ">Login</Link>
                </div>
            </div>
        </section>
    );
};

export default Signup;

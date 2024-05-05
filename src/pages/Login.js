import React, { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function handleSubmit(e) {
        e.preventDefault();

        console.log(email, password);
        fetch("http://localhost:5000/login", {
            method: "POST",
            crossDomain: true,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({
                email,
                password,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data, "userRegister");
                if (data.status === "ok") {
                    alert("login successful");
                    window.localStorage.setItem("token", data.data);
                    window.localStorage.setItem("loggedIn", true);

                    window.location.href = "./userhome";
                }
            });
    }

    return (
        <section className="h-screen flex flex-col md:flex-row justify-center space-y-10 md:space-y-0 md:space-x-16 items-center my-2 mx-5 md:mx-0 md:my-0">
            <div className="md:w-1/3 max-w-sm">
                <img
                    src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                    alt=""
                />
            </div>

            <div className="md:w-1/3 max-w-sm">
                <form onSubmit={handleSubmit}>
                    <div className="my-5 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
                        <p className="mx-4 mb-0 text-center text-4xl text-slate-500 font-extrabold ">
                            <Link to="/login">LOGIN</Link>
                        </p>
                    </div>
                    <input
                        className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded"
                        type="text"
                        placeholder="Email Address"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4"
                        type="password"
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <div className="mt-4 flex justify-between font-semibold text-sm">

                        <a
                            className="t text-blue-600 hover:text-blue-700 hover:underline hover:underline-offset-4"
                            href="/forgot-password"
                        >
                            Forgot Password?
                        </a>
                    </div>
                    <div className="text-center md:text-left">
                        <button
                            className="btn btn-primary w-full mt-4 bg-blue-600 hover:bg-blue-700 px-4 py-2 text-white uppercase rounded text-xs tracking-wider"
                            type="submit"
                        >
                            Login
                        </button>
                    </div>
                    <div className="flex item-center mt-4 font-semibold text-sm text-slate-500 text-center md:text-left">
                        Don&apos;t have an account?{" "}
                        <a
                            className="ml-1 text-red-600 hover:underline hover:underline-offset-4"
                            href="/Signup"
                        >
                            Sign Up
                        </a>

                    </div>

                </form>
            </div>
        </section>
    );
};

export default Login;
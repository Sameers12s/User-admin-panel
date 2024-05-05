import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminHome from "../pages/AdminHome";
import UserHome from "../pages/UserHome";

export default function UserDetails() {
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);
    const [admin, setAdmin] = useState(false);

    useEffect(() => {
        fetch("http://localhost:5000/userData", {
            method: "POST",
            crossDomain: true,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({
                token: window.localStorage.getItem("token"),
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data, "userData");
                if (data.data.userType === "Admin") {
                    setAdmin(true);
                    navigate("/AdminHome"); // Redirect to AdminHome
                }

                setUserData(data.data);

                if (data.data === "token expired") {
                    alert("Token expired login again");
                    window.localStorage.clear();
                    navigate("/login"); // Redirect to login page
                }
            });
    }, [navigate]);

    if (userData === null) {
        return null; // Render nothing until userData is fetched
    }

    return admin ? <AdminHome /> : <UserHome userData={userData} />;
}

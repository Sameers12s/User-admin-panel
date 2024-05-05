import React, { useEffect, useState } from "react";
import { faTrash, faSearch, faPlus, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CreateUserForm from "../components/CreateUserForm";
import NavBar from "../components/NavBar";

export default function AdminHome() {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [createUserOpen, setCreateUserOpen] = useState(false);

  useEffect(() => {
    getAllUser();
  }, [searchQuery]);

  // Function to fetch all users
  const getAllUser = async () => {
    try {
      const response = await fetch(`http://localhost:5000/getAllUser?search=${searchQuery}`, {
        method: "GET",
      });
      const userData = await response.json();
      setData(userData.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const logOut = () => {
    window.localStorage.clear();
    window.location.href = "./login";
  };

  const deleteUser = (id, name) => {
    if (window.confirm(`Are you sure you want to delete ${name}`)) {
      fetch("http://localhost:5000/deleteUser", {
        method: "POST",
        crossDomain: true,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          userid: id,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          alert(data.data);
          getAllUser();
        });
    }
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleCreateUser = async (newUser) => {
    try {
      const endpoint = newUser.userType === "Admin" ? "/createAdminUser" : "/register";
      const response = await fetch(`http://localhost:5000${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });

      const data = await response.json();
      if (data.status === "ok") {
        alert("User created successfully!");
        setCreateUserOpen(false);
        getAllUser(); // Refresh user data after creation
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.error("Error creating user:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div>
      <NavBar />
      <div className="container mx-auto px-4 py-8">
        <h3 className="text-3xl font-bold text-center mb-4">Welcome Admin</h3>
        <div className="relative mb-6">
          {/* Search input */}
          <FontAwesomeIcon icon={faSearch} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            onChange={handleSearch}
            className="py-2 pl-12 pr-4 w-full border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />
          <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500">
            {searchQuery.length > 0 ? `Records Found ${data.length}` : `Total Records ${data.length}`}
          </span>
        </div>
        <table className="w-full mb-8">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="px-6 py-3 text-left">Name</th>
              <th className="px-6 py-3 text-left">Username</th>
              <th className="px-6 py-3 text-left">Email</th>
              <th className="px-6 py-3 text-left">User Type</th>
              <th className="px-6 py-3">Delete</th>
            </tr>
          </thead>
          <tbody>
            {data.map((i) => (
              <tr key={i._id} className="border-b border-gray-200">
                <td className="px-6 py-4">{i.name}</td>
                <td className="px-6 py-4">{i.username}</td>
                <td className="px-6 py-4">{i.email}</td>
                <td className="px-6 py-4">{i.userType}</td>
                <td className="px-6 py-4 text-right">
                  <FontAwesomeIcon
                    icon={faTrash}
                    onClick={() => deleteUser(i._id, i.name)}
                    className="text-red-500 cursor-pointer hover:text-red-700"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* User Creation Form */}
        {createUserOpen && (
          <CreateUserForm onCreateUser={handleCreateUser} setCreateUserOpen={setCreateUserOpen} />
        )}

        {/* Buttons */}
        <div className="flex justify-between mb-4">
          <button
            onClick={() => setCreateUserOpen(true)}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-400"
          >
            <FontAwesomeIcon icon={faPlus} className="mr-2" /> Create User
          </button>
          <button
            onClick={logOut}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-400"
          >
            <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" /> Logout
          </button>
        </div>
      </div>
    </div>
  );
}

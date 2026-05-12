import graduation from "../assets/graduation.png";
import logout from "../assets/logout.png";
import users from "../assets/users.png";
import dashboard from "../assets/dashboard.png";
import Dashoverview from "./Dashoverview";
import Students from "./Students";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
  const [color, setColor] = useState("dashboard");

  const navigate = useNavigate();
  const [logoutColor, setLogoutColor] = useState("");

  const handleLogoutColorChange = () => {
    const colors = [
      "bg-blue-600",
      "bg-purple-600",
      "bg-pink-600",
      "bg-orange-600",
      "bg-teal-600",
      "bg-indigo-600",
      "bg-yellow-600",
    ];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    setLogoutColor(randomColor);
  };


  function handleClick(){
    navigate('/');
  }

  async function axiosDemo(){
  let res = await axios.get("https://studentportal-j1hd.onrender.com/student")
  console.log(res)
  }
  
useEffect(()=>{
    axiosDemo();
})   

  return (
    <div>
      <div className="flex ml-30 mr-30 justify-between mt-5 items-center">
        <div className="flex gap-5">
          <img className="w-13" src={graduation} />
          <div>
            <h1 className="font-bold text-xl">Student Management System</h1>
            <h1 className="text-gray-500">Admin Portal</h1>
          </div>
        </div>
        <div
          className={`flex w-fit px-2 py-2 items-center rounded-xl gap-2 transition-colors duration-300 ${
            logoutColor || "bg-red-600"
          }`}
        >
          <span>
            <img src={logout} className="w-5" alt="" />
          </span>
          <button
            className="text-white cursor-pointer"
            onClick={() => {
              handleClick();
              handleLogoutColorChange();
            }}
          >
            Logout
          </button>
        </div>

      </div>
      <hr className="border-gray-200 mt-3"></hr>
      <div className="ml-30 flex gap-5 mt-2">
        <div className=" flex items-center w-fit px-4 py-2 rounded-xl gap-2">
          <img src={dashboard} className="h-3" />
          <button
            className={` px-4 py-2 rounded ${color === "dashboard" ? "bg-black text-white" : "bg-white text-black"}`}
            onClick={() => setColor("dashboard")}
          >
            Dashboard
          </button>
        </div>
        <div className=" flex items-center w-fit px-4 py-2 rounded-xl gap-2">
          <img src={users} className="h-3" />
          <button
            onClick={() => setColor("student")}
            className={`px-4 py-2 rounded ${color === "student" ? "bg-black text-white" : "bg-white text-black"}`}
          >
            Students
          </button>
        </div>
      </div>
      <hr className="border-gray-200 mt-3"></hr>
      {color === "dashboard" ? <Dashoverview /> : <Students />}
    </div>
  );
};

export default Dashboard;

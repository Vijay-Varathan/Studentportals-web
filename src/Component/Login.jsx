import graduation from "../assets/graduation.png";
import user from "../assets/user1.png";
import lock from "../assets/lock.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const [buttonColor, setButtonColor] = useState("");

  const handleColorChange = () => {
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
    setButtonColor(randomColor);
  };


 const handleLogin = async () => {
  if (!username || !password) {
    toast.info("All inputs are required");
    return;
  }

  try {
    const response = await axios.post("http://13.201.69.20/login", {
      username,
      password,
    });

    if (response.status === 201) {
      toast.success("Login Successful");
      navigate("/dashboard");
    }
  } catch (err) {
    toast.error("Invalid username or password!");
  }
};

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className=" rounded-xl w-110 h-150 bg-white p-10">
        <div className="flex flex-col items-center gap-3">
          <img src={graduation} className="w-20" />
          <h1 className="font-bold text-3xl">Admin Portal</h1>
          <h1 className="text-gray-400">Student Management System</h1>
        </div>
        <div className="flex flex-col gap-5 mt-10">
          <div className="flex flex-col gap-5">
            <label className="font-bold">Username</label>
            <div className="border flex py-2 rounded-xl border-gray-400 gap-5 items-center">
              <span className=" ml-5">
                <img
                  className="w-5 h-5 filter grayscale opacity-60"
                  src={user}
                />
              </span>
              <input
                type="text"
                className="outline-none"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          </div>
          <div className="flex flex-col gap-5">
            <label className="font-bold">Password</label>
            <div className="border flex py-2 rounded-xl border-gray-400 gap-5 items-center">
              <span className=" ml-5">
                <img
                  className="w-5 h-5 filter grayscale opacity-60"
                  src={lock}
                />
              </span>
              <input
                type="password"
                className=" outline-none"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button
            onClick={() => {
              handleLogin();
              handleColorChange();
            }}
            className={`border rounded-lg py-2 text-white mt-2 transition-colors duration-300 ${
              buttonColor || "bg-black"
            }`}
          >
            Sign In
          </button>

        </div>
      </div>
    </div>
  );
};

export default Login;

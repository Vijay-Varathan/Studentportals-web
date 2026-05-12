import { useEffect, useState } from "react";
import users from "../assets/users.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Dashoverview = () => {
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

  function handleClick() {
    navigate("/students");
  }

const[task,setTask]=useState([]);

async function axiosDemo(){
  let res = await axios.get("https://studentportal-j1hd.onrender.com/mark");
  console.log(res.data[2]);
  setTask(res.data);
  }
  useEffect(()=>{
      axiosDemo();
  },[])
  return (
    <div className="ml-30 mr-25">
      <div className="mt-5">
        <h1 className="font-bold text-2xl">Dashboard Overview</h1>
        <h1 className="text-gray-500 mt-5">
          Monitor student performance and academic metrics
        </h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
        <div className="flex justify-around items-center border border-gray-200 w-70 h-30 hover:shadow-lg transition-shadow rounded-xl">
          <div>
            <p className="text-gray-500">Total Students</p>
            <h1 className="font-bold text-3xl mt-1">245</h1>
          </div>
          <div className="rounded-xl bg-blue-600 w-fit px-3 py-3 h-fit">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="lucide lucide-users w-6 h-6 text-white"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
          </div>
        </div>
        <div className=" flex justify-around items-center border border-gray-200 w-70 h-30 hover:shadow-lg transition-shadow rounded-xl">
          <div>
            <p className="text-gray-500">Average Score</p>
            <h1 className="font-bold text-3xl mt-1">85.4%</h1>
          </div>
          <div className="rounded-xl bg-green-500 w-fit px-3 py-3 h-fit">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="lucide lucide-trending-up w-6 h-6 text-white"
            >
              <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline>
              <polyline points="16 7 22 7 22 13"></polyline>
            </svg>
          </div>
        </div>
        <div className="flex justify-around items-center border border-gray-200 w-70 h-30 hover:shadow-lg transition-shadow rounded-xl">
          <div>
            <p className="text-gray-500">Pass Rate</p>
            <h1 className="font-bold text-3xl mt-1">92.3%</h1>
          </div>
          <div className="rounded-xl bg-purple-500 w-fit px-3 py-3 h-fit">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="lucide lucide-graduation-cap w-6 h-6 text-white"
            >
              <path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z"></path>
              <path d="M22 10v6"></path>
              <path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5"></path>
            </svg>
          </div>
        </div>
        <div className="flex justify-around items-center border border-gray-200 w-70 h-30 hover:shadow-lg transition-shadow rounded-xl">
          <div>
            <p className="text-gray-500">Top Performers</p>
            <h1 className="font-bold text-3xl mt-1">45</h1>
          </div>
          <div className="rounded-xl bg-amber-500 w-fit px-3 py-3 h-fit">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="lucide lucide-award w-6 h-6 text-white"
            >
              <path d="m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526"></path>
              <circle cx="12" cy="8" r="6"></circle>
            </svg>
          </div>
        </div>
      </div>
      <div className="border mr-5 border-gray-200 mt-10 h-145 rounded-xl mb-10">
        <div className="px-8 mt-5">
          <h1 className="font-bold text-xl">Student Performance</h1>
          <h1 className="text-gray-500 mt-2">
            Comprehensive marks overview across all subjects
          </h1>
        </div>
        <hr className="border border-gray-200 mt-5"></hr>
        <div className="overflow-x-auto mt-2">
          <div className="overflow-x-auto mt-2">
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr>
                  <th className="text-left px-6 py-4">Roll No.</th>
                  <th className="text-left px-6 py-4">Student Name</th>
                  <th className="text-center px-6 py-4">Tamil</th>
                  <th className="text-center px-6 py-4">English</th>
                  <th className="text-center px-6 py-4">Maths</th>
                  <th className="text-center px-6 py-4">Science</th>
                  <th className="text-center px-6 py-4">Social</th>
                  <th className="text-center px-6 py-4">Total</th>
                  <th className="text-center px-6 py-4">%</th>
                  <th className="text-center px-6 py-4">Grade</th>
                </tr>
              </thead>

              <tbody className="bg-muted/50">
              {task.map((item,index)=>
                <tr key={index} className="border-t border-border border-gray-200 hover:bg-primary/5 transition-colors">
                  <td className="px-6 py-4">
                    <span className="bg-gray-300 rounded-lg px-3 py-1">
                      {item.Marks?.rollno}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <h1 className="font-medium">{item.name}</h1>
                      <h1>{item.std_class}</h1>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">{item.Marks?.tamil  || "-"}</td>
                  <td className="px-6 py-4 text-center">{item.Marks?.english || "-"}</td>
                  <td className="px-6 py-4 text-center">{item.Marks?.maths || "-"}</td>
                  <td className="px-6 py-4 text-center">{item.Marks?.science || "-"}</td>
                  <td className="px-6 py-4 text-center">{item.Marks?.social || "-"}</td>
                  <td className="px-6 py-4 text-center">
                    <span className="bg-gray-200 px-3 py-1 rounded-lg">
                      450/500
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">90%</td>
                  <td className="px-6 py-4 text-center">
                    <span className="bg-green-100 px-2 py-1 rounded-lg">
                      A+
                    </span>
                  </td>
                </tr>
)}

              </tbody>
            </table>
            <hr className="border-gray-200"></hr>
            <div className="w-full flex justify-between items-center mt-5">
              <h1 className="text-gray-400 ml-10">Showing 4 Students</h1>
              <button
                onClick={() => {
                  handleClick();
                  handleColorChange();
                }}
                className={`text-white px-2 py-1 rounded-lg font-bold mr-10 transition-colors duration-300 ${
                  buttonColor || "bg-black"
                }`}
              >
                Manage Students
              </button>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashoverview;

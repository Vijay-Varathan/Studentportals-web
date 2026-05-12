import graduation from "../assets/graduation.png";
import logout from "../assets/logout.png";
import dashboard from "../assets/dashboard.png";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import Dashoverview from "./Dashoverview";
import Students from "./Students";
import users from "../assets/users.png";
import axios from "axios";
import { useParams } from "react-router-dom";

const Studentmarks = () => {
  const { id } = useParams();
  console.log(id);

  const navigate = useNavigate();

  function handleClick() {
    navigate("/students");
  }

  const [buttonColors, setButtonColors] = useState({});

  const handleColorChange = (btnId) => {
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
    setButtonColors((prev) => ({ ...prev, [btnId]: randomColor }));
  };


  const [tamil, setTamil] = useState({ marks: "", totalMarks: 100 });
  const [english, setEnglish] = useState({ marks: "", totalMarks: 100 });
  const [maths, setMaths] = useState({ marks: "", totalMarks: 100 });
  const [science, setScience] = useState({ marks: "", totalMarks: 100 });
  const [social, setSocial] = useState({ marks: "", totalMarks: 100 });
  const [marks, setMarks] = useState(0);
  const [total, setTotal] = useState();

  //Total marks
  useEffect(() => {
    const total =
      Number(tamil.marks) +
      Number(english.marks) +
      Number(maths.marks) +
      Number(science.marks) +
      Number(social.marks);
    setMarks(total);
    const maxmarks =
      Number(tamil.totalMarks) +
      Number(english.totalMarks) +
      Number(maths.totalMarks) +
      Number(science.totalMarks) +
      Number(social.totalMarks);
    setTotal(maxmarks);
    const percent = (total / maxmarks) * 100;
    setPercentage(percent);
    if (total <= 250) {
      setGrade("F");
    } else if (total <= 300) {
      setGrade("C");
    } else if (total <= 400) {
      setGrade("B");
    } else {
      setGrade("A");
    }
  }, [tamil, english, maths, science, social]);

  const [percentage, setPercentage] = useState("0.00");

  const [grade, setGrade] = useState("A");

  useEffect(() => {
    console.log(tamil);
  }, [tamil]);

  function valTamil(e) {
    const name = e.target.name;

    const val = e.target.value;

    setTamil((prev) => ({
      ...prev,
      [name]: val,
    }));
  }

  function valEnglish(e) {
    const name = e.target.name;
    const val = e.target.value;

    setEnglish((prev) => ({
      ...prev,
      [name]: val,
    }));
  }

  function valMaths(e) {
    const name = e.target.name;
    const val = e.target.value;

    setMaths((prev) => ({
      ...prev,
      [name]: val,
    }));
  }

  function valScience(e) {
    const name = e.target.name;
    const val = e.target.value;

    setScience((prev) => ({
      ...prev,
      [name]: val,
    }));
  }

  function valSocial(e) {
    const name = e.target.name;
    const val = e.target.value;

    setSocial((prev) => ({
      ...prev,
      [name]: val,
    }));
  }

  const { id: rollno } = useParams(); // rename for clarity

  // Fetch existing marks when page opens

  useEffect(() => {
    const fetchMarks = async () => {
      try {
        const res = await axios.get(`https://studentportal-j1hd.onrender.com/mark/${rollno}`);
        if (res.data) {
          const mark = res.data;
          setTamil({ marks: mark.tamil ?? "", totalMarks: 100 });
          setEnglish({ marks: mark.english ?? "", totalMarks: 100 });
          setMaths({ marks: mark.maths ?? "", totalMarks: 100 });
          setScience({ marks: mark.science ?? "", totalMarks: 100 });
          setSocial({ marks: mark.social ?? "", totalMarks: 100 });
        }
      } catch (err) {
        console.log("No existing marks yet");
      }
    };
    fetchMarks();
  }, [rollno]);


  const handleSave = async () => {
    try {
      await axios.post(`https://studentportal-j1hd.onrender.com/mark/${rollno}`, {
        tamil: Number(tamil.marks),
        english: Number(english.marks),
        maths: Number(maths.marks),
        science: Number(science.marks),
        social: Number(social.marks),
      });
      toast.success("Marks saved successfully!");
      navigate("/dashboard");
    } catch (err) {
      toast.error("Failed to save marks!");
    }
  };

  return (
    <div>
      <div>
        <button
          onClick={() => {
            handleClick();
            handleColorChange("back");
          }}
          className={`ml-20 mt-10 px-2 py-2 rounded-lg border-2 border-gray-400 transition-colors duration-300 ${
            buttonColors["back"] || "bg-white"
          }`}
        >
          Back to Students
        </button>

      </div>
      <div className="mt-10">
        <div className=" border border-gray-300 mr-40 ml-40 items-center  bg-white rounded-lg">
          <div>
            <h1 className="text-2xl font-bold flex bg-gray-200 px-5 h-30 py-10">
              Updated Students Marks
            </h1>
            <h1></h1>
          </div>

          <div className="flex flex-col gap-5 mt-5">
            <div className="flex justify-around border border-gray-300 mr-40 ml-40 items-center h-30 bg-gray-100 rounded-lg">
              <h1 className="text-2xl font-bold">Tamil</h1>
              <div>
                <h1 className="text-gray-600">Marks Obtained</h1>
                <input
                  name="marks"
                  value={tamil.marks}
                  onChange={(e) => valTamil(e)}
                  className="border border-gray-300 mt-3 w-80 px-2 py-2 bg-white rounded-lg"
                ></input>
              </div>
              <div>
                <h1 className="text-gray-600">Maximum Marks</h1>
                <input
                  name="totalMarks"
                  value={tamil.totalMarks}
                  onChange={(e) => valTamil(e)}
                  className="border border-gray-300 mt-3 w-80 px-2 py-2 bg-white rounded-lg"
                ></input>
              </div>
            </div>
            <div className="flex justify-around border border-gray-300 mr-40 ml-40 items-center h-30 bg-gray-100 rounded-lg">
              <h1 className="text-2xl font-bold">English</h1>
              <div>
                <h1 className="text-gray-600">Marks Obtained</h1>
                <input
                  name="marks"
                  value={english.marks}
                  onChange={(e) => valEnglish(e)}
                  className="border border-gray-300 mt-3 w-80 px-2 py-2 bg-white rounded-lg"
                ></input>
              </div>
              <div>
                <h1 className="text-gray-600">Maximum Marks</h1>
                <input
                  name="totalMarks"
                  value={english.totalMarks}
                  onChange={(e) => valEnglish(e)}
                  className="border border-gray-300 mt-3 w-80 px-2 py-2 bg-white rounded-lg"
                ></input>
              </div>
            </div>
            <div className="flex justify-around border border-gray-300 mr-40 ml-40 items-center h-30 bg-gray-100 rounded-lg">
              <h1 className="text-2xl font-bold">Maths</h1>
              <div>
                <h1 className="text-gray-600">Marks Obtained</h1>
                <input
                  name="marks"
                  value={maths.marks}
                  onChange={(e) => valMaths(e)}
                  className="border border-gray-300 mt-3 w-80 px-2 py-2 bg-white rounded-lg"
                ></input>
              </div>
              <div>
                <h1 className="text-gray-600">Maximum Marks</h1>
                <input
                  name="totalMarks"
                  value={maths.totalMarks}
                  onChange={(e) => valMaths(e)}
                  className="border border-gray-300 mt-3 w-80 px-2 py-2 bg-white rounded-lg"
                ></input>
              </div>
            </div>
            <div className="flex justify-around border border-gray-300 mr-40 ml-40 items-center h-30 bg-gray-100 rounded-lg">
              <h1 className="text-2xl font-bold">Science</h1>
              <div>
                <h1 className="text-gray-600">Marks Obtained</h1>
                <input
                  name="marks"
                  value={science.marks}
                  onChange={(e) => valScience(e)}
                  className="border border-gray-300 mt-3 w-80 px-2 py-2 bg-white rounded-lg"
                ></input>
              </div>
              <div>
                <h1 className="text-gray-600">Maximum Marks</h1>
                <input
                  name="totalMarks"
                  value={science.totalMarks}
                  onChange={(e) => valScience(e)}
                  className="border border-gray-300 mt-3 w-80 px-2 py-2 bg-white rounded-lg"
                ></input>
              </div>
            </div>
            <div className="flex justify-around border border-gray-300 mr-40 ml-40 items-center h-30 bg-gray-100 rounded-lg">
              <h1 className="text-2xl font-bold">Social</h1>
              <div>
                <h1 className="text-gray-600">Marks Obtained</h1>
                <input
                  name="marks"
                  value={social.marks}
                  onChange={(e) => valSocial(e)}
                  className="border border-gray-300 mt-3 w-80 px-2 py-2 bg-white rounded-lg"
                ></input>
              </div>
              <div>
                <h1 className="text-gray-600">Maximum Marks</h1>
                <input
                  name="totalMarks"
                  value={social.totalMarks}
                  onChange={(e) => valSocial(e)}
                  className="border border-gray-300 mt-3 w-80 px-2 py-2 bg-white rounded-lg"
                ></input>
              </div>
            </div>

            <div className="flex flex-col ml-40 border border-gray-300 mr-40 h-50 bg-gray-100 rounded-lg justify-center">
              <h1 className="text-xl font-semibold mb-5 ml-10">
                Performance Summary
              </h1>
              <div className="flex gap-10 mr-10 ml-10">
                <div className="border border-gray-300 w-100 h-25 bg-white rounded-lg ">
                  <div className="px-5 py-3 flex flex-col gap-2">
                    <h1 className="text-gray-500">Total Marks</h1>
                    <h1 className="text-gray-500">
                      <span className="text-black text-xl">{marks}</span> /
                      {total}
                    </h1>
                  </div>
                </div>
                <div className="border border-gray-300 w-100 h-25 bg-white rounded-lg">
                  <div className="px-5 py-3 flex flex-col gap-2">
                    <h1 className="text-gray-500">Percentage</h1>
                    <h1 className="text-blue-600 font-semibold text-3xl">
                      {percentage}%
                    </h1>
                  </div>
                </div>
                <div className="border border-gray-300 w-100 h-25 bg-white rounded-lg">
                  <div className="px-5 py-3 flex flex-col gap-2">
                    <h1 className="text-gray-500">Grade</h1>
                    <h1 className="text-green-600 font-semibold text-3xl">
                      {grade}
                    </h1>
                  </div>
                </div>
              </div>
            </div>
            <div className="ml-40 mr-40 flex gap-4">
              <button
                onClick={() => {
                  handleClick();
                  handleColorChange("cancel");
                }}
                className={`border w-1/2 rounded-lg h-10 cursor-pointer transition-colors duration-300 ${
                  buttonColors["cancel"] || "bg-gray-100"
                }`}
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  handleSave();
                  handleColorChange("save");
                }}
                className={`border w-1/2 rounded-lg h-10 text-white cursor-pointer transition-colors duration-300 ${
                  buttonColors["save"] || "bg-black"
                }`}
              >
                Save
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Studentmarks;

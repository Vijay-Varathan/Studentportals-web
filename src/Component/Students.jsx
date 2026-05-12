import { useState } from "react";
import book from "../assets/student png/book.png";
import delete1 from "../assets/student png/delete.png";
import edit from "../assets/student png/edit.png";
import { useEffect } from "react";
import axios from "axios";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
const Students = () => {
  const [showForm, setShowForm] = useState(false);
  const [id, setId] = useState();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
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


  useEffect(() => {
    console.log(id);
  }, [id]);

  const updateData = (id) => {
    setId(id);
    setFormData((prev) => ({
      ...prev,
      id: id, // ✅ dynamic key
    }));
    const rem = task.find((res) => res.id === id);
    setFormData({
      id: id,
      Name: rem.name,
      Email: rem.email,
      RollNo: rem.rollno,
      Class: rem.std_class,
    });
    setShowForm(true);
  };
  const [task, setTask] = useState([]);

  const [formData, setFormData] = useState({
    id: "",
    Name: "",
    Email: "",
    RollNo: "",
    Class: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value, // ✅ dynamic key
    }));
  };

  const handleDeleteClick = (id) => {
    setSelectedId(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`https://studentportal-j1hd.onrender.com/student/${selectedId}`);
      toast.success("Student data deleted successfully");
      axiosDemo();
    } catch (error) {
      toast.error("Failed to delete student data");
      console.error(error);
    } finally {
      setShowDeleteModal(false);
      setSelectedId(null);
    }
  };

  const setNewdata = async (e) => {
    if (
      (formData.Name.trim() &&
        formData.Class.trim() &&
        formData.Email.trim() &&
        formData.RollNo.trim()) === ""
    )
      return toast.info("all inputs are required");
    else if (formData.RollNo.length > 5) return;

    // Check if email already exists (excluding the current student if updating)
    const emailExists = task.some(
      (student) =>
        student.email.toLowerCase() === formData.Email.toLowerCase() &&
        student.id !== formData.id,
    );

    if (emailExists) {
      return toast.warning(
        `The email "${formData.Email}" is already registered! Please use a different one.`,
      );
    }

    // Email format validation using regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.Email)) {
      return toast.error(
        `"${formData.Email}" is not a valid email format. Please check and try again.`,
      );
    }

    try {
      let res;
      if (formData.id > 0) {
        res = await axios.put(
          `https://studentportal-j1hd.onrender.com/student/${formData.id}`,
          formData,
        );
        setTask((prev) =>
          prev.map((item) => (item.id === formData.id ? res.data : item)),
        );
        toast.success("Successfully Updated");
        clearform();
        console.log(res.data);
      } else {
        res = await axios.post("https://studentportal-j1hd.onrender.com/student", formData);
        setTask((prev) => [...prev, res.data]);
        toast.success("Successfully added");
        clearform();
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Failed to save student data");
      }
      console.error(error);
    }
  };
  const clearform = () => {
    setShowForm(false);
    // clear form
    setFormData({
      Name: "",
      Email: "",
      RollNo: "",
      Class: "",
    });
  };
  async function axiosDemo() {
    let res = await axios.get("https://studentportal-j1hd.onrender.com/student");
    setTask(res.data);
  }
  useEffect(() => {
    axiosDemo();
  }, []);


  return (
    <div className="mx-20">
      <div className="flex justify-between items-center mt-10">
        <div className="flex flex-col">
          <h1 className="font-bold text-2xl">Student Management</h1>
          <h1 className="text-gray-500 mt-2">
            Add, edit, and manage student information
          </h1>
        </div>

        <button
          onClick={() => {
            setShowForm(true);
            handleColorChange("addStudent");
          }}
          className={`text-white px-4 py-1 rounded-lg font-bold transition-colors duration-300 ${
            buttonColors["addStudent"] || "bg-black"
          }`}
        >
          <span className="text-3xl">+</span> Add Student
        </button>

      </div>

      <div className={`${showForm ? "" : "blur-lg"}`}>
        {showForm && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            {/* Dark overlay */}
            <div
              className="absolute inset-0 bg-gradient-to-r from-gray-400 via-gray-200 to-gray-400 opacity-90"
              onClick={() => setShowForm(false)}
            ></div>

            {/* Form Box */}
            <div className="bg-white p-6 rounded-xl z-10 w-96 shadow-lg">
              <h2 className="text-xl font-bold mb-4">Add Student</h2>

              <div className="flex flex-col gap-3">
                <label className="font-bold">Name</label>
                <input
                  name="Name"
                  value={formData.Name}
                  onChange={handleChange}
                  className="border p-2 rounded"
                  placeholder="Name"
                />
                <label className="font-bold">Email</label>
                <input
                  name="Email"
                  value={formData.Email}
                  onChange={handleChange}
                  className="border p-2 rounded"
                  placeholder="Email"
                />
                <label className="font-bold">Roll Number</label>
                <input
                  name="RollNo"
                  value={formData.RollNo}
                  onChange={handleChange}
                  className="border p-2 rounded"
                  placeholder="Roll Number"
                />
                <label className="font-bold">Class</label>
                <input
                  name="Class"
                  value={formData.Class}
                  onChange={handleChange}
                  className="border p-2 rounded"
                  placeholder="Class"
                />
              </div>

              <div className="flex justify-around gap-3 mt-4">
                <button
                  onClick={() => {
                    clearform();
                    handleColorChange("cancelForm");
                  }}
                  className={`px-8 py-2 text-white rounded transition-colors duration-300 ${
                    buttonColors["cancelForm"] || "bg-gray-400"
                  }`}
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    setNewdata();
                    handleColorChange("saveStudent");
                  }}
                  className={`px-10 py-2 text-white rounded transition-colors duration-300 ${
                    buttonColors["saveStudent"] || "bg-green-500"
                  }`}
                >
                  Save
                </button>
              </div>

            </div>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 flex items-center justify-center z-[60]">
          {/* Dark overlay */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
            onClick={() => setShowDeleteModal(false)}
          ></div>

          {/* Modal Box */}
          <div className="bg-white p-8 rounded-2xl z-10 w-[400px] shadow-2xl transform transition-all border border-gray-100">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-red-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Delete Student?</h2>
              <p className="text-gray-500 mb-8">
                Are you sure you want to delete this student's data? This action cannot be undone.
              </p>

              <div className="flex w-full gap-4">
                <button
                  onClick={() => {
                    setShowDeleteModal(false);
                    handleColorChange("cancelDelete");
                  }}
                  className={`flex-1 px-6 py-3 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-all ${
                    buttonColors["cancelDelete"] || "bg-gray-100"
                  }`}
                >
                  No, Cancel
                </button>
                <button
                  onClick={() => {
                    confirmDelete();
                    handleColorChange("confirmDelete");
                  }}
                  className={`flex-1 px-6 py-3 text-white font-semibold rounded-xl hover:bg-red-700 shadow-lg transition-all active:scale-95 ${
                    buttonColors["confirmDelete"] || "bg-red-600"
                  }`}
                >
                  Yes, Delete
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

      <div className="border mt-10 rounded-tl rounded-tr border-gray-200">
        <h1 className="font-semibold text-xl p-6 bg-gradient-to-r from-gray-200">
          All Students
        </h1>
      </div>
      <div className="grid grid-cols-5 bg-gray-100 p-4 border border-gray-200">
        <h1 className="font-semibold">Roll Number</h1>
        <h1 className="font-semibold">Name</h1>
        <h1 className="font-semibold">Email</h1>
        <h1 className="font-semibold">Class</h1>
        <h1 className="font-semibold">Action</h1>
      </div>
      <div>
        {task.map((item, index) => (
          <div key={item.id}>
            <div className="grid grid-cols-5  p-4 border border-gray-200 hover:bg-gray-50">
              <div className=" flex items-center">
                <h1 className="px-4 py-1 bg-gray-200 rounded">{item.rollno}</h1>
              </div>

              <div className=" flex items-center">
                <h1 className="font-semibold">{item.name}</h1>
              </div>

              <div className=" flex items-center">
                <h1 className="text-gray-500">{item.email}</h1>
              </div>

              <div className=" flex items-center">
                <h1>{item.std_class}</h1>
              </div>

              <div className=" flex items-center gap-3">
                <button
                  onClick={() => handleColorChange(`view-${item.id}`)}
                  className={`p-2 rounded-full transition-all duration-300 ${
                    buttonColors[`view-${item.id}`] || "hover:bg-gray-200"
                  }`}
                >
                  <Link to={`/students/marks/${item.rollno}`}>
                    <img
                      src={book}
                      className="w-5 h-5 filter hue-rotate-[200deg]"
                    />
                  </Link>
                </button>
                <button
                  onClick={() => {
                    updateData(item.id);
                    handleColorChange(`edit-${item.id}`);
                  }}
                  className={`p-2 rounded-full transition-all duration-300 ${
                    buttonColors[`edit-${item.id}`] || "hover:bg-gray-200"
                  }`}
                >
                  <img
                    src={edit}
                    className="w-5 h-5 filter hue-rotate-[90deg] cursor-pointer"
                  />
                </button>
                <button
                  onClick={() => {
                    handleDeleteClick(item.id);
                    handleColorChange(`delete-${item.id}`);
                  }}
                  className={`p-2 rounded-full transition-all duration-300 ${
                    buttonColors[`delete-${item.id}`] || "hover:bg-gray-200"
                  }`}
                >
                  <img
                    src={delete1}
                    className="w-5 h-5 filter hue-rotate-[330deg] cursor-pointer"
                  />
                </button>
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Students;

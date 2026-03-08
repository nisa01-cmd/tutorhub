import { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import DashboardLayout from "../../layout/DashboardLayout";

function CreateCourse() {

  const { classId } = useParams();
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const [form, setForm] = useState({
    title: "",
    price: "",
    duration_months: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const createCourse = async () => {

    if (!form.title || !form.price) {
      alert("Please fill required fields");
      return;
    }

    try {

      await axios.post(
        `${process.env.REACT_APP_API_URL}/api/courses/create/`,
        {
          ...form,
          class_id: classId
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert("Course created successfully");

      navigate("/class-owner/my-courses");

    } catch (err) {
      console.log(err);
      alert("Failed to create course");
    }

  };

  return (
    <DashboardLayout role="class_owner">

      <div className="max-w-xl mx-auto bg-white p-8 rounded-xl shadow">

        <h2 className="text-2xl font-bold mb-6">
          Add Course
        </h2>

        <div className="space-y-4">

          <input
            name="title"
            placeholder="Course Title"
            value={form.title}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          />

          <input
            name="price"
            placeholder="Course Price"
            type="number"
            value={form.price}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          />

          <input
            name="duration_months"
            placeholder="Duration (months)"
            type="number"
            value={form.duration_months}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          />

          <button
            onClick={createCourse}
            className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700"
          >
            Create Course
          </button>

        </div>

      </div>

    </DashboardLayout>
  );
}

export default CreateCourse;
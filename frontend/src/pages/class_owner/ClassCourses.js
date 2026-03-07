import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import DashboardLayout from "../../layout/DashboardLayout";

function ClassCourses() {

  const { classId } = useParams();
  const token = localStorage.getItem("token");

  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {

    try {

      const res = await axios.get(
        `http://127.0.0.1:8000/api/courses/${classId}/`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setCourses(res.data);

    } catch (err) {
      console.log(err);
      alert("Failed to load courses");
    }

  };

  const deleteCourse = async (id) => {

    if (!window.confirm("Delete this course?")) return;

    try {

      await axios.delete(
        `http://127.0.0.1:8000/api/courses/${id}/delete/`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setCourses(courses.filter(c => c.id !== id));

    } catch (err) {
      console.log(err);
      alert("Failed to delete course");
    }

  };

  return (
    <DashboardLayout role="class_owner">

      <div style={{ padding: "20px" }}>

        <h2 style={{ marginBottom: "20px" }}>
          Courses for this Class
        </h2>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))",
          gap: "20px"
        }}>

          {courses.map(course => (

            <div
              key={course.id}
              style={{
                padding: "20px",
                border: "1px solid #eee",
                borderRadius: "10px",
                background: "#fff"
              }}
            >

              <h3>{course.title}</h3>

              <p>Price: ₹{course.price}</p>
              <p>Duration: {course.duration_months} months</p>

              <button
                style={{
                  marginTop: "10px",
                  background: "#ef4444",
                  color: "#fff",
                  border: "none",
                  padding: "6px 10px",
                  borderRadius: "6px"
                }}
                onClick={() => deleteCourse(course.id)}
              >
                Delete
              </button>

            </div>

          ))}

        </div>

      </div>

    </DashboardLayout>
  );
}

export default ClassCourses;
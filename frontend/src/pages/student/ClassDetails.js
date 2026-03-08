import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import DashboardLayout from "../../layout/DashboardLayout";

function ClassDetails() {

  const { id } = useParams();
  const token = localStorage.getItem("token");

  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {

      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/courses/${id}/`
      );

      setCourses(res.data);

    } catch (err) {
      console.log(err);
    }
  };

  const enrollCourse = async (courseId) => {

    try {

      await axios.post(
        `${process.env.REACT_APP_API_URL}/api/enroll/`,
        { course_id: courseId },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert("🎉 Enrollment successful!");

    } catch (err) {

      console.log(err);
      alert("Failed to enroll");

    }

  };

  return (
    <DashboardLayout role="student">

      <div className="max-w-6xl mx-auto">

        {/* Page Title */}
        <h1 className="text-3xl font-bold mb-8">
          Courses Available
        </h1>

        {/* No Courses */}
        {courses.length === 0 && (
          <p className="text-gray-500">
            No courses available for this class.
          </p>
        )}

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {courses.map((course) => (

            <div
              key={course.id}
              className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition"
            >

              {/* Course Title */}
              <h2 className="text-xl font-semibold mb-3">
                {course.title}
              </h2>

              {/* Duration */}
              <p className="text-gray-600 mb-2">
                📅 Duration: {course.duration_months} months
              </p>

              {/* Price */}
              <p className="text-gray-700 font-semibold mb-4">
                💰 Price: ₹{course.price}
              </p>

              {/* Enroll Button */}
              <button
                onClick={() => enrollCourse(course.id)}
                className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
              >
                Enroll Now
              </button>

            </div>

          ))}

        </div>

      </div>

    </DashboardLayout>
  );

}

export default ClassDetails;
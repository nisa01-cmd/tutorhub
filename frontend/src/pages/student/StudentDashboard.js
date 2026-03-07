import { useEffect, useState } from "react";
import axios from "axios";
import DashboardLayout from "../../layout/DashboardLayout";
import { useNavigate } from "react-router-dom";

function StudentDashboard() {

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const [enrollments, setEnrollments] = useState([]);
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {

    try {

      const enrollRes = await axios.get(
        "http://127.0.0.1:8000/api/my-enrollments/",
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      const classRes = await axios.get(
        "http://127.0.0.1:8000/api/classes/"
      );

      setEnrollments(enrollRes.data);
      setClasses(classRes.data.slice(0, 4));

    } catch (err) {

      console.log(err);

    } finally {

      setLoading(false);

    }

  };

  return (
    <DashboardLayout role="student">

      <div className="max-w-6xl mx-auto">

        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-8 rounded-xl mb-8 shadow">

          <h1 className="text-3xl font-bold mb-2">
            Welcome back 👋
          </h1>

          <p className="text-blue-100">
            Discover commerce coaching classes near you.
          </p>

          <button
            onClick={() => navigate("/student/search")}
            className="mt-4 bg-white text-blue-600 px-5 py-2 rounded-lg font-semibold hover:bg-gray-100"
          >
            Search Classes
          </button>

        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-gray-500 text-sm">Enrolled Courses</h3>
            <p className="text-2xl font-bold">
              {enrollments.length}
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-gray-500 text-sm">Available Classes</h3>
            <p className="text-2xl font-bold">
              {classes.length}
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-gray-500 text-sm">Learning Progress</h3>
            <p className="text-2xl font-bold">
              Active
            </p>
          </div>

        </div>

        {/* Enrolled Courses */}
        <div className="mb-10">

          <h2 className="text-xl font-semibold mb-4">
            Your Courses
          </h2>

          {enrollments.length === 0 && (
            <p className="text-gray-500">
              You haven't enrolled in any course yet.
            </p>
          )}

          <div className="grid md:grid-cols-2 gap-6">

            {enrollments.map((e) => (

              <div
                key={e.id}
                className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition"
              >

                <h3 className="text-lg font-semibold mb-1">
                  {e.class_name}
                </h3>

                <p className="text-blue-600">
                  {e.course_title}
                </p>

                <p className="text-gray-500 text-sm mt-2">
                  Enrolled on {new Date(e.enrolled_at).toLocaleDateString()}
                </p>

              </div>

            ))}

          </div>

        </div>

        {/* Recommended Classes */}
        <div>

          <h2 className="text-xl font-semibold mb-4">
            Recommended Classes
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

            {classes.map((c) => (

              <div
                key={c.id}
                onClick={() => navigate(`/student/class/${c.id}`)}
                className="bg-white p-6 rounded-xl shadow cursor-pointer hover:shadow-lg transition"
              >

                <h3 className="font-semibold text-lg">
                  {c.name}
                </h3>

                <p className="text-gray-500 text-sm mt-1">
                  📍 {c.city} - {c.area}
                </p>

                <p className="text-gray-400 text-sm mt-2">
                  {c.description}
                </p>

              </div>

            ))}

          </div>

        </div>

      </div>

    </DashboardLayout>
  );

}

export default StudentDashboard;
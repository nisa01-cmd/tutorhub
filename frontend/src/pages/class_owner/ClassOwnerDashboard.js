import { useEffect, useState } from "react";
import axios from "axios";
import DashboardLayout from "../../layout/DashboardLayout";
import { useNavigate } from "react-router-dom";

function ClassOwnerDashboard() {

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const [classes, setClasses] = useState([]);
  const [courses, setCourses] = useState([]);
  const [enrollments, setEnrollments] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {

    try {

      const classRes = await axios.get(
        "http://127.0.0.1:8000/api/classes/my/",
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      const courseRes = await axios.get(
        "http://127.0.0.1:8000/api/courses/my/",
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      const enrollRes = await axios.get(
        "http://127.0.0.1:8000/api/class-enrollments/",
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      setClasses(classRes.data);
      setCourses(courseRes.data);
      setEnrollments(enrollRes.data);

    } catch (err) {

      console.log(err);

    }

  };

  return (
    <DashboardLayout role="class_owner">

      <div className="max-w-6xl mx-auto">

        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-8 rounded-xl mb-8 shadow">

          <h1 className="text-3xl font-bold mb-2">
            Class Owner Dashboard
          </h1>

          <p className="text-green-100">
            Manage your classes and courses.
          </p>

        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">

          <StatCard title="Classes" value={classes.length} />

          <StatCard title="Courses" value={courses.length} />

          <StatCard title="Students" value={enrollments.length} />

          <StatCard
            title="Pending Approval"
            value={classes.filter(c => !c.is_approved).length}
          />

        </div>

        {/* Recent Enrollments */}
        <div>

          <h2 className="text-xl font-semibold mb-4">
            Recent Enrollments
          </h2>

          {enrollments.length === 0 && (
            <p className="text-gray-500">
              No students enrolled yet.
            </p>
          )}

          <div className="bg-white rounded-xl shadow divide-y">

            {enrollments.slice(0,5).map((e) => (

              <div
                key={e.id}
                className="p-4 flex justify-between"
              >

                <div>

                  <p className="font-medium">
                    {e.student_name}
                  </p>

                  <p className="text-sm text-gray-500">
                    {e.course_title}
                  </p>

                </div>

                <span className="text-sm text-gray-400">
                  {new Date(e.enrolled_at).toLocaleDateString()}
                </span>

              </div>

            ))}

          </div>

        </div>

      </div>

    </DashboardLayout>
  );

}

function StatCard({ title, value }) {

  return (

    <div className="bg-white p-6 rounded-xl shadow">

      <h3 className="text-gray-500 text-sm">
        {title}
      </h3>

      <p className="text-2xl font-bold mt-1">
        {value}
      </p>

    </div>

  );

}

export default ClassOwnerDashboard;
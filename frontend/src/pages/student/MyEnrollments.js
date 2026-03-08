import { useEffect, useState } from "react";
import axios from "axios";
import DashboardLayout from "../../layout/DashboardLayout";


function MyEnrollments() {

  const token = localStorage.getItem("token");
  

  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEnrollments();
  }, []);

  const fetchEnrollments = async () => {

    try {

      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/my-enrollments/`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setEnrollments(res.data);

    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }

  };

  return (
    <DashboardLayout role="student">

      <div className="max-w-6xl mx-auto">

        {/* Title */}
        <h1 className="text-3xl font-bold mb-8">
          My Enrollments
        </h1>

        {/* Loading */}
        {loading && (
          <p className="text-gray-500">
            Loading your courses...
          </p>
        )}

        {/* Empty State */}
        {!loading && enrollments.length === 0 && (
          <div className="bg-white p-8 rounded-xl shadow text-center">

            <h2 className="text-xl font-semibold mb-2">
              No Enrollments Yet
            </h2>

            <p className="text-gray-500">
              Search for classes and enroll in courses.
            </p>

          </div>
        )}

        {/* Enrollments Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {enrollments.map((e) => (

            <div
              key={e.id}
              className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition"
            >

              {/* Class Name */}
              <h2 className="text-xl font-semibold mb-2">
                {e.class_name}
              </h2>

              {/* Course */}
              <p className="text-blue-600 font-medium mb-4">
                {e.course_title}
              </p>

              {/* Enrollment Date */}
              <p className="text-gray-500 text-sm mb-4">
                Enrolled on: {new Date(e.enrolled_at).toLocaleDateString()}
              </p>

              {/* Status */}
              <div className="flex justify-between items-center">

                <span className="px-3 py-1 rounded-full text-sm bg-green-100 text-green-600">
                  Active
                </span>

                

              </div>

            </div>

          ))}

        </div>

      </div>

    </DashboardLayout>
  );

}

export default MyEnrollments;
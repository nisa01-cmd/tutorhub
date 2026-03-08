import { useEffect, useState } from "react";
import axios from "axios";
import DashboardLayout from "../../layout/DashboardLayout";
import { useNavigate } from "react-router-dom";

function MyClasses() {

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = async () => {

    try {

      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/classes/my/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setClasses(res.data);

    } catch (err) {

      console.log(err);
      setError("Failed to load classes.");

    } finally {

      setLoading(false);

    }

  };

  const deleteClass = async (id) => {

    if (!window.confirm("Are you sure you want to delete this class?")) return;

    try {

      await axios.delete(
        `${process.env.REACT_APP_API_URL}/api/classes/${id}/delete/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setClasses(classes.filter((c) => c.id !== id));

    } catch (err) {

      console.log(err);
      alert("Failed to delete class.");

    }

  };

  return (
    <DashboardLayout role="class_owner">

      <div className="max-w-6xl mx-auto">

        {/* Page Header */}
        <div className="flex justify-between items-center mb-8">

          <h1 className="text-3xl font-bold">
            My Classes
          </h1>

          <button
            onClick={fetchClasses}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Refresh
          </button>

        </div>

        {/* Loading */}
        {loading && (
          <p className="text-gray-500">
            Loading classes...
          </p>
        )}

        {/* Error */}
        {error && (
          <p className="text-red-500">
            {error}
          </p>
        )}

        {/* Empty State */}
        {!loading && classes.length === 0 && (
          <div className="bg-white p-8 rounded-xl shadow text-center">

            <h2 className="text-xl font-semibold mb-2">
              No Classes Yet
            </h2>

            <p className="text-gray-500">
              Create your first class to start offering courses.
            </p>

          </div>
        )}

        {/* Classes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {classes.map((c) => (

            <div
              key={c.id}
              className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition"
            >

              {/* Class Name */}
              <h2 className="text-xl font-semibold mb-2">
                {c.name}
              </h2>

              {/* Location */}
              <p className="text-gray-500 text-sm mb-3">
                📍 {c.city} - {c.area}
              </p>

              {/* Status */}
              <span
                className={`px-3 py-1 rounded-full text-sm ${
                  c.is_approved
                    ? "bg-green-100 text-green-600"
                    : "bg-yellow-100 text-yellow-600"
                }`}
              >
                {c.is_approved ? "Approved" : "Pending Approval"}
              </span>

              {/* Actions */}
              <div className="flex flex-wrap gap-2 mt-5">

                <button
                  onClick={() =>
                    navigate(`/class-owner/class-courses/${c.id}`)
                  }
                  className="bg-blue-600 text-white px-3 py-2 rounded-lg text-sm hover:bg-blue-700"
                >
                  View Courses
                </button>

                <button
                  onClick={() =>
                    navigate(`/class-owner/create-course/${c.id}`)
                  }
                  className="bg-green-600 text-white px-3 py-2 rounded-lg text-sm hover:bg-green-700"
                >
                  Add Course
                </button>

                <button
                  onClick={() => deleteClass(c.id)}
                  className="bg-red-500 text-white px-3 py-2 rounded-lg text-sm hover:bg-red-600"
                >
                  Delete
                </button>

              </div>

            </div>

          ))}

        </div>

      </div>

    </DashboardLayout>
  );

}

export default MyClasses;
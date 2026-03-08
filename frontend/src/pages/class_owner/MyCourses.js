import { useEffect, useState } from "react";
import axios from "axios";
import DashboardLayout from "../../layout/DashboardLayout";

function MyCourses() {
  const token = localStorage.getItem("token");

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        "http://127.0.0.1:8000/api/courses/my/",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setCourses(res.data);
      setError("");
    } catch (err) {
      console.log(err);
      setError("Failed to load courses.");
    } finally {
      setLoading(false);
    }
  };

  const deleteCourse = async (id) => {
    if (!window.confirm("Are you sure you want to delete this course?")) return;

    try {
      await axios.delete(
        `${process.env.REACT_APP_API_URL}/api/courses/${id}/delete/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setCourses(courses.filter((course) => course.id !== id));
    } catch (err) {
      console.log(err);
      alert("Failed to delete course.");
    }
  };

  return (
    <DashboardLayout role="class_owner">
      <div style={styles.container}>
        <div style={styles.header}>
          <h2>My Courses</h2>

          <button onClick={fetchCourses} style={styles.refreshBtn}>
            Refresh
          </button>
        </div>

        {loading && <p>Loading courses...</p>}

        {error && <p style={styles.error}>{error}</p>}

        {!loading && courses.length === 0 && (
          <p style={styles.empty}>No courses added yet.</p>
        )}

        <div style={styles.grid}>
          {courses.map((course) => (
            <div key={course.id} style={styles.card}>
              <h3 style={styles.courseName}>{course.title}</h3>

              <p><strong>Class:</strong> {course.class_name}</p>
              <p><strong>Price:</strong> ₹{course.price}</p>

              <div style={styles.actions}>
                <button style={styles.editBtn}>Edit</button>

                <button
                  style={styles.deleteBtn}
                  onClick={() => deleteCourse(course.id)}
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

const styles = {
  container: { padding: "20px" },

  header: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "25px",
  },

  refreshBtn: {
    padding: "8px 14px",
    border: "none",
    background: "#2563eb",
    color: "#fff",
    borderRadius: "6px",
    cursor: "pointer",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
    gap: "20px",
  },

  card: {
    padding: "20px",
    borderRadius: "10px",
    border: "1px solid #eee",
    background: "#fff",
  },

  actions: {
    marginTop: "15px",
    display: "flex",
    gap: "10px",
  },

  editBtn: {
    flex: 1,
    background: "#3b82f6",
    color: "#fff",
    border: "none",
    padding: "6px",
    borderRadius: "6px",
  },

  deleteBtn: {
    flex: 1,
    background: "#ef4444",
    color: "#fff",
    border: "none",
    padding: "6px",
    borderRadius: "6px",
  },

  error: { color: "red" },

  empty: { color: "#666" },
};

export default MyCourses;
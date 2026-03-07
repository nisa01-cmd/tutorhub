import { useEffect, useState } from "react";
import axios from "axios";
import DashboardLayout from "../../layout/DashboardLayout";

function Enrollments() {
  const token = localStorage.getItem("token");

  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEnrollments();
  }, []);

  const fetchEnrollments = async () => {
    try {
      const res = await axios.get(
        "http://127.0.0.1:8000/api/class-enrollments/",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setEnrollments(res.data);
    } catch (err) {
      console.log(err);
      alert("Failed to load enrollments");
    } finally {
      setLoading(false);
    }
  };

  const removeEnrollment = async (id) => {
    if (!window.confirm("Remove this student enrollment?")) return;

    try {
      await axios.delete(
        `http://127.0.0.1:8000/api/delete-enrollment/${id}/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setEnrollments(enrollments.filter((e) => e.id !== id));
    } catch (err) {
      console.log(err);
      alert("Error removing enrollment");
    }
  };

  return (
    <DashboardLayout role="class_owner">
      <div style={styles.container}>

        <h2 style={styles.title}>Student Enrollments</h2>

        {loading && <p>Loading enrollments...</p>}

        {!loading && enrollments.length === 0 && (
          <div style={styles.emptyBox}>
            No students have enrolled in your courses yet.
          </div>
        )}

        {!loading && enrollments.length > 0 && (
          <div style={styles.tableWrapper}>
            <table style={styles.table}>

              <thead style={styles.thead}>
                <tr>
                  <th>Student</th>
                  <th>Class</th>
                  <th>Course</th>
                  <th>Enrolled On</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {enrollments.map((e) => (
                  <tr key={e.id} style={styles.row}>
                    <td>{e.student_name}</td>
                    <td>{e.class_name}</td>
                    <td>{e.course_title}</td>
                    <td>{new Date(e.enrolled_at).toLocaleDateString()}</td>

                    <td>
                      <button
                        style={styles.removeBtn}
                        onClick={() => removeEnrollment(e.id)}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>

            </table>
          </div>
        )}

      </div>
    </DashboardLayout>
  );
}

const styles = {

  container: {
    background: "white",
    padding: "30px",
    borderRadius: "12px",
    boxShadow: "0px 6px 18px rgba(0,0,0,0.08)",
  },

  title: {
    fontSize: "22px",
    marginBottom: "20px",
    fontWeight: "600",
  },

  emptyBox: {
    padding: "25px",
    background: "#f8fafc",
    borderRadius: "8px",
    color: "#64748b",
  },

  tableWrapper: {
    overflowX: "auto",
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
  },

  thead: {
    background: "#f1f5f9",
  },

  row: {
    borderBottom: "1px solid #e2e8f0",
  },

  removeBtn: {
    background: "#ef4444",
    border: "none",
    padding: "7px 14px",
    color: "white",
    borderRadius: "6px",
    cursor: "pointer",
  },

};

export default Enrollments;

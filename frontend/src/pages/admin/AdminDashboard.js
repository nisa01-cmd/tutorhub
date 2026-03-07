import DashboardLayout from "../../layout/DashboardLayout";
import { jwtDecode } from "jwt-decode";

function AdminDashboard() {
  const token = localStorage.getItem("token");
  const user = jwtDecode(token);

  return (
    <DashboardLayout role="admin">
      <h1>Welcome {user.username}</h1>
      <p>This is your admin dashboard.</p>
    </DashboardLayout>
  );
}

export default AdminDashboard;
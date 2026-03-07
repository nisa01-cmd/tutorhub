import { useNavigate, useLocation } from "react-router-dom";

function DashboardLayout({ children, role }) {
  const navigate = useNavigate();
  const location = useLocation();

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* Sidebar */}
      <div className="w-64 bg-slate-900 text-white flex flex-col">

        {/* Logo / Title */}
        <div className="p-6 text-xl font-bold border-b border-slate-700">
          TutorHub
        </div>

        {/* Menu */}
        <div className="flex-1 p-4 space-y-2">

          {/* STUDENT MENU */}
          {role === "student" && (
            <>
              <SidebarItem
                label="Dashboard"
                path="/student/dashboard"
                navigate={navigate}
                active={isActive("/student/dashboard")}
              />

              <SidebarItem
                label="Search Classes"
                path="/student/search"
                navigate={navigate}
                active={isActive("/student/search")}
              />

              <SidebarItem
                label="My Enrollments"
                path="/student/enrollments"
                navigate={navigate}
                active={isActive("/student/enrollments")}
              />

              
            </>
          )}

          {/* CLASS OWNER MENU */}
{role === "class_owner" && (
  <>
    <SidebarItem
      label="Dashboard"
      path="/class-owner/dashboard"
      navigate={navigate}
      active={isActive("/class-owner/dashboard")}
    />

    <SidebarItem
      label="Create Class"
      path="/class-owner/create"
      navigate={navigate}
      active={isActive("/class-owner/create")}
    />



    <SidebarItem
      label="My Classes"
      path="/class-owner/my-classes"
      navigate={navigate}
      active={isActive("/class-owner/my-classes")}
    />

    <SidebarItem
      label="My Courses"
      path="/class-owner/my-courses"
      navigate={navigate}
      active={isActive("/class-owner/my-courses")}
    />

    <SidebarItem
      label="Enrollments"
      path="/class-owner/enrollments"
      navigate={navigate}
      active={isActive("/class-owner/enrollments")}
    />
  </>
)}


          {/* ADMIN MENU */}
          {role === "admin" && (
            <>
              <SidebarItem
                label="Users"
                path="/admin/users"
                navigate={navigate}
                active={isActive("/admin/users")}
              />

              <SidebarItem
                label="Approve Classes"
                path="/admin/classes"
                navigate={navigate}
                active={isActive("/admin/classes")}
              />

              <SidebarItem
                label="Bookings"
                path="/admin/bookings"
                navigate={navigate}
                active={isActive("/admin/bookings")}
              />

              <SidebarItem
                label="Payments"
                path="/admin/payments"
                navigate={navigate}
                active={isActive("/admin/payments")}
              />
            </>
          )}

        </div>

        {/* Logout */}
        <div className="p-4 border-t border-slate-700">
          <button
            onClick={logout}
            className="w-full bg-red-500 hover:bg-red-600 p-2 rounded-lg"
          >
            Logout
          </button>
        </div>

      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        {children}
      </div>

    </div>
  );
}

function SidebarItem({ label, path, navigate, active }) {
  return (
    <div
      onClick={() => navigate(path)}
      className={`p-3 rounded-lg cursor-pointer transition 
        ${active ? "bg-blue-600" : "hover:bg-slate-700"}`}
    >
      {label}
    </div>
  );
}

export default DashboardLayout;

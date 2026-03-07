import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";

/* Admin */
import AdminDashboard from "./pages/admin/AdminDashboard";

/* Student */
import StudentDashboard from "./pages/student/StudentDashboard";
import SearchClasses from "./pages/student/SearchClasses";
import ClassDetails from "./pages/student/ClassDetails";
import MyEnrollments from "./pages/student/MyEnrollments";

/* Class Owner */
import OwnerDashboard from "./pages/class_owner/ClassOwnerDashboard";
import CreateClass from "./pages/class_owner/CreateClass";
import MyClasses from "./pages/class_owner/MyClasses";
import MyCourses from "./pages/class_owner/MyCourses";
import CreateCourse from "./pages/class_owner/CreateCourse";
import ClassEnrollments from "./pages/class_owner/Enrollments";
import ClassCourses from "./pages/class_owner/ClassCourses";

function App() {

  const [token, setToken] = useState(localStorage.getItem("token"));

  return (
    <BrowserRouter>
      <Routes>

        {/* PUBLIC ROUTES */}
        <Route path="/" element={<Login setToken={setToken} />} />
        <Route path="/register" element={<Register />} />

        {/* STUDENT ROUTES */}

        <Route
          path="/student/dashboard"
          element={
            <ProtectedRoute allowedRole="student">
              <StudentDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/student/search"
          element={
            <ProtectedRoute allowedRole="student">
              <SearchClasses />
            </ProtectedRoute>
          }
        />

        <Route
          path="/class-owner/class-courses/:classId"
          element={
            <ProtectedRoute allowedRole="class_owner">
              <ClassCourses />
            </ProtectedRoute>
          }
        />


        <Route
          path="/student/class/:id"
          element={
            <ProtectedRoute allowedRole="student">
              <ClassDetails />
            </ProtectedRoute>
          }
        />

        <Route
          path="/student/enrollments"
          element={
            <ProtectedRoute allowedRole="student">
              <MyEnrollments />
            </ProtectedRoute>
          }
        />

       {/* CLASS OWNER ROUTES */}

<Route
  path="/class-owner/dashboard"
  element={
    <ProtectedRoute allowedRole="class_owner">
      <OwnerDashboard />
    </ProtectedRoute>
  }
/>

<Route
  path="/class-owner/create"
  element={
    <ProtectedRoute allowedRole="class_owner">
      <CreateClass />
    </ProtectedRoute>
  }
/>

<Route
  path="/class-owner/my-classes"
  element={
    <ProtectedRoute allowedRole="class_owner">
      <MyClasses />
    </ProtectedRoute>
  }
/>

<Route
  path="/class-owner/create-course/:classId"
  element={
    <ProtectedRoute allowedRole="class_owner">
      <CreateCourse />
    </ProtectedRoute>
  }
/>

<Route
  path="/class-owner/my-courses"
  element={
    <ProtectedRoute allowedRole="class_owner">
      <MyCourses />
    </ProtectedRoute>
  }
/>

<Route
  path="/class-owner/enrollments"
  element={
    <ProtectedRoute allowedRole="class_owner">
      <ClassEnrollments />
    </ProtectedRoute>
  }
/>

        {/* ADMIN ROUTES */}

        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute allowedRole="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;

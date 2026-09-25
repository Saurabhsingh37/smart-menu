import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import ImageUploadTest from "./components/ImageUploadTest";
import AdminLogin from "./admin/AdminLogin";
import AdminDashboard from "./admin/adminDashboard";
import ProtectedAdminRoute from "./admin/ProtectedAdminRoute";
import AddMenuItem from "./admin/AddMenuItem";
import AllMenuItems from "./admin/AllMenuItems";
import EditMenuItem from "./admin/EditMenuItem";
import ManageCategories from "./admin/ManageCategories";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Main Restaurant Website */}
        <Route path="/" element={<Home />} />

        {/* Temporary Image Upload Test */}
        <Route
          path="/image-upload-test"
          element={<ImageUploadTest />}
        />

        {/* Admin Login */}
        <Route path="/admin" element={<AdminLogin />} />

        {/* Protected Admin Dashboard */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedAdminRoute>
              <AdminDashboard />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/admin/menu/add"
          element={
            <ProtectedAdminRoute>
              <AddMenuItem />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/admin/menu"
          element={
            <ProtectedAdminRoute>
              <AllMenuItems />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/admin/menu/edit/:id"
          element={
            <ProtectedAdminRoute>
              <EditMenuItem />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/admin/categories"
          element={
            <ProtectedAdminRoute>
              <ManageCategories />
            </ProtectedAdminRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
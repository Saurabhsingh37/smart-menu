import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import ImageUploadTest from "./components/ImageUploadTest";
import WebsiteScene from "./components/WebsiteScene";

import AdminLogin from "./admin/AdminLogin";
import AdminDashboard from "./admin/AdminDashboard";
import ProtectedAdminRoute from "./admin/ProtectedAdminRoute";
import AddMenuItem from "./admin/AddMenuItem";
import AllMenuItems from "./admin/AllMenuItems";
import EditMenuItem from "./admin/EditMenuItem";
import ManageCategories from "./admin/ManageCategories";

import { OrderProvider } from "./context/OrderContext";

function App() {
  return (
    <div className="select-none">
      <BrowserRouter>
        <Routes>
          {/* =====================================================
              MAIN RESTAURANT WEBSITE
          ====================================================== */}
          <Route
            path="/"
            element={
              <OrderProvider>
                <div className="relative min-h-screen overflow-hidden bg-[#100906]">
                  {/* WEBSITE-WIDE 3D ATMOSPHERE */}
                  <WebsiteScene />

                  {/* WEBSITE CONTENT */}
                  <div className="relative z-10">
                    <Home />
                  </div>
                </div>
              </OrderProvider>
            }
          />

          {/* =====================================================
              TEMPORARY IMAGE UPLOAD TEST
          ====================================================== */}
          <Route
            path="/image-upload-test"
            element={<ImageUploadTest />}
          />

          {/* =====================================================
              ADMIN LOGIN
          ====================================================== */}
          <Route
            path="/admin"
            element={<AdminLogin />}
          />

          {/* =====================================================
              PROTECTED ADMIN DASHBOARD
          ====================================================== */}
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedAdminRoute>
                <AdminDashboard />
              </ProtectedAdminRoute>
            }
          />

          {/* =====================================================
              ADD MENU ITEM
          ====================================================== */}
          <Route
            path="/admin/menu/add"
            element={
              <ProtectedAdminRoute>
                <AddMenuItem />
              </ProtectedAdminRoute>
            }
          />

          {/* =====================================================
              ALL MENU ITEMS
          ====================================================== */}
          <Route
            path="/admin/menu"
            element={
              <ProtectedAdminRoute>
                <AllMenuItems />
              </ProtectedAdminRoute>
            }
          />

          {/* =====================================================
              EDIT MENU ITEM
          ====================================================== */}
          <Route
            path="/admin/menu/edit/:id"
            element={
              <ProtectedAdminRoute>
                <EditMenuItem />
              </ProtectedAdminRoute>
            }
          />

          {/* =====================================================
              MANAGE CATEGORIES
          ====================================================== */}
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
    </div>
  );
}

export default App;


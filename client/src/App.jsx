import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast"

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import CreateLaunch from "./pages/CreateLaunch";
import LaunchDetail from "./pages/LaunchDetails"
import EditLaunch from "./pages/EditLaunch";

import ProtectedRoute from "./routes/protectedRoutes";
import RoleProtectedRoute from "./routes/roleProtectedRoute";

function App() {
    return (
      
        <BrowserRouter>
            <Toaster
                position="top-right"
                toastOptions={{
                    duration: 3500,
                }}
            />
            <Routes>
                <Route path="/login" element={<Login />} />

                <Route path="/dashboard" element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                }/>

                <Route path="/dashboard/launches/new" element={
                  <RoleProtectedRoute allowedRoles={["creator"]}>
                    <CreateLaunch />
                  </RoleProtectedRoute>
                }/>

                <Route
                  path="/dashboard/launches/:id/edit"
                  element={
                    <RoleProtectedRoute allowedRoles={["creator"]}>
                      <EditLaunch />
                    </RoleProtectedRoute>
                  }/>

                <Route
                  path="/dashboard/launches/:id"
                  element={
                    <ProtectedRoute>
                      <LaunchDetail />
                    </ProtectedRoute>
                  }
              />

                <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
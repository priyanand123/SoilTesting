// router.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "../../pages/Login/Loginpage";
import { routePath } from "./routepath";

// Helper for role-based redirect
const PrivateRoute = ({ children, allowedRoles }) => {
    const token = localStorage.getItem("token");
    const roleName = localStorage.getItem("roleName");

    if (!token) return <Navigate to={routePath.login} replace />;
    if (allowedRoles && !allowedRoles.includes(roleName)) return <Navigate to={routePath.login} replace />;

    return children;
};

const AppRoute = () => {
    return (
        <Router>
             
            <Routes>
                <Route path={routePath.login} element={<LoginPage />} />



                
            </Routes>
            
        </Router>
    );
};

export default AppRoute;

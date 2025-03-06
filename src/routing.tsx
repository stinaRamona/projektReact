import { createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage"; 
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import UserPage from "./pages/UserPage"; 
import BaseLayout from "./components/BaseLayout";

const router = createBrowserRouter([
    {
        path: "/", 
        element: <BaseLayout />, 
        children: [
            {
                path: "/", 
                element: <HomePage />
            }, 
        
            {
                path: "/login", 
                element: <LoginPage /> 
            }, 
        
            {
                path: "/register", 
                element: <RegisterPage />
            },
        
            {
                path: "/userpage", 
                element: <UserPage /> 
            }
        ]
    }, 
])

export default router; 
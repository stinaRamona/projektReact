import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { ReactNode } from "react";

interface ProtectedRouteProps {
    children: ReactNode
}; 

const ProtectedRoute : React.FC<ProtectedRouteProps> = ({children}) => {
    const {user} = useAuth(); 

    //Ifall ingen sparad user finns skickas besökaren till login
    if(!user) {
        return <Navigate to="/login" replace />
    }

    return (

        <>{children}</>

    )
}

export default ProtectedRoute
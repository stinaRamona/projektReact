import { createContext, useState, useContext, ReactNode, useEffect } from "react"; 

//interface importeras in
import { User, LoginCred, AuthResponse, AuthContextType} from "../types/auth.types"; 

const AuthContext = createContext<AuthContextType | null>(null); 

interface AuthProviderProps {
    children: ReactNode
}; 

export const AuthProvider: React.FC<AuthProviderProps>  = ({children}) => {

    //sätter state 
    const [user, setUser] = useState<User | null>(null); 

    const login = async (credentials: LoginCred) => {

        try {
            const response = await fetch("http://localhost:3000/login", {
                method: "POST", 
                headers: {
                    "Content-Type": "application/json"
                }, 
                body: JSON.stringify(credentials)
            })
            console.log("response: ", response); 
            if(!response.ok) {
                throw new Error("Inloggningen misslyckades!"); 
            }

            const data = await response.json() as AuthResponse; 

            console.log("response data: ", data); 

            console.log("data token: ", data.token); 
            //lägger in token i localstorage
            localStorage.setItem("loginToken", data.token); 
            
            console.log("data.user: ", data.user); 
            setUser(data.user); 

        } catch (error) {
            //konsollogg för utveckling 
            console.log(error); 
        }
    }

    const logout = () => {
        localStorage.removeItem("loginToken"); 
        setUser(null); 
    }

    // kolla om användaren har en token 

    const validateToken = async () => {
        const token = localStorage.getItem("loginToken"); 

        if(!token) {
            return; 
        }

        try {
            const response = await fetch("http://localhost:3000/protected", {
                method: "GET", 
                headers: {
                    "Content-Type": "application/json", 
                    "Authorization": "Bearer " + token
                }
            }); 

            if(response.ok) {
                const data = await response.json(); 
                setUser(data.user); 
            }

        } catch(error) {
            localStorage.removeItem("loginToken");
            setUser(null); 
            //konsollogg för utveckling
            console.log(error); 
        }
    }

    useEffect( () => {
        validateToken(); 
    }, []); 

    return (
        <AuthContext.Provider value={{user, login, logout}} >
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () : AuthContextType=> {
    const context = useContext(AuthContext); 

    if(!context) {
        throw new Error("Måste användas inom en AuthProvider"); 
    }

    return context; 
}
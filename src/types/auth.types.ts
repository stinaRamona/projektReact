export interface User {
    _id: string,
    user_name: string, 
    email: string, 
    password: string 
}

export interface LoginCred {
    email: string, 
    password: string 
}

export interface AuthResponse {
    user: User, 
    token: string
}

export interface AuthContextType {
    user: User | null, 
    login: (credentials: LoginCred) => Promise<void>, 
    logout: () => void
}
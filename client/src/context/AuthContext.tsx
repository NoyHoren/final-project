import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { ILogin, IUserInput } from "../interfaces/interfaces";

export interface AuthContextType {
    error: string
    handleSignup: (userData: IUserInput) => Promise<boolean>
}

const base_url = "http://localhost:8080/api/v1/users"

export const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [auth, setAuth] = useState<string | null>(null);
    const [error, setError] = useState("");

    // useEffect(() => {
    //     const token = localStorage.getItem("token");
    //     if (token) {
    //         const parsedToken = JSON.parse(token);
    //         setAuth(parsedToken);
    //     }
    // }, [])

    const handleSignup = async (userData: IUserInput) => {
        try {
            const res = await axios.post(`${base_url}`, userData);
            console.log(res);
            return true;
        } catch (err) {
            console.error(err);
            setError("Signup failed. Please try again.");
            return false;
        }
    }

    const handleLogin = async (auth: ILogin) => {

    }


    const handleLogout = () => { }

    return <AuthContext.Provider value={{ error, handleSignup }}>
        {children}
    </AuthContext.Provider>;
};

export default AuthProvider;
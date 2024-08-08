import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { IJWTPayload, ILogin, IUser, IUserInput } from "../interfaces/interfaces";
import { jwtDecode } from "jwt-decode";

export interface AuthContextType {
    error: string
    auth: string | null
    user: IUser | null
    handleSignup: (userData: IUserInput) => Promise<boolean>
    handleLogin: (auth: ILogin) => Promise<boolean>
    handleLogout: () => void
    getUserById: (userId: string) => Promise<void>
}

const base_url = "http://localhost:8080/api/v1/users";

export const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [auth, setAuth] = useState<string | null>(null);
    const [user, setUser] = useState<IUser | null>(null);
    const [error, setError] = useState("");

    // useEffect(() => {
    //     const token = localStorage.getItem("token");
    //     if (token) {
    //         const parsedToken = JSON.parse(token);
    //         setAuth(parsedToken);
    //     }
    // }, [])

    useEffect(() => {
        if (auth) {
            const decoded: IJWTPayload = jwtDecode(auth);
            getUserById(decoded._id);
        } else {
            setUser(null);
        }
        console.log(user);

    }, [auth])
    console.log(user);


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
        try {
            const res = await axios.post(`${base_url}/login`, auth);
            setAuth(res.data)
            return true;
        } catch (err) {
            console.error(err);
            setError("Signup failed. Please try again.");
            return false;
        }
    }


    const handleLogout = () => {
        setAuth(null);
        // localStorage.removeItem("auth");
    };

    const getUserById = async (userId: string) => {
        try {
            const res = await axios.get(`${base_url}/${userId}`, {
                headers: {
                    'x-auth-token': auth
                }
            });
            setUser(res.data)
        } catch (error) {
            setError("user doesnt exist");
        }
    }



    return <AuthContext.Provider value={{ auth, error, handleSignup, handleLogin, handleLogout, getUserById, user }}>
        {children}
    </AuthContext.Provider>;
};

export default AuthProvider;
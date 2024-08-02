import { useContext } from "react";
import { LoginContext } from "../contexts/LoginContext";

export const useAuth = () => {
    return useContext(LoginContext);
}
import { createContext, useReducer, useEffect } from "react";

export const AuthContext = createContext();

const initialState = {
    isAuthenticated: false,
    user: null,
};

const savedAuthState = JSON.parse(localStorage.getItem("authState")) || initialState;

const authReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN":
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload,
            };
        case "LOGOUT":
            return {
                ...state,
                isAuthenticated: false,
                user: null,
            };
        default:
            return state;
    }
};

export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, savedAuthState);

    useEffect(() => {
        localStorage.setItem("authState", JSON.stringify(state));
    }, [state]);

    return (
        <AuthContext.Provider value={{ state, dispatch }}>
            {children}
        </AuthContext.Provider>
    );
};

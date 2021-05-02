import React, { createContext, useContext, useReducer } from "react";


export const AuthContext = createContext();


export const AuthProvider = ({ children }) => {

    const [state, dispatch] = useReducer(reducer, { user: null })


    return <AuthContext.Provider value={{ user: state.user, dispatch }}>
        {children}
    </AuthContext.Provider>

}

export const useAuth = () => useContext(AuthContext);


const reducer = (state, action) => {
    console.log(action);

    switch (action.type) {
        case "SET_USER":
            return {
                ...state,
                user: { ...action.payload, isHost: false, isWriter: false, requested: false }
            }
        case "SET_HOST":
            return {
                ...state,
                user: { ...action.payload, isHost: true, isWriter: true }
            }
        case "SET_WRITER":
            return {
                ...state,
                user: { ...action.payload, requested: true }
            }
        case "SET_WRITER_OFF":
            return {
                ...state,
                user: { ...action.payload, isWriter: false, requested: false }
            }
        default:
            return state;
    }
}
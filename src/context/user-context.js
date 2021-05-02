import React, { createContext, useContext, useReducer } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, { user: null, login: false });

  return (
    <AuthContext.Provider
      value={{ user: state.user, dispatch, login: state.login }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

const reducer = (state, action) => {
  console.log(action);

  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.payload,
      };
    case "LOGIN":
      return {
        ...state,
        login: true,
      };
    case "LOGOUT":
      return {
        ...state,
        login: false,
      };
    default:
      return state;
  }
};

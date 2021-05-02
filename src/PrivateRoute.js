import { useAuth } from "./context/user-context";
import { Route, Navigate, useNavigate } from "react-router-dom";
import { useEffect } from "react";
export function PrivateRoute({ path, ...props }) {
  const { login } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    const getLoginStatus = JSON.parse(localStorage?.getItem("login"));

    if (getLoginStatus?.isUserLoggedIn) {
      navigate(path);
    }
  }, [navigate, path]);

  return login ? (
    <Route {...props} path={path} />
  ) : (
    <Navigate state={{ from: path }} replace to='/login' />
  );
}

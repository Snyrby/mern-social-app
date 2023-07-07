import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { protectedRouteApi } from "../api/user";
import { setLogin } from "../state";
import { useEffect } from "react";

const ProtectedRoute = ({ children, ...rest }) => {
  const user = useSelector((state) => state?.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    protectedRouteApi()
      .then((response) => {
        !user && dispatch(setLogin({ user: response }));
        if (JSON.stringify(response) !== JSON.stringify(user)) {
          return <Navigate to={"/"} />;
        }
      })
      .catch(() => {
        return navigate("/");
      });
    }, []);
    return user ? (children ? children : <Outlet />) : null;
};
export default ProtectedRoute;

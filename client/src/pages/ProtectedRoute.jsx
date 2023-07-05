import { Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { protectedRouteApi } from "../api/user";

const ProtectedRoute = ({ children, ...rest }) => {
  // const user = useSelector((state) => state.user);
  // console.log(user);
  // const dispatch = useDispatch();
  // protectedRouteApi(dispatch).then((response) => {
  //   if (JSON.stringify(response) !== JSON.stringify(user)) {
  //     return <Navigate to="/" />;
  //   }
  // });
  return children;
};
export default ProtectedRoute;

import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { protectedRouteApi } from "../api/user";

const ProtectedRoute = ({ children, ...rest }) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  protectedRouteApi(dispatch)
    .then((response) => {
      if (JSON.stringify(response) !== JSON.stringify(user)) {
        return navigate("/");
      }
    })
    .catch(() => {
      return navigate("/");
    });
  return children;
};
export default ProtectedRoute;

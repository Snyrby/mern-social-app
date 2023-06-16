import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { IsLoggedIn } from '../utils';

const ProtectedRoute = ({ children }) => {
  IsLoggedIn();
  // const { data } = await axios.get(`${url}/api/v1/users/showMe`);
  // useDispatch(setLogin({user:data.user}));
  const { user } = useSelector((state) => state.user);
  if (!user) {
    return <Navigate to="/" />;
  }
  return children;
};
export default ProtectedRoute;
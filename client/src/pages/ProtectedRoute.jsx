import { Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { IsLoggedIn, url } from '../utils';
import { useEffect } from 'react';
import axios from 'axios';
import { setLogin } from '../state';

const ProtectedRoute = ({ children }) => {
  useEffect(() => {
    const FetchData = async () => {
      const { data } = await axios.get(`${url}/api/v1/users/showMe`);
      useDispatch(setLogin({user:data.user}));
    }
    FetchData();
  }, []);
  const { user } = useSelector((state) => state.user);
  if (!user) {
    return <Navigate to="/" />;
  }
  return children;
};
export default ProtectedRoute;
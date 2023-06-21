import { Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { url } from '../utils';
import { useEffect } from 'react';
import axios from 'axios';
import { setLogin } from '../state';

const ProtectedRoute = ({ children, ...rest }) => {
  // useEffect(() => {
  //   const FetchData = async () => {
  //     const { data } = await axios.get(`${url}/api/v1/users/showMe`);
  //     useDispatch(setLogin({user:data.user}));
  //   }
  //   FetchData();
  // }, []);
  const user = useSelector((state) => state.user);
  console.log(user);
  if (!user) {
    return <Navigate to="/" />;
  }
  return children;
};
export default ProtectedRoute;
import { url } from "../../utils";
import axios from "axios";

export const userLogoutApi = async () => {
  try {
    const { data } = await axios.delete(`${url}/api/v1/auth/logout`);
  } catch (error) {
    console.log(error);
  }
};

export const registerUserApi = async (formData) => {
  try {
    const { data } = await axios.post(`${url}/api/v1/auth/register`, formData);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const loginUserApi = async (loginUser, setLogin, dispatch) => {
  try {
    const { data } = await axios.post(`${url}/api/v1/auth/login`, loginUser);
    return dispatch(setLogin({ user: data.user }));
  } catch (error) {
    console.log(error);
  }
};

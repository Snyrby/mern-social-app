import { url } from "../../utils";
import axios from "axios";

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
    localStorage.setItem("logged_in", data.token);
    return dispatch(setLogin({ user: data.user }));
  } catch (error) {
    console.log(error);
  }
};

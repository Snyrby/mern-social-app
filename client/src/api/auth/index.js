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
  await axios
    .post(`${url}/api/v1/auth/login`, loginUser)
    .then((response) => {
      console.log(response);
      if (!response.ok) {
        throw new Error(response.message);
      } else {
        dispatch(setLogin({ user: response.data.user }));
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

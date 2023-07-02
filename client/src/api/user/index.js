import { url } from "../../utils";
import axios from "axios";

export const getUserInfoApi = async (setUser, userId) => {
  try {
    const { data } = await axios.get(`${url}/api/v1/users/${userId}`);
    return setUser(data.user);
  } catch (error) {
    console.log(error);
  }
};

import { url } from "../../utils";
import axios from "axios";
axios.defaults.withCredentials = true;

export const getUserInfoApi = async (userId) => {
  const { data } = await axios.get(`${url}/api/v1/users/${userId}`);
  return data.user;
};

export const patchFriendApi = async (
  userId,
  friendId,
  dispatch,
  setFriends
) => {
  try {
    const { data } = await axios.patch(
      `${url}/api/v1/users/${userId}/${friendId}`
    );
    dispatch(setFriends({ friends: data.friends }));
  } catch (error) {
    console.log(error);
  }
};

export const protectedRouteApi = async () => {
  const { data } = await axios.get(`${url}/api/v1/users/showMe`);
  return data.user;
};

export const updateUserApi = async (formData) => {
  const { data } = await axios.patch(
    `${url}/api/v1/users/updateUser`,
    formData,
    {
      withCredentials: true,
    }
  );
  return data.user;
};

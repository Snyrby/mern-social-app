import { url } from "../../utils";
import axios from "axios";

export const getUserInfoApi = async (setUser, userId) => {
  try {
    const { data } = await axios.get(`${url}/api/v1/users/${userId}`);
    return setUser(data?.user);
  } catch (error) {
    console.log(error);
  }
};

export const patchFriendApi = async (userId, friendId, dispatch, setFriends) => {
  try {
    const { data } = await axios.patch(
      `${url}/api/v1/users/${userId}/${friendId}`
    );
    dispatch(setFriends({friends: data?.friends }));
  } catch (error) {
    console.log(error);
  }
};

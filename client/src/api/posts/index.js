import { url } from "../../utils";
import axios from "axios";
axios.defaults.withCredentials = true;
export const patchLikeApi = async (loggedInUserId, postId) => {
  const { data } = await axios.patch(
    `${url}/api/v1/posts/like/${postId}`,
    {
      userId: loggedInUserId,
    },
    { withCredentials: true }
  );
  return data.post;
};

export const createPostApi = async (formData) => {
  const { data } = await axios.post(`${url}/api/v1/posts`, formData, {
    withCredentials: true,
  });
  return data.posts;
};

export const getPostsApi = async () => {
  const { data } = await axios.get(`${url}/api/v1/posts`, {
    withCredentials: true,
  });
  return data.posts;
};

export const getUserPostsApi = async (userId) => {
  const { data } = await axios.get(`${url}/api/v1/posts/${userId}`, {
    withCredentials: true,
  });
  return data.posts;
};

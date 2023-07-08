import { url } from "../../utils";
import axios from "axios";
axios.defaults.withCredentials = true;

export const getCommentsApi = async (postId) => {
  const { data } = await axios.get(`${url}/api/v1/comments/${postId}`, {
    withCredentials: true,
  });
  return data.comments;
};

export const createCommentApi = async (comment) => {
  const { data } = await axios.post(`${url}/api/v1/comments/`, comment, {
    withCredentials: true,
  });
  return data.comment;
};

export const deleteCommentApi = async (commentId, post) => {
  const { data } = await axios.delete(
    `${url}/api/v1/comments/${commentId}`,
    { withCredentials: true },
  );
  return data.msg;
};

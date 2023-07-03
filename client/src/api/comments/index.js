import { url } from "../../utils";
import axios from "axios";

export const getCommentsApi = async (setComments, postId) => {
  try {
    const { data } = await axios.get(`${url}/api/v1/comments/${postId}`);
    setComments({ comments: data.comments });
  } catch (error) {
    console.log(error);
  }
};

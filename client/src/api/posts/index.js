import { authHeader, url } from "../../utils";
import axios from "axios";

export const patchLikeApi = async (
  loggedInUserId,
  postId,
  dispatch,
  setPost, 
) => {
  try {
    const { data } = await axios.patch(`${url}/api/v1/posts/like/${postId}`, {
      userId: loggedInUserId,
    }, authHeader());
    dispatch(setPost({ post: data.post }));
  } catch (error) {
    console.log(error);
  }
};

export const createPostApi = async (formData, dispatch, addPost) => {
  try {
    const { data } = await axios.post(`${url}/api/v1/posts`, formData, authHeader());
    dispatch(addPost({ posts: data.posts }));
  } catch (error) {
    console.log(error);
  }
};

export const getPostsApi = async (dispatch, setPosts) => {
  try {
    const { data } = await axios.get(`${url}/api/v1/posts`, authHeader());
    dispatch(setPosts({ posts: data.posts }));
  } catch (error) {
    console.log(error);
  }
};

export const getUserPostsApi = async (dispatch, setPosts, userId, token) => {
  try {
    const { data } = await axios.get(`${url}/api/v1/posts/${userId}`, authHeader(token));
    dispatch(setPosts({ posts: data.posts }));
  } catch (error) {
    console.log(error);
  }
};

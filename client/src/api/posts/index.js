import { url } from "../../utils";
import axios from "axios";
axios.defaults.withCredentials = true;
export const patchLikeApi = async (
  loggedInUserId,
  postId,
  dispatch,
  setPost
) => {
  try {
    const { data } = await axios.patch(
      `${url}/api/v1/posts/like/${postId}`,
      {
        userId: loggedInUserId,
      },
      { withCredentials: true }
    );
    dispatch(setPost({ post: data.post }));
  } catch (error) {
    console.log(error);
  }
};

export const createPostApi = async (formData, dispatch, addPost, setError) => {
  await axios
    .post(`${url}/api/v1/posts`, formData, {
      withCredentials: true,
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.message);
      } else {
        dispatch(addPost({ posts: response.posts }));
      }
    })
    .catch((error) => {
      console.log(error);
      // dispatch(setError({error: error}));
    });
};

export const getPostsApi = async (dispatch, setPosts) => {
  try {
    const { data } = await axios.get(`${url}/api/v1/posts`, {
      withCredentials: true,
    });
    dispatch(setPosts({ posts: data.posts }));
  } catch (error) {
    console.log(error);
  }
};

export const getUserPostsApi = async (dispatch, setPosts, userId, token) => {
  try {
    const { data } = await axios.get(`${url}/api/v1/posts/${userId}`, {
      withCredentials: true,
    });
    dispatch(setPosts({ posts: data.posts }));
  } catch (error) {
    console.log(error);
  }
};

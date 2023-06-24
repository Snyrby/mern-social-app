import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "../state";
import Post from "./Post";
import { url } from "../utils";
import axios from "axios";

const AllPosts = ({ userId, isProfile = false }) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const getPosts = async () => {
    try {
      const { data } = await axios.get(`${url}/api/v1/posts`);
      dispatch(setPosts({ posts: data.posts }));
    } catch (error) {
      console.log(error);
    }
  };
  const getUserPosts = async () => {
    try {
      const { data } = await axios.get(`${url}/api/v1/posts/${userId}`);
      dispatch(setPosts({ posts: data.posts }));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (isProfile) {
      getUserPosts();
    } else {
      getPosts();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {posts.map(({ _id, user, picturePath, description, likes }) => (
        <Post
          key={_id}
          postId={_id}
          userId={user._id}
          picturePath={picturePath}
          userPicturePath={user.picturePath}
          description={description}
          likes={likes}
          name={`${user.firstName} ${user.lastName}`}
          location={user.location}
        />
      ))}
    </>
  );
};

export default AllPosts;

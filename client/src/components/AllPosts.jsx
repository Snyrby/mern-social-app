import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "../state";
import Post from "./Post";
import { url } from "../utils";
import axios from "axios";

const AllPosts = ({ userId, isProfile = false }) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const getPosts = async () => {
    try {
      const { data } = await axios.get(`${url}/api/v1/posts`);
      dispatch({ posts: data });
    } catch (error) {
      console.log(error);
    }
  };
  const getUserPosts = async () => {
    try {
      const { data } = await axios.get(`${url}/api/v1/posts/${userId}`);
      dispatch({ posts: data });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (!isProfile) {
      getUserPosts()
    } else {
      getPosts()
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <>
      {posts.map(({
        _id,
        user,
        comments, 
        picturePath,
        description,
        likes,
      }) => (<Post 
          key={_id}
          postId={_id}
          user={user}
          // comments={} 
          // picturePath={}
          // description={}
          // likes={}
        />)
      )}
    </>
  );
};

export default AllPosts;

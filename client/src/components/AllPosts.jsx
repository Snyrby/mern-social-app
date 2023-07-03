import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "../state";
import Post from "./Post";
import { getPostsApi, getUserPostsApi } from "../api/posts";

const AllPosts = ({ userId, isProfile = false }) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const postsReversed = [...posts].reverse();
  
  useEffect(() => {
    if (isProfile) {
      getUserPostsApi(dispatch, setPosts, userId);
    } else {
      getPostsApi(dispatch, setPosts);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {postsReversed ? postsReversed.map(
        ({ _id, user, picturePath, description, likes, numOfComments }) => (
          <Post
            key={_id}
            postId={_id}
            postUserId={user._id}
            picturePath={picturePath}
            userPicturePath={user.picturePath}
            description={description}
            likes={likes}
            name={`${user.firstName} ${user.lastName}`}
            location={user.location}
            commentsLength={numOfComments}
          />
        )
      ) : null}
    </>
  );
};

export default AllPosts;

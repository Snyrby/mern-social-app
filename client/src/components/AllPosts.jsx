import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setError, setPosts } from "../state";
import { Post } from "../components";
import { getPostsApi, getUserPostsApi } from "../api/posts";
import { useNavigate } from "react-router-dom";

const AllPosts = ({ userId, isProfile = false }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const posts = useSelector((state) => state.posts);
  const postsReversed = [...posts].reverse();

  useEffect(() => {
    if (isProfile) {
      getUserPostsApi(userId)
        .then((response) => {
          dispatch(setPosts({ posts: response }));
        })
        .catch((error) => {
          dispatch(setError({ error: error.response.data.msg }));
          return navigate(`/error/${error.request.status}`);
        });
    } else {
      getPostsApi()
        .then((response) => {
          dispatch(setPosts({ posts: response }));
        })
        .catch((error) => {
          dispatch(setError({ error: error.response.data.msg }));
          return navigate(`/error/${error.request.status}`);
        });
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {postsReversed
        ? postsReversed.map(
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
          )
        : null}
    </>
  );
};

export default AllPosts;

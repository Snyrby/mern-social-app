import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined,
} from "@mui/icons-material";
import { Box, Divider, IconButton, Typography, useTheme } from "@mui/material";
import { FlexBetween, WidgetWrapper, Friend } from "../style";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "../state";
import url from "../utils/url";
import axios from 'axios';

const Post = ({
  postId,
  userId,
  picturePath,
  userPicturePath,
  description,
  likes,
  name,
  location,
}) => {
  console.log(likes);
  const [isComment, setIsComment] = useState(false)
  const dispatch = useDispatch();
  const loggedInUserId = useSelector((state) => state.user.userId);
  // const isLiked = Boolean(likes[loggedInUserId]);
  if (likes?.get(loggedInUserId)) {
    console.log("no like");
  } else {
    console.log("liked");
  }
  // let isLiked = false;
  // likes[loggedInUserId] ? isLiked = true : isLiked = false;
  // console.log(isLiked);

  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;

  const patchLike = async () => {
    try {
      const { data } = await axios.patch(`${url}/api/v1/posts/${postId}/like`)
      const updatedPost = data.updatedPost;
      const likeCount = data.count;
      dispatch(setPost({ post: updatedPost }))
    } catch (error) {
      
    }
  }
  return (
    <WidgetWrapper m="2rem 0"> 
      <Friend 
        friendId={userId}
        name={name}
        subtitle={location}
        userPicturePath={userPicturePath}
      />
    </WidgetWrapper>
  )
}

export default Post
import { Box, useMediaQuery } from "@mui/material";
import { Advert, AllPosts, FriendList, Navbar, UserInfo, CreatePosts } from "../components";
import { useSelector } from "react-redux";

const HomePage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const { userId, picturePath } = useSelector((state) => state.user);
  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="space-between"
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <UserInfo userId={userId} picturePath={picturePath} />
        </Box>
        <Box 
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem" }
        >
          <CreatePosts picturePath={picturePath} />
          <AllPosts userId={userId} />
        </Box>
        {isNonMobileScreens && (
          <Box flexBasis="26%">
            <Advert />
            <Box m="2rem 0" />
            <FriendList userId={userId} />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default HomePage;

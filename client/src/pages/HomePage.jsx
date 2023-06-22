import { Box, useMediaQuery } from "@mui/material";
import { Navbar } from "../components";
import { useSelector } from "react-redux";
import { UserInfo, Posts } from "../components";

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
          <Posts picturePath={picturePath} />
        </Box>
        {isNonMobileScreens && (
          <Box flexBasis="26%">

          </Box>
        )}
      </Box>
    </Box>
  );
};

export default HomePage;

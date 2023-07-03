import { useEffect, useRef, useState } from "react";
import {
  Box,
  IconButton,
  InputBase,
  Typography,
  Select,
  MenuItem,
  FormControl,
  useTheme,
  useMediaQuery,
  Tooltip,
  Menu,
  Popper,
  Grow,
  Paper,
  ClickAwayListener,
  Button,
  Container,
} from "@mui/material";
import {
  Search,
  Message,
  DarkMode,
  LightMode,
  Notifications,
  Help,
  Close,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { setMode, setLogout } from "../state";
import { useNavigate } from "react-router-dom";
import { FlexBetween, FlexCenter, UserImage } from "../style";
import { userLogoutApi } from "../api/auth";

const Navbar = () => {
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
  const [isMenuToggled, setIsMenuToggled] = useState(false);
  const open = Boolean(isMenuToggled);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state?.user);
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const theme = useTheme();
  const neutralLight = theme?.palette?.neutral?.light;
  const dark = theme?.palette?.neutral?.dark;
  const background = theme?.palette?.background?.default;
  const primaryLight = theme?.palette?.primary?.light;
  const alt = theme?.palette?.background?.alt;
  const fullName = `${user?.firstName} ${user?.lastName}`;
  const anchorRef = useRef(null);

  const logOut = () => {
    userLogoutApi();
    dispatch(setLogout());
  };

  const handleClose = (event) => {
    if (anchorRef?.current?.contains(event?.target)) {
      return;
    }

    setIsMenuToggled(false);
  };

  const handleClick = (event) => {
    setIsMenuToggled(event?.currentTarget);
  };

  function handleListKeyDown(event) {
    if (event?.key === "Tab") {
      event.preventDefault();
      setIsMenuToggled(false);
    } else if (event.key === "Escape") {
      setIsMenuToggled(false);
    }
  }

  return (
    <FlexBetween padding="1rem 6%" backgroundColor={alt}>
      <FlexBetween gap="1.75rem">
        <Typography
          fontWeight="bold"
          fontSize="clamp(1rem, 2rem, 2.25rem)"
          color="primary"
          onClick={() => navigate("/home")}
          sx={{
            "&:hover": {
              color: primaryLight,
              cursor: "pointer",
            },
          }}
        >
          Sociopedia
        </Typography>
        <FlexBetween
          borderColor={neutralLight}
          borderRadius="9px"
          gap="3rem"
          padding="0.1rem 1.5rem"
        >
          <InputBase placeholder="Search..." />
          <IconButton>
            <Search />
          </IconButton>
        </FlexBetween>
      </FlexBetween>

      {/* DESKTOP NAV */}
      <FlexBetween gap="2rem">
        {isNonMobileScreens && (
          <IconButton onClick={() => dispatch(setMode())}>
            {theme.palette.mode === "dark" ? (
              <DarkMode sx={{ fontSize: "25px" }} />
            ) : (
              <LightMode sx={{ color: dark, fontSize: "25px" }} />
            )}
          </IconButton>
        )}
        {isNonMobileScreens ? <Message sx={{ fontSize: "25px" }} /> : undefined}
        {isNonMobileScreens ? (
          <Notifications sx={{ fontSize: "25px" }} />
        ) : undefined}
        {isNonMobileScreens ? <Help sx={{ fontSize: "25px" }} /> : undefined}
        <Tooltip title="Account settings">
          <Button
            onClick={handleClick}
            id="menu-button"
            aria-controls={open ? "account-menu" : undefined}
            aria-aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <UserImage size="40px" image={user?.picturePath} />
          </Button>
        </Tooltip>
        {isMenuToggled && (
          <ClickAwayListener onClickAway={handleClose}>
            <Menu
              open={open}
              // autoFocusItem={isMenuToggled}
              id="account-menu"
              onKeyDown={handleListKeyDown}
              anchorEl={isMenuToggled}
              MenuListProps={{ "aria-labelledby": "menu-button" }}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              <MenuItem onClick={handleClose}>My account</MenuItem>
              {!isNonMobileScreens && (
                <MenuItem onClick={() => dispatch(setMode())}>
                  {theme.palette.mode === "dark" ? (
                    <FlexCenter gap="0.57rem">
                      <DarkMode sx={{ fontSize: "18px" }} />
                      <Typography>Dark Mode</Typography>
                    </FlexCenter>
                  ) : (
                    <FlexCenter gap="0.6rem">
                      <LightMode sx={{ color: dark, fontSize: "18px" }} />
                      <Typography color={dark}>Light Mode</Typography>
                    </FlexCenter>
                  )}
                </MenuItem>
              )}
              {!isNonMobileScreens && (
                <MenuItem>
                  <Message sx={{ fontSize: "18px", marginRight:"5px" }} />
                  <Typography color={dark}>Light Mode</Typography>
                </MenuItem>
              )}
              {!isNonMobileScreens && (
                <MenuItem>
                  <Notifications sx={{ fontSize: "18px" }} />
                </MenuItem>
              )}
              {!isNonMobileScreens && (
                <MenuItem>
                  <Help sx={{ fontSize: "18px" }} />
                </MenuItem>
              )}
              <MenuItem
                onClick={() => {
                  handleClose();
                  logOut();
                }}
              >
                Logout
              </MenuItem>
            </Menu>
          </ClickAwayListener>
        )}
      </FlexBetween>

      {/* MOBILE NAV */}
      {!isNonMobileScreens && isMobileMenuToggled && (
        <Box
          position="fixed"
          right="0"
          bottom="0"
          height="100%"
          zIndex="10"
          maxWidth="500px"
          minWidth="300px"
          backgroundColor={background}
        >
          {/* CLOSE ICON */}
          <Box display="flex" justifyContent="flex-end" p="1rem">
            <IconButton
              onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
            >
              <Close />
            </IconButton>
          </Box>
          {/* MENU ITEMS */}
          <FlexBetween
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            gap="3rem"
          >
            <IconButton
              onClick={() => dispatch(setMode())}
              sx={{ fontSize: "25px" }}
            >
              {theme.palette.mode === "dark" ? (
                <DarkMode sx={{ fontSize: "25px" }} />
              ) : (
                <LightMode sx={{ color: dark, fontSize: "25px" }} />
              )}
            </IconButton>
            <Message sx={{ fontSize: "25px" }} />
            <Notifications sx={{ fontSize: "25px" }} />
            <Help sx={{ fontSize: "25px" }} />
            <FormControl variant="standard" value={fullName}>
              <Select
                value={fullName}
                sx={{
                  backgroundColor: neutralLight,
                  width: "150px",
                  borderRadius: "0.25rem",
                  p: "0.25rem 1rem",
                  "& .MuiSvgIcon-root": {
                    pr: "0.25rem",
                    width: "3rem",
                  },
                  "& .MuiSelect-select:focus": {
                    backgroundColor: neutralLight,
                  },
                }}
                input={<InputBase />}
              >
                <MenuItem value={fullName}>
                  <Typography sx={{ textTransform: "capitalize" }}>
                    {fullName}
                  </Typography>
                </MenuItem>
                <MenuItem onClick={() => navigate(`/edit-profile/${user._id}`)}>
                  <Typography>Profile</Typography>
                </MenuItem>
                <MenuItem onClick={() => logOut()}>Log Out</MenuItem>
              </Select>
            </FormControl>
          </FlexBetween>
        </Box>
      )}
    </FlexBetween>
  );
};

export default Navbar;

import { useRef, useState } from "react";
import {
  IconButton,
  InputBase,
  Typography,
  MenuItem,
  useTheme,
  useMediaQuery,
  Tooltip,
  Menu,
  ClickAwayListener,
  Button,
} from "@mui/material";
import {
  Search,
  Message,
  DarkMode,
  LightMode,
  Notifications,
  Help,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { setMode, setLogout } from "../state";
import { useNavigate } from "react-router-dom";
import { FlexBetween, FlexCenter, UserImage } from "../style";
import { userLogoutApi } from "../api/auth";

const Navbar = () => {
  const [isMenuToggled, setIsMenuToggled] = useState(false);
  const open = Boolean(isMenuToggled);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const theme = useTheme();
  const neutralLight = theme.palette.neutral.light;
  const dark = theme.palette.neutral.dark;
  const background = theme.palette.background.default;
  const primaryLight = theme.palette.primary.light;
  const alt = theme.palette.background.alt;
  const fullName = `${user.firstName} ${user.lastName}`;
  const anchorRef = useRef(null);

  const logOut = () => {
    userLogoutApi();
    dispatch(setLogout());
    navigate("/");
  };

  const handleClose = (event) => {
    if (anchorRef.current?.contains(event.target)) {
      return;
    }

    setIsMenuToggled(false);
  };

  const handleClick = (event) => {
    setIsMenuToggled(event.currentTarget);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
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
          backgroundColor={background}
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
            <UserImage size="40px" image={user.picturePath} />
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
              <MenuItem onClick={handleClose} sx={{textTransform:"capitalize"}}>{fullName}</MenuItem>
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
                  <Typography color={dark}>Messages</Typography>
                </MenuItem>
              )}
              {!isNonMobileScreens && (
                <MenuItem>
                  <Notifications sx={{ fontSize: "18px", marginRight:"5px" }} />
                  <Typography color={dark}>Notifications</Typography>
                </MenuItem>
              )}
              {!isNonMobileScreens && (
                <MenuItem>
                  <Help sx={{ fontSize: "18px", marginRight:"5px" }} />
                  <Typography color={dark}>Help</Typography>
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
    </FlexBetween>
  );
};

export default Navbar;

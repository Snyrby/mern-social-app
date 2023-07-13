import { Box } from "@mui/material";
import { styled } from "@mui/system";

export const FlexBetween = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});
export const FlexStart = styled(Box)({
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "flex-start",
});
export const FlexCenter = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});
export const FlexEnd = styled(Box)({
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center",
});

export const WidgetWrapper = styled(Box)(({ theme }) => ({
  padding: "1.5rem 1.5rem 0.75rem",
  backgroundColor: theme.palette.background.alt,
  borderRadius: "0.75rem",
}));

export const UserImage = ({ image, size = "60px" }) => {
  const userImage = (image) => {
    try {
      return require(`./assets/${image}`)
    } catch (error) {
      return require("./assets/avatar.svg");
    }
  }
  return (
    <Box width={size} height={size}>
      <img
        style={{ objectFit: "cover", borderRadius: "50%", cursor: "pointer" }}
        width={size}
        height={size}
        alt="user"
        src={userImage(image)}
      />
    </Box>
  );
};

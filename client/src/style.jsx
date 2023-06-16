import { Box } from "@mui/material";
import { styled } from "@mui/system";
import url from "./utils/url";


export const FlexBetween = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

export const WidgetWrapper = styled(Box)(({ theme }) => ({
  padding: "1.5rem 1.5rem 0.75rem",
  backgroundColor: theme.palette.background.alt,
  borderRadius: "0.75rem",
}));

export const UserImage = ({ image, size="60px" }) => {
  return (
    <Box width={size} height={size}>
      <img 
      style={{ objectFit: "cover", borderRadius: "50%" }}
      width={size}
      height={size}
      alt="user"
      src={`${url}/public/${image}`}
      />
    </Box>
  )
};
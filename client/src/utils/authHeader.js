export const authHeader = () => ({
  headers: { Authorization: `Bearer ${localStorage.getItem("logged_in")}` },
});

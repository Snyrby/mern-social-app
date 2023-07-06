import { React, useMemo } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage, LoginPage, ProfilePage, ProtectedRoute } from "./pages";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";
import { ErrorHandler } from "./components";

function App() {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return (
    <div className="App">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route exact path="/" element={<LoginPage />} />
            <Route
              exact
              path="/home"
              element={
                <ProtectedRoute>
                  <HomePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile/:userId"
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />
            <Route path="/error/:code" element={<ErrorHandler />} />
            <Route path="*" element={<ErrorHandler notFoundCode={404} notFoundMessage={"We can't seem to find the page you're looking for"}/>} />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;

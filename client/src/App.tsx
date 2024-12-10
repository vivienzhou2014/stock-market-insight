import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useMemo, useState } from "react";
import { themeSettings } from "./theme";
import { Box, CssBaseline } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "@/scenes/navbar";
import Dashboard from "@/scenes/dashboard";
import Predictions from "./scenes/predictions";
import LoginPage from "./LoginPage"; // Import LoginPage

function App() {
  const theme = useMemo(() => createTheme(themeSettings), []);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login state

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {!isLoggedIn ? (
            // Show LoginPage if not logged in
            <LoginPage onLoginSuccess={() => setIsLoggedIn(true)} />
          ) : (
            // Show main app after login
            <Box width="100%" height="100%" padding="1rem 2rem 4rem 2rem">
              <Navbar />
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/predictions" element={<Predictions />} />
              </Routes>
            </Box>
          )}
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;

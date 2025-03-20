import Box from "@mui/material/Box";
import SearchInput from "./components/searchInput.jsx";
import CurrentWeather from "./components/CurrentWeather.jsx";
import WeekForecast from "./components/weekForecast.jsx";
import "./index.css";
import Header from "./components/Header.jsx";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { useState, useMemo, useCallback } from "react";
import getDesignTokens from "./utils/DarkLightTheme.js";
import WeatherContext from "./API/createContext.js";
import { grey, red } from "@mui/material/colors";
import { SWRConfig } from "swr";
import { SWRDevTools } from "swr-devtools";

// Retrieve initial values from localStorage
const getStoredValue = (key, defaultValue) => localStorage.getItem(key) || defaultValue;

function App() {
  const [mode, setMode] = useState(getStoredValue("mode", "light"));
  const [cityInput, setCityInput] = useState("");
  const [errorMessage, setErrorMessage] = useState(false);
  const [temperatureUnit, setTemperatureUnit] = useState(getStoredValue("unit", "Celsius"));

  // Optimize theme creation with useMemo
  const mytheme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  // Use useCallback to optimize setMode function
  const toggleMode = useCallback(() => {
    setMode((prevMode) => {
      const newMode = prevMode === "light" ? "dark" : "light";
      localStorage.setItem("mode", newMode);
      return newMode;
    });
  }, []);

  return (
    <ThemeProvider theme={mytheme}>
      <CssBaseline />
      <SWRConfig
        value={{
          revalidateOnFocus: false,
          revalidateOnReconnect: false,
          refreshInterval: 0,
          dedupingInterval: 10000,
        }}
      >
        <SWRDevTools>
          <WeatherContext.Provider
            value={{
              cityInput,
              temperatureUnit,
              setTemperatureUnit,
              setCityInput,
              setErrorMessage,
            }}
          >
            <Box
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-around",
                alignItems: "center",
                minHeight: "100vh",
                backgroundImage: `url(${
                  mode === "light" ? "./lightBackgroundImage.jpg" : "./darkBackgroundImage.jpg"
                })`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
              }}
            >
              <Box sx={{ width: { xs: "85vw", sm: "70vw", md: "65vw" } }}>
                <Header mode={mode} setMode={toggleMode} />
                <SearchInput />
                {errorMessage && (
                  <Box
                    sx={{
                      width: "fit-content",
                      m: "15px 30px",
                      p: "10px 25px",
                      fontSize: "18px",
                      color: grey[100],
                      border: `1px solid ${grey[100]}`,
                      bgcolor: red[300],
                      borderRadius: "10px",
                    }}
                  >
                    {errorMessage}
                  </Box>
                )}
              </Box>
              <CurrentWeather />
              <WeekForecast />
            </Box>
          </WeatherContext.Provider>
        </SWRDevTools>
      </SWRConfig>
    </ThemeProvider>
  );
}

export default App;

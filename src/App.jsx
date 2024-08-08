import Box from "@mui/material/Box";
import SearchInput from "./components/searchInput.jsx";
import CurrentWeather from "./components/CurrentWeather.jsx";
import WeekForecast from "./components/weekForecast.jsx";
import "./index.css";
import Header from "./components/Header.jsx";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { useState } from "react";
import getDesignTokens from "./DarkLightTheme.js";
import WeatherContext from "./API/createContext.js";
import { grey, red } from "@mui/material/colors";
import { SWRConfig } from "swr";
import {SWRDevTools} from 'swr-devtools';


function App() {
  const [mode, setMode] = useState(localStorage.getItem("mode") || "light");
  const [cityInput, setCityInput] = useState("");
  const [errorMessage, setErrorMessage] = useState(false);

  let unit = localStorage.getItem("unit")
    ? localStorage.getItem("unit")
    : "Celsius";

  const [temperatureUnit, setTemperatureUnit] = useState(unit);
  const mytheme = createTheme(getDesignTokens(mode));
  console.log("ana lkbir rani hna")
  return (
    <>
      <ThemeProvider theme={mytheme}>
        <CssBaseline />
        <SWRConfig
          value={{
            revalidateOnFocus: false, // Revalidate on window focus
            revalidateOnReconnect: false, // Revalidate on network reconnection
            refreshInterval: 0, // Refresh every 5 minutes (300000 ms)
            dedupingInterval: 10000
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
                justifyContent: "space-evenly",
                alignItems: "center",
                minHeight: "100vh",
                backgroundImage: `url(${
                  mode === "light"
                    ? "./lightBackgroundImage.jpg"
                    : "./darkBackgroundImage.jpg"
                })`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
              }}
            >
              <Box sx={{ width: {xs:"85vw",sm:"70vw",md:"65vw" }}}>
                <Header mode={mode} setMode={setMode} />
                <SearchInput />
                <Box
                  sx={{
                    width: "fit-content",
                    display: errorMessage? "block" : "none",
                    m: "15px 30px",
                    p: "10px 25px",
                    fontSize: "18px",
                    color: grey[100],
                    border: "1px solid ",
                    borderColor: grey[100],
                    bgcolor:red[300],
                    borderRadius: "10px",
                  }}
                >
                  you have entered unkown city name !!!
                </Box>
              </Box>
              <CurrentWeather />
              <WeekForecast />
            </Box>
          </WeatherContext.Provider>
          </SWRDevTools>
        </SWRConfig>
      </ThemeProvider>
    </>
  );
}
export default App;

import {
  Box,
  CircularProgress,
  Paper,
  Typography,
  useTheme,
} from "@mui/material";
import WeekForecastItem from "./weekForecastItem";
import useCityWeekWeather from "../API/weekforecastAPI";
import React, { useRef, useEffect } from "react";
import useWeatherContext from "../API/useWeatherContext";

const WeekForecast = React.memo(() => {
  const { cityInput, setErrorMessage } = useWeatherContext();
  const { weekWeather, isLoading, error } = useCityWeekWeather(cityInput);
  const theme = useTheme();
  const itemsRef = useRef([]);

  if (weekWeather) {
    itemsRef.current = weekWeather.map((dayForecast) => (
      <WeekForecastItem key={dayForecast.id} dayForecast={dayForecast} />
    ));
  }
  console.log("ana week rani hna");
  useEffect(() => {
    if (error) {
      setErrorMessage(true);
    }
  }, [error, setErrorMessage]);

  if (isLoading)
    return (
      <div>
        <CircularProgress sx={{ pr: "15px" }} /> Loading...
      </div>
    );

  if (weekWeather.length !== 0) {
    return (
      <Paper
        component="section"
        sx={{
          width: { xs: "85vw", sm: "75vw", md: "65vw" },
          height: 250,
          bgcolor: theme.palette.background.paper,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
          paddingInline: "20px",
          mb: "40px",
        }}
      >
        <Typography
          variant="h5"
          color={theme.palette.primary.main}
          sx={{
            fontWeight: "bold",
            fontSize: {
              xs: "15px",
              md: "25px",
            },
          }}
        >
          5 days forecast
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            width: "100%",
            overflowX:"auto"
          }}
        >
          {itemsRef.current}
        </Box>
      </Paper>
    );
  }
});

WeekForecast.displayName = "weekForecast";
export default WeekForecast;

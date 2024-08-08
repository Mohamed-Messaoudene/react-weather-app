import { Box, CircularProgress, Grid, Paper, Toolbar, Typography, useTheme } from "@mui/material";
import {  WaterDrop, Air, Speed } from "@mui/icons-material";
import useCityWeather from "../API/currentweatherAPI";
import PropTypes from "prop-types";
import WeatherIcon from "./weatherIcon";
import ToggleGroupUnit from "./ToggleGroupUnit";
import { useEffect, useState } from "react";
import React from "react";
import { convertTemperature } from "../convertTemperature";
import useWeatherContext from "../API/useWeatherContext";

const CurrentWeather = React.memo(() => {
  const theme = useTheme();
  const { cityInput, temperatureUnit, setErrorMessage } =
    useWeatherContext();
  const { weatherState, isLoading, error } = useCityWeather(cityInput);
  const [displayTemp, setDisplayTemp] = useState({
    temp: weatherState ? weatherState.temp : null,
    feelsLike: weatherState ? weatherState.feelsLike : null,
  });

  useEffect(() => {
    if (weatherState) {
      const newTemp =
        temperatureUnit === "celicuis"
          ? weatherState.temp
          : convertTemperature("fahrenheit", weatherState.temp);
      const newFeelsLike =
        temperatureUnit === "celicuis"
          ? weatherState.feelsLike
          : convertTemperature("fahrenheit", weatherState.feelsLike);

      if (
        displayTemp.temp !== newTemp ||
        displayTemp.feelsLike !== newFeelsLike
      ) {
        setDisplayTemp({
          temp: newTemp,
          feelsLike: newFeelsLike,
        });
      }
    }
  }, [weatherState, temperatureUnit, displayTemp]);
  useEffect(() => {
    if (error) {
      setErrorMessage(true);
      return;
    }
  },[error,setErrorMessage]);
 
console.log("ana current rani hna")
  if (isLoading) return <div><CircularProgress sx={{pr:"15px"}}/> Loading...</div>;

  if (weatherState) {
    return (
      <Paper
        component="section"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
          width: { xs: "85vw",sm:"75vw",md:"65vw" },
          height: { xs: 530, md: 350 },
          pb: { xs: "30px", md: "50px" },
          marginBlock: "30px",
        }}
      >
        <Toolbar
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
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
            Current weather
          </Typography>
          <ToggleGroupUnit />
        </Toolbar>
        <Box
          component={"section"}
          sx={{
            width: "95%",
            height: {
              xs: "80%",
              md: "55%",
            },
            display: "flex",
            flexDirection: {
              xs: "column",
              md: "row",
            },
            justifyContent: { xs: "space-between", md: "space-around" },
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              width: { xs: "95%", md: "40%" },
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            alignItems:{xs:"center",md:"flex-start"},
              color: theme.palette.primary.main,
            }}
          >
            <Typography
              variant="h5"
              color="inherit"
              sx={{ fontWeight: "bold", pb: "18px" ,fontSize:{xs:"20px",sm:"25px",md:"30px"}}}
            >
              {weatherState.city}
            </Typography>
            <Box
              sx={{
                display: "flex",
                ml: "-20px",
              }}
            >
              <WeatherIcon code={weatherState.icon} size="100px"/>
              <Typography
                variant="body1"
                component={"span"}
                sx={{ color: "inherit", fontSize: {xs:"40px",sm:"68px",md:"68px"}, pl: "20px" ,pt:{xs:"15px",sm:"0px"}}}
              >
                {displayTemp.temp}°{temperatureUnit === "celicuis" ? "C" : "F"}
              </Typography>
            </Box>
            <Typography
              variant="body1"
              sx={{
                color: theme.palette.primary.text,
                fontWeight: "bold",
                fontSize: {xs:"18px",sm:"22px"},
              }}
            >
              {weatherState.state}
            </Typography>
          </Box>
          <Grid
            container
            spacing={2}
            columns={10}
            alignItems={"center"}
            sx={{
              width: { xs: "90%",sm:"75%", md: "50%" },
              fontSize: { xs: "13px", md: "16px" },
            }}
          >
            <Grid item xs={10}  >
              <Typography variant="body1">
                Feels like <span>{displayTemp.feelsLike}</span>°
                {temperatureUnit === "celicuis" ? "C" : "F"}
              </Typography>
            </Grid>
            <Grid item xs={1}>
              <Air />
            </Grid>
            <Grid item xs={5}>
              <Typography variant="body1"  sx={{pl:"12px",fontSize:{xs:"12px",sm:"15px",md:"17px"}}}>Wind speed</Typography>
            </Grid>
            <Grid item xs={4}>
              <span
                style={{
                  color: theme.palette.primary.main,
                  fontWeight: "bold",
                }}
              >
                {weatherState.windSpeed} km/h
              </span>
            </Grid>
            <Grid item xs={1}>
              <WaterDrop />
            </Grid>
            <Grid item xs={5}>
              <Typography variant="body1" sx={{pl:"12px",fontSize:{xs:"12px",sm:"15px",md:"17px"}}}>Humidity</Typography>
            </Grid>
            <Grid item xs={4}>
              <span
                style={{
                  color: theme.palette.primary.main,
                  fontWeight: "bold",
                }}
              >
                {weatherState.humidity}%
              </span>
            </Grid>
            <Grid item xs={1}>
              <Speed />
            </Grid>
            <Grid item xs={5}>
              <Typography variant="body1"  sx={{pl:"12px",fontSize:{xs:"12px",sm:"15px",md:"17px"}}}>Atmospheric pressure</Typography>
            </Grid>
            <Grid item xs={4}>
              <span
                style={{
                  color: theme.palette.primary.main,
                  fontWeight: "bold",
                }}
              >
                {weatherState.pressure} hPa
              </span>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    );
  }
});

// Add display name for the memoized component
CurrentWeather.displayName = "CurrentWeather";

CurrentWeather.propTypes = {
  cityName: PropTypes.string,
};

export default CurrentWeather;

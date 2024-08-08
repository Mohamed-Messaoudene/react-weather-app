import { Box, Typography, useTheme } from "@mui/material";
import WeatherIcon from "./weatherIcon";
import {useState ,useEffect} from "react";
import PropTypes from "prop-types";
import { convertTemperature } from "../convertTemperature";
import useWeatherContext from "../API/useWeatherContext";

const WeekForecastItem = ({ dayForecast }) => {
  const theme = useTheme();
  const [displayTemp, setDisplayTemp] = useState({
    min_temp: dayForecast ? dayForecast.min_temp : null,
    max_temp: dayForecast ? dayForecast.max_temp : null,
  });
  const {temperatureUnit}=useWeatherContext();
  useEffect(() => {
    if (dayForecast) {
      const newMinTemp = temperatureUnit === "celicuis"
        ? dayForecast.min_temp
        : convertTemperature("fahrenheit", dayForecast.min_temp);
      const newMaxTemp = temperatureUnit === "celicuis"
        ? dayForecast.max_temp
        : convertTemperature("fahrenheit", dayForecast.max_temp);
        
      if (displayTemp.max_temp !== newMaxTemp || displayTemp.min_temp !== newMinTemp) {
        setDisplayTemp({
          min_temp: newMinTemp,
          max_temp: newMaxTemp,
        });
      }
    }
  }, [dayForecast, temperatureUnit, displayTemp]);
  console.log("weekitem render");
  return (
    <Box
      key={dayForecast.id}
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        alignItems: "center",
        width:{xs:"140px",sm:"140px"}
      }}
    >
      <Typography variant="h6" color={theme.palette.primary.main} sx={{fontSize:{xs:"13px",sm:"15px",md:"18px"}}}>
        {dayForecast.dayName}
      </Typography>
      <WeatherIcon code={dayForecast.icon_code} size={"70px"} />
      <Typography variant="body1" color={theme.palette.primary.text} sx={{fontSize:{xs:"13px",sm:"15px",md:"18px"}}}>
        {dayForecast.description}
      </Typography>
      <Typography variant="subtitle1" color={theme.palette.primary.text} sx={{fontSize:{xs:"13px",sm:"15px",md:"18px"}}}>
        {displayTemp.max_temp}°/{displayTemp.min_temp}°
      </Typography>
    </Box>
  );
};
WeekForecastItem.propTypes = {
  dayForecast: PropTypes.shape({
    id: PropTypes.any,
    min_temp: PropTypes.number,
    max_temp: PropTypes.number,
    description: PropTypes.string,
    icon_code: PropTypes.any,
    dayName: PropTypes.string
  })
};
export default WeekForecastItem;

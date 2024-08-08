import { ToggleButton, ToggleButtonGroup } from '@mui/material'
import { useContext } from 'react'
import WeatherContext from '../API/createContext'
import { indigo } from '@mui/material/colors';


//ToggleGroupUnit component
function ToggleGroupUnit() {
    const {temperatureUnit,setTemperatureUnit} =useContext(WeatherContext);
    const handleUnitChange = (unit,newUnit) => {
        if(newUnit!==null){
            setTemperatureUnit(newUnit);
            localStorage.setItem("unit",newUnit)
        } 
      };
  return (
    <ToggleButtonGroup
          color="primary"
          value={temperatureUnit}
          exclusive
          onChange={handleUnitChange}
          aria-label="unit of temperature"
          size="small"
          sx={{border:"1px solid",
            borderColor:indigo[500]}}
        >
          <ToggleButton
            value="celicuis"
            sx={{
              fontSize: {
                xs: "8px",
                sm: "12px",
                md:"15px"
              },
              
            }}
          >
            celsius
          </ToggleButton>
          <ToggleButton
            value="fahrenheit"
            sx={{
              fontSize: {
                xs: "8px",
                sm: "12px",
                md:"15px"
              },
            }}
          >
            fahrenheit
          </ToggleButton>
        </ToggleButtonGroup>
  )
}

export default ToggleGroupUnit
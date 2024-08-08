import { IconButton, Paper, Divider, InputBase, Tooltip } from "@mui/material";
import { FmdGood, Search } from "@mui/icons-material";
import PropTypes from "prop-types";
import {   useRef, useState } from "react";
import { red } from "@mui/material/colors";
import useCityName from "../API/useCityName";
import useWeatherContext from "../API/useWeatherContext";

const SearchInput = () => {
  const inputRef = useRef(null);
  const [isclicked,setIsclicked]=useState(false);
  const [open, setOpen] = useState(false);
  const { cityInput, setCityInput,setErrorMessage } = useWeatherContext();

  const handleSearchClick = () => {
    setErrorMessage(false);
    setIsclicked(false);
    if (inputRef.current.value == "") {
      setOpen(true);
      console.log(inputRef.current.value);
    } 
    inputRef.current.blur();
    setCityInput(inputRef.current.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSearchClick();
    
    }
  };
  const handleMapClick =() => {
     setIsclicked(true);
  };
 
  const {cityName,error}=useCityName(isclicked);
   if(cityName){
    setCityInput(cityName);
   }  
   if(error){
    alert(error)
   }
  return (
    <>
      <Paper
        component="form"
        sx={{
          p: "2px 4px",
          display: "flex",
          alignItems: "center",
          width: "100%",
          borderRadius: "10px",
          border: "1px solid white",
        }}
      >
        <Tooltip
          open={open}
          disableFocusListener
          disableHoverListener
          disableTouchListener
          title="you have to enter a city"
          placement="top"
          componentsProps={{
            tooltip: {
              sx: {
                backgroundColor: red[400], // Use the desired color from the palette
                color: "white", // Tooltip text color
              },
            },
          }}
        >
          <InputBase
            inputRef={inputRef}
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search for a city"
            inputProps={{ "aria-label": "search for a city" }}
            onKeyDown={handleKeyDown}
            onFocus={() => {
              setOpen(false);
              setErrorMessage(false)
            }}
          />
        </Tooltip>
        <IconButton
          type="button"
          sx={{ p: "10px" }}
          aria-label="search"
          onClick={handleSearchClick}
        >
        <Search value={cityInput} sx={{fontSize:{ xs: "22px", sm: "26px", md: "30px" }}}  />
        </IconButton>
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <Tooltip title="your location" placement="top-start">
          <IconButton
            color="primary"
            sx={{ p: "10px" }}
            aria-label="directions"
            onClick={handleMapClick}
          >
            <FmdGood sx={{fontSize:{ xs: "22px", sm: "26px", md: "30px" }}}/>
          </IconButton>
        </Tooltip>
      </Paper>
    </>
  );
};
SearchInput.propTypes = {
  cityInput: PropTypes.string,
  setCityInput: PropTypes.func,
};

export default SearchInput;

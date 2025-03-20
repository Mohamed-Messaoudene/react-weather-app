import { useState, useRef } from "react";
import { IconButton, Paper, Divider, InputBase, Tooltip } from "@mui/material";
import { FmdGood, Search } from "@mui/icons-material";
import { red } from "@mui/material/colors";
import useWeatherContext from "../API/useWeatherContext";
import { getCityFromLocation } from "../API/getCityFromLocation"; // Import function

const SearchInput = () => {
  const inputRef = useRef(null);
  const [open, setOpen] = useState(false);
  const { setCityInput, setErrorMessage } = useWeatherContext();

  const handleSearchClick = () => {
    setErrorMessage(false);
    const inputValue = inputRef.current.value.trim();

    if (!inputValue) {
      setOpen(true);
      return;
    }
    setCityInput(inputValue);
    inputRef.current.blur();
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSearchClick();
    }
  };

  return (
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
        title="You have to enter a city"
        placement="top"
        componentsProps={{
          tooltip: {
            sx: {
              backgroundColor: red[400],
              color: "white",
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
            setErrorMessage(false);
          }}
        />
      </Tooltip>
      <IconButton
        type="button"
        sx={{ p: "10px" }}
        aria-label="search"
        onClick={handleSearchClick}
      >
        <Search sx={{ fontSize: { xs: "22px", sm: "26px", md: "30px" } }} />
      </IconButton>
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <Tooltip title="Your location" placement="top-start">
        <IconButton
          color="primary"
          sx={{ p: "10px" }}
          aria-label="get location"
          onClick={() => getCityFromLocation(setCityInput, setErrorMessage,inputRef)}
        >
          <FmdGood sx={{ fontSize: { xs: "22px", sm: "26px", md: "30px" } }} />
        </IconButton>
      </Tooltip>
    </Paper>
  );
};

export default SearchInput;

import { Box, IconButton, Tooltip, Typography, useTheme } from "@mui/material";
import { LightMode, DarkMode, GitHub } from "@mui/icons-material";
import PropTypes from "prop-types";

const Header = ({ mode, setMode }) => {
  const theme = useTheme();

  const handleMode = () => {
    setMode(mode === "light" ? "dark" : "light");
    localStorage.setItem("mode", mode === "light" ? "dark" : "light");
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "100px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        color: theme.palette.primary.main,
      }}
    >
      <div style={{ height: "80px",display:"flex",alignItems:"center" }}>
        <Typography
          variant="h5"
          sx={{
            fontWeight: "bolder",
            fontSize: { xs: "19px", sm: "28px", md: "30px" },
            letterSpacing: "2px",
          }}
        >
          Weather app
        </Typography>
      </div>
      <Box>
        <IconButton
          aria-label="icon for toggle mode"
          sx={{
            color: theme.palette.primary.main,
            "&:hover": {
              scale: "1.09",
              bgcolor: "transparent",
            },
          }}
          onClick={handleMode}
        >
          {theme.palette.mode === "light" ? (
            <LightMode
              sx={{ fontSize: { xs: "22px", sm: "26px", md: "30px" } }}
            />
          ) : (
            <DarkMode
              sx={{ fontSize: { xs: "22px", sm: "26px", md: "30px" } }}
            />
          )}
        </IconButton>
        <Tooltip title="Github" placement="top">
          <IconButton
            aria-label="github account"
            sx={{
              color: theme.palette.primary.main,
              "&:hover": {
                scale: "1.09",
                bgcolor: "transparent",
              },
            }}
          >
            <GitHub sx={{ fontSize: { xs: "22px", sm: "26px", md: "30px" } }} />
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
};

Header.propTypes = {
  mode: PropTypes.string.isRequired,
  setMode: PropTypes.func.isRequired,
};

export default Header;

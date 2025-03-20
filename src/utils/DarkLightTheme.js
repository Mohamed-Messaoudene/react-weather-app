import { grey, indigo } from "@mui/material/colors";

const getDesignTokens = (mode) => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
          // palette values for light mode
          primary: { 
            main: indigo[600],
            text:grey[600],
            },
            background: {
              paper:"rgba(255, 255, 255,0.7 )",
            },
           
        }
      : {
          // palette values for dark mode
          primary: { 
            main: indigo[200],
            text:grey[300],
           },
          
           background: {
            paper:"rgba(0, 0, 0,0.8 )",
          },
        }),
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 500,
      md: 970,
      lg: 1280,
      xl: 1920,
    },
  },
});

export default getDesignTokens;

const API_KEY = import.meta.env.VITE_OPENCAGEDATA_API_KEY;

export const getCityFromLocation = (setCityInput, setErrorMessage,inputRef) => {
  if (!navigator.geolocation) {
    setErrorMessage("Geolocation is not supported by this browser.");
    return;
  }

  navigator.geolocation.getCurrentPosition(
    async (position) => {
      const { latitude, longitude } = position.coords;

      try {
        const response = await fetch(
          `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${API_KEY}`
        );
        const data = await response.json();

        const city =
          data?.results?.[0]?.components?.city ||
          data?.results?.[0]?.components?.town ||
          data?.results?.[0]?.components?.village ||
          "";

        if (city) {
          setCityInput(city);
          if (inputRef.current) {
            inputRef.current.value = city; // ✅ Displays in input field
          }
        } else {
          setErrorMessage("City not found for your location.");
        }
      } catch (error) {
        setErrorMessage("Failed to fetch city name.");
      }
    },
    (err) => {
      setErrorMessage(`Failed to retrieve location: ${err.message}`);
    }
  );
};

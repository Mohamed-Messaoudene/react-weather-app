import { useState, useEffect } from 'react';
import useSWR from 'swr';
import useWeatherContext from './useWeatherContext';


const fetcher = (url) => fetch(url).then((res) => res.json());
const API_KEY="b8c81fd926f349569be1802486e50457";
function useCityName(isClicked) {
  const [location, setLocation] = useState({ lat: null, lon: null });
  const [error, setError] = useState(null);
  const {setCityInput}=useWeatherContext();

  const { data: cityData, error: fetchError } = useSWR(
    location.lat && location.lon&&isClicked
      ? `https://api.opencagedata.com/geocode/v1/json?q=${location.lat}+${location.lon}&key=${API_KEY}`
      : null,
    fetcher
  );

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
        },
        (err) => {
          setError('Failed to retrieve location.');
        }
      );
    } else {
      setError('Geolocation is not supported by this browser.');
    }
  }, []);

  const cityName =
    cityData?.results?.[0]?.components.city ||
    cityData?.results?.[0]?.components.town ||
    cityData?.results?.[0]?.components.village;

  

  return {
    cityName:cityName,
    error:error||fetchError
  };
}

export default useCityName;

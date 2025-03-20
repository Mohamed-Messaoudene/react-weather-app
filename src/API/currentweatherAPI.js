import useSWR from "swr";
const APIKey = import.meta.env.VITE_OPENWEATHERMAP_API_KEY;

const fetcher = async (url) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }
  return response.json();
};

export default function useCityWeather(cityName,setErrorMessage) {
  const shouldFetch = cityName && cityName.trim() !== "";
  const { data, error, isLoading } = useSWR(
    shouldFetch
      ? `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${APIKey}`
      : null,
    fetcher
  );
  let mydata = null;
  if (data && data.weather&&!error) {
    mydata = {
      city: data.name,
      state: data.weather[0].description,
      icon: data.weather[0].id,
      windSpeed: data.wind.speed,
      temp: Math.round(data.main.temp),
      feelsLike: Math.round(data.main.feels_like),
      humidity: data.main.humidity,
      pressure: data.main.pressure,
    };
  }
  if(error){
    setErrorMessage(`failed when fetching ${cityName} 's  weather infos !!!`);
  }
  return {
    weatherState: mydata,
    isLoading: isLoading,
  };
}

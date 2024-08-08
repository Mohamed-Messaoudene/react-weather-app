import useSWR from "swr";
const APIKey = "75fd8c3916aa3521e7ce975571d9b7eb";

// const fetcher = async (...args) => {
//   const res = await fetch(...args);
//   const data = await res.json();
//   return data;
// };
// const fetcher = (url) => fetch(url).then(res => res.json());

const fetcher = async (url) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }
  return response.json();
};

export default function useCityWeather(cityName) {
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
  return {
    weatherState: mydata,
    isLoading: isLoading,
    error,
  };
}

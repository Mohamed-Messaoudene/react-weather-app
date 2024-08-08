import useSWR from "swr";
const APIKey = "75fd8c3916aa3521e7ce975571d9b7eb";

// const fetcher = async (...args) => {
//   const res = await fetch(...args);
//   const data = await res.json();
//   return data;
// };
const fetcher = async (url) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }
  return response.json();
};

export default function useCityWeekWeather(cityName) {
  const shouldFetch = cityName && cityName.trim() !== "";

  const { data, error, isLoading } = useSWR(
    shouldFetch
      ? `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=metric&appid=${APIKey}`
      : null,
    fetcher
  );
  let mydata = [];
  if (data && data.list&& !error) {
    let fivedayForecast = splitArrayIntoChunks(data.list, 8);
    mydata = fivedayForecast.map((dayForecast) => {
      let result = getFinalResult(dayForecast);
      return result;
    });
  }

  return {
    weekWeather: [...mydata],
    isLoading: isLoading,
    error,
  };
}

// function to get the day name from date returned from the api
function getDayName(dateString) {
  const date = new Date(dateString);
  if (isNaN(date)) {
    return "Invalid date";
  }
  const options = { weekday: "long" };
  const dayName = new Intl.DateTimeFormat("en-US", options).format(date);
  return dayName;
}

//function that returns an array of 5 elements (objects) from an array of 40 elemnt
function splitArrayIntoChunks(array, chunkSize) {
  if (array.length !== 40) {
    throw new Error("Input array must have exactly 40 elements");
  }

  const result = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    result.push(array.slice(i, i + chunkSize));
  }
  return result;
}
//function that returns an object {min-temp,max_temp,description,icon_code,dayName,id}
function getFinalResult(mydayarray) {
  let myresult = {
    id: mydayarray[3].dt,
    description: mydayarray[3].weather[0].description,
    max_temp: mydayarray[3].main.temp_max,
    min_temp: mydayarray[3].main.temp_min,
    dayName: getDayName(mydayarray[3].dt_txt),
    icon_code: mydayarray[3].weather[0].id,
  };

  mydayarray.forEach((element) => {
    myresult.max_temp = Math.round(Math.max(element.main.temp_max, myresult.max_temp));
    myresult.min_temp = Math.round(Math.min(element.main.temp_min, myresult.min_temp));
  });
  return myresult;
}

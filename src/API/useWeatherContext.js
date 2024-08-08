// useWeatherContext.js
import { useContext } from 'react';
import  WeatherContext from './createContext';

const useWeatherContext = () => useContext(WeatherContext);

export default useWeatherContext;

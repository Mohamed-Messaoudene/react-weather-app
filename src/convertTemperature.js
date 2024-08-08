// Celsius to Fahrenheit and vice versa
export  const convertTemperature = (unit, temp) => {
    if (unit === "celicuis") return Math.round(((temp - 32) * 5) / 9);
    return Math.round((temp * 9) / 5 + 32);
  };
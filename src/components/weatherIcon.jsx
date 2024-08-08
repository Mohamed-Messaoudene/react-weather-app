import { ReactSVG } from "react-svg";

const WeatherIcon = ({code,size}) => {
  let Icon_url = "";
  switch (code) {
    // Clear
    case 800:
      Icon_url = "/weather icons/sunny.svg";
      break;

    // Cloud
    case 801:
    case 802:
      Icon_url = "/weather icons/partly-cloudy.svg";
      break;
    case 803:
    case 804:
      Icon_url = "/weather icons/cloudy.svg";
      break;

    // Rain
    case 500:
    case 501:
    case 520:
    case 521:
    case 511:
      Icon_url = "/weather icons/rain.svg";
      break;
    case 502:
    case 503:
    case 504:
    case 522:
    case 531:
      Icon_url = "/weather icons/heavy-rain.svg";
      break;

    // Drizzle
    case 300:
    case 301:
    case 302:
    case 310:
    case 311:
    case 312:
    case 313:
    case 314:
    case 321:
      Icon_url = "/weather icons/rain.svg";
      break;

    // Thunderstorm
    case 200:
    case 201:
    case 202:
    case 210:
    case 211:
    case 212:
    case 221:
    case 230:
    case 231:
    case 232:
      Icon_url = "/weather icons/thunderstorm.svg";
      break;

    // Snow
    case 600:
    case 601:
    case 602:
    case 612:
    case 613:
    case 615:
    case 616:
    case 620:
    case 621:
    case 622:
      Icon_url = "/weather icons/snow.svg";
      break;
    case 611:
      Icon_url = "/weather icons/sleet.svg";
      break;

    // Atmosphere
    case 701:
    case 711:
    case 721:
    case 731:
    case 741:
    case 751:
    case 761:
    case 762:
    case 771:
    case 781:
      Icon_url = "/weather icons/haze.svg";
      break;

    default:
      Icon_url = "/weather icons/sunny.svg";
  }
  return (
    <ReactSVG
    
      src={Icon_url}
      beforeInjection={(svg) => {
        svg.setAttribute("style", `width: ${size}; height: ${size};`); // Inline styles
      }}
    />
  );
};

export default WeatherIcon;

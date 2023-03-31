import React, {useEffect, useState} from 'react';
import './App.css';
import SearchBar from './components/searchBar/SearchBar';
import TabBarMenu from './components/tabBarMenu/TabBarMenu';
import MetricSlider from './components/metricSlider/MetricSlider';
import ForecastTab from "./pages/forecastTab/ForecastTab";
import axios from "axios";


const apiKey = 'ff4555c60e405f349cedced447645de2';

    function App() {

      const [weatherData, setWeatherData] = useState({});
      const [location, setLocation] = useState('');
      const [error, toggleError] =useState(false);

        useEffect(()=> {
            async function fetchData() {
               //start met schone lei
                toggleError(false);
                try {
                    const result = await
                        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${location},nl&appid=${apiKey}&lang=nl`);
                    console.log(result.data);
                    setWeatherData(result.data);
                } catch (e) {
                    console.error(e);
                    toggleError(true);
                }
            }
            if (location) {
                fetchData();
            }
        }, [location]);



  return (
    <>
      <div className="weather-container">

        {/*HEADER -------------------- */}
        <div className="weather-header">
          <SearchBar setLocationHandler={setLocation} />
            {error &&
             <span className="wrong-location-error">
               Oeps! Deze locatie bestaat niet
              </span>
            }
          <span className="location-details">
             {Object.keys(weatherData).length > 0 &&
                 <>
                   <h2>{weatherData.weather[0].description}</h2>
                   <h3>{weatherData.name}</h3>
                   <h1>{(Math.round(weatherData.main.temp)-273) }&deg; </h1>
                 </>
             }
       </span>
        </div>

        {/*CONTENT ------------------ */}
        <div className="weather-content">
          <TabBarMenu/>

          <div className="tab-wrapper">
              <ForecastTab coordinates={weatherData.coord}
              />
          </div>
        </div>

        <MetricSlider/>
      </div>
    </>
  );
}

export default App;

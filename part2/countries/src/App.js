/*
==================================================
Exercises 2.18.-2.20.
exercise: 2.18* Data for countries, step1
exercise: 2.19*: Data for countries, step2
exercise: 2.20*: Data for countries, step3
==================================================
*/
import { useState, useEffect } from "react";
import axios from "axios";
import Countries from "./components/Countries";

const App = () => {
  const [value, setValue] = useState("");
  const [countriesData, setCountriesData] = useState([]);
  const [countryNames, setCountryNames] = useState(null);

  useEffect(() => {
    if (countryNames === null) {
      console.log("fetching data...");

      axios
        .get("https://restcountries.com/v3.1/all")
        .then((response) => setCountryNames(response.data));
    } else if (countryNames) {
      const filteredNames = countryNames.filter((c) =>
        c.name.common.toLocaleLowerCase().includes(value.toLocaleLowerCase())
      );
      if (filteredNames.length === 1) {
        const lat = filteredNames[0].capitalInfo.latlng[0];
        const lon = filteredNames[0].capitalInfo.latlng[1];
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_API_KEY}`;

        axios.get(url).then((response) => {
          filteredNames[0].weather = response.data;
          setCountriesData(filteredNames);
        });
      }
    }
  }, [value, countryNames]);

  const handleChange = (event) => {
    setValue(event.target.value);
  };
  const onClickHandler = (countryName) => {
    setValue(countryName);
  };
  return (
    <div>
      <form>
        Find Countries: <input value={value} onChange={handleChange} />
      </form>
      <Countries countryNames={countriesData} onClickHandler={onClickHandler} />
    </div>
  );
};

export default App;

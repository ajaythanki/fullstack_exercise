import Languages from "./Languages";
import Weather from "./Weather";

const Country = ({ country }) => {
  return (
    <div>
      <h2>{country.name.common}</h2>
      <div>
        <p>
          Capital: <span>{country.capital[0]}</span>
        </p>
        <p>Area: {country.area}</p>
      </div>
      <Languages languages={country.languages} />
      <img src={country.flags.png} alt={country.flags.alt} />
      <Weather weather={country.weather} />
    </div>
  );
};

export default Country;

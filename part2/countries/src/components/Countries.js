import Country from "./Country";

const Countries = ({ countryNames, onClickHandler }) => {
  const len = countryNames.length;
  return len > 10 ? (
    <pre>To many matches, specify another filter</pre>
  ) : len === 1 ? (
    <Country country={countryNames[0]} />
  ) : (
    <div>
      {countryNames.map((country, index) => (
        <pre key={index}>
          {country.name.common}
          <button onClick={() => onClickHandler(country.name.common)}>
            Show
          </button>
        </pre>
      ))}
    </div>
  );
};

export default Countries;

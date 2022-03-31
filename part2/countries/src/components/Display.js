import Country from "./Country";
import ShowCountry from "./ShowCountry";

const Display = ({ showCountries }) => {
  if (showCountries.length > 10)
    return <p>Too many matches, specify another filter</p>;

  if (showCountries.length === 1) {
    return <ShowCountry country={showCountries[0]} />;
  }

  if (showCountries.length <= 10)
    return (
      <div>
        {showCountries.map((countryObj) => (
          <Country key={countryObj.name} countryObj={countryObj} />
        ))}
      </div>
    );
};

export default Display;

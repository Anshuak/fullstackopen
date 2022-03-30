import React, { useState, useEffect } from "react";
import axios from "axios";

const Search = ({ handleChange, search }) => (
  <div>
    find countries <input onChange={handleChange} value={search} />
  </div>
);

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

const Country = ({ countryObj }) => {
  const [showDetails, setShowDetails] = useState(false);
  const handleShow = () => {
    setShowDetails(!showDetails);
  };
  return (
    <div>
      <span>{countryObj.name}</span>
      <button onClick={handleShow}>show</button>
      {showDetails && <ShowCountry country={countryObj} />}
    </div>
  );
};

const ShowCountry = ({ country }) => {
  let name = country.name;
  let capital = country.capital ? country.capital : "No Capital";
  let area = country.area;
  let languages = country.languages;
  let flag = country.flag;
  return (
    <div>
      <h1>{name}</h1>
      <div>
        <p>capital {capital}</p>
        <p>area {area}</p>
      </div>
      <h2>languages:</h2>
      <ul>
        {languages.map(({ name }) => (
          <li key={name}>{name}</li>
        ))}
      </ul>
      <img src={flag} alt="country flag" width={200} height={200} />
    </div>
  );
};

const App = () => {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios.get("https://restcountries.com/v2/all").then((response) => {
      setCountries(response.data);
    });
  }, []);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const showCountries =
    search === ""
      ? countries
      : countries.filter(({ name }) =>
          name.toLowerCase().includes(search.toLowerCase())
        );

  return (
    <div>
      <Search handleChange={handleChange} search={search} />
      <Display showCountries={showCountries} />
    </div>
  );
};

export default App;

import React from "react";
import Weather from "./Weather";

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
      <Weather city={capital} />
    </div>
  );
};

export default ShowCountry;

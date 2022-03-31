import React, { useState, useEffect } from "react";
import axios from "axios";
import Search from "./components/Search";
import Display from "./components/Display";

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

import React,{useState} from "react";
import ShowCountry from "./ShowCountry";

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

export default Country;

import React, { useState } from "react";
import LocationContext from "./LocationContext";

const LocationProvider = ({ children }) => {
  const [city, setCity] = useState("Lucknow");
  const [pincode, setPincode] = useState("");

  return (
    <LocationContext.Provider value={{ city, setCity, pincode, setPincode }}>
      {children}
    </LocationContext.Provider>
  );
};

export default LocationProvider;

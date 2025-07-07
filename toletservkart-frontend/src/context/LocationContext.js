import { createContext, useState } from "react";

const LocationContext = createContext({
  city: "Lucknow",
  pincode: "",
  setCity: () => {},
  setPincode: () => {},
});

export const LocationProvider = ({ children }) => {
  const [city, setCity] = useState("Lucknow");
  const [pincode, setPincode] = useState("");

  return (
    <LocationContext.Provider value={{ city, setCity, pincode, setPincode }}>
      {children}
    </LocationContext.Provider>
  );
};

export default LocationContext;

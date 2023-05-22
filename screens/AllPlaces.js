import { useEffect, useState } from "react";
import PlacesList from "../components/Places/PlacesList";

const AllPlaces = ({ route }) => {
  const [places, setPlaces] = useState([]);
  const savedPlace = route.params?.place;

  useEffect(() => {
    if (savedPlace) {
      setPlaces((prevState) => [...prevState, savedPlace]);
    }
  }, [savedPlace]);

  return <PlacesList places={places} />;
};

export default AllPlaces;

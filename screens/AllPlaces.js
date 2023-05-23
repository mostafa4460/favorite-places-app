import { useEffect, useState } from "react";
import PlacesList from "../components/Places/PlacesList";
import { fetchPlaces } from "../utils/database";
import { useIsFocused } from "@react-navigation/native";

const AllPlaces = () => {
  const [places, setPlaces] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    const fetchAllPlaces = async () => {
      const allPlaces = await fetchPlaces();
      setPlaces(allPlaces);
    };
    if (isFocused) {
      fetchAllPlaces();
    }
  }, [isFocused]);

  return <PlacesList places={places} />;
};

export default AllPlaces;

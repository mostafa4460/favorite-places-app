import PlaceForm from "../components/Places/PlaceForm";
import { insertPlace } from "../utils/database";

const AddPlace = ({ navigation }) => {
  const addPlaceHandler = async (place) => {
    await insertPlace(place);
    navigation.navigate("AllPlaces", { place });
  };

  return <PlaceForm onAddPlace={addPlaceHandler} />;
}

export default AddPlace;
import PlaceForm from "../components/Places/PlaceForm";

const AddPlace = ({ navigation }) => {
  const addPlaceHandler = (place) => {
    navigation.navigate("AllPlaces", { place });
  };

  return <PlaceForm onAddPlace={addPlaceHandler} />;
}

export default AddPlace;
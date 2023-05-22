import { useCallback, useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput } from "react-native";
import { COLORS } from "../../constants/colors";
import ImagePicker from "./ImagePicker";
import LocationPicker from "./LocationPicker";
import Button from "../UI/Button";

const PlaceForm = () => {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState();
  const [image, setImage] = useState();

  const selectImageHandler = (imageUri) => setImage(imageUri);

  const selectLocationHandler = useCallback(
    (locationObj) => setLocation(locationObj),
    []
  );

  const savePlaceHandler = () => {
    console.log("TITLE => " + title);
    console.log("LOCATION => " + location);
    console.log("IMAGE => " + image);
  };

  return (
    <ScrollView style={styles.form}>
      <Text style={styles.label}>Title</Text>
      <TextInput
        style={styles.input}
        onChangeText={(value) => setTitle(value)}
        value={title}
      />
      <ImagePicker onChangeImage={selectImageHandler} />
      <LocationPicker onChangeLocation={selectLocationHandler} />
      <Button onPress={savePlaceHandler}>Add Place</Button>
    </ScrollView>
  );
};

export default PlaceForm;

const styles = StyleSheet.create({
  form: {
    flex: 1,
    padding: 24,
  },
  label: {
    fontWeight: "bold",
    marginBottom: 4,
    color: COLORS.primary500,
  },
  input: {
    marginVertical: 8,
    paddingHorizontal: 4,
    paddingVertical: 8,
    fontSize: 16,
    borderBottomColor: COLORS.primary700,
    borderBottomWidth: 2,
    backgroundColor: COLORS.primary100,
  },
});

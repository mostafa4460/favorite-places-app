import { useCallback, useLayoutEffect, useState } from "react";
import { Alert, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import IconButton from "../components/UI/IconButton";

const Map = ({ navigation }) => {
  const [location, setLocation] = useState();

  const region = {
    latitude: 37.78,
    longitude: -122.43,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const selectLocationHandler = (event) => {
    const latitude = event.nativeEvent.coordinate.latitude;
    const longitude = event.nativeEvent.coordinate.longitude;
    setLocation({ latitude, longitude });
  };

  const saveLocationHandler = useCallback(() => {
    if (location) {
      navigation.navigate("AddPlace", { location });
    } else {
      Alert.alert(
        "No location available",
        "You have to pick a location by tapping on the map."
      );
    }
  }, [navigation, location]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: ({ tintColor }) => (
        <IconButton
          icon="save"
          size={24}
          color={tintColor}
          onPress={saveLocationHandler}
        />
      ),
    });
  }, [navigation, saveLocationHandler]);

  return (
    <MapView
      style={styles.map}
      initialRegion={region}
      onPress={selectLocationHandler}
    >
      {location && <Marker coordinate={location} title="Picked Location" />}
    </MapView>
  );
};

export default Map;

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});

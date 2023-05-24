import { Image, ScrollView, Text, View, StyleSheet } from "react-native";
import OutlinedButton from "../components/UI/OutlinedButton";
import { COLORS } from "../constants/colors";
import { useEffect, useState } from "react";
import { fetchPlaceDetails } from "../utils/database";

const PlaceDetails = ({ navigation, route }) => {
  const [place, setPlace] = useState();
  const selectedPlace = route.params.placeId;

  const showOnMapHandler = () =>
    navigation.navigate("Map", {
      initialLat: place.location.lat,
      initialLng: place.location.lng,
    });

  useEffect(() => {
    const fetchPlace = async () => {
      const fetchedPlace = await fetchPlaceDetails(selectedPlace);
      setPlace(fetchedPlace);
      navigation.setOptions({ title: fetchedPlace.title });
    };
    fetchPlace();
  }, [selectedPlace]);

  if (!place) {
    return (
      <View style={styles.fallback}>
        <Text>Loading place data...</Text>
      </View>
    );
  }

  return (
    <ScrollView>
      <Image style={styles.image} source={{ uri: place.imageUri }} />

      <View style={styles.locationContainer}>
        <View style={styles.addressContainer}>
          <Text style={styles.address}>{place.address}</Text>
        </View>
        <OutlinedButton icon="map" onPress={showOnMapHandler}>
          View on Map
        </OutlinedButton>
      </View>
    </ScrollView>
  );
};

export default PlaceDetails;

const styles = StyleSheet.create({
  fallback: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    height: "35%",
    minHeight: 300,
    width: "100%",
  },
  locationContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  addressContainer: {
    padding: 16,
  },
  address: {
    color: COLORS.primary500,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
});

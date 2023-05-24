import { FlatList, StyleSheet, Text, View } from "react-native";
import PlaceItem from "./PlaceItem";
import { COLORS } from "../../constants/colors";
import { useNavigation } from "@react-navigation/native";

const FallbackText = () => (
  <View style={styles.fallbackContainer}>
    <Text style={styles.fallbackText}>
      No places added yet - start by adding some :)
    </Text>
  </View>
);

const PlacesList = ({ places }) => {
  const navigation = useNavigation();

  const selectPlaceHandler = (placeId) =>
    navigation.navigate("PlaceDetails", { placeId });

  if (!places || places.length === 0) {
    return <FallbackText />;
  }

  return (
    <FlatList
      style={styles.list}
      data={places}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <PlaceItem place={item} onSelect={() => selectPlaceHandler(item.id)} />
      )}
    />
  );
};

export default PlacesList;

const styles = StyleSheet.create({
  list: {
    margin: 24,
  },
  fallbackContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  fallbackText: {
    fontSize: 16,
    color: COLORS.primary200,
  },
});

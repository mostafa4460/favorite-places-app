import { Alert, Image, StyleSheet, Text, View } from "react-native";
import OutlinedButton from "../UI/OutlinedButton";
import { COLORS } from "../../constants/colors";
import {
  getCurrentPositionAsync,
  useForegroundPermissions,
  PermissionStatus,
} from "expo-location";
import { getMapPreview } from "../../utils/location";
import { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";

const LocationPicker = ({ onChangeLocation }) => {
  const [location, setLocation] = useState();
  const [locationPermission, requestPermission] = useForegroundPermissions();
  const navigation = useNavigation();
  const route = useRoute();
  const savedLocation = route.params?.location;

  const verifyPermissions = async () => {
    let permission = true;
    if (locationPermission.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission();
      permission = permissionResponse.granted;
    } else if (locationPermission.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Insufficient Permission",
        "You need to grant gps access to use this app"
      );
      permission = false;
    }
    return permission;
  };

  const getLocationHandler = async () => {
    const hasPermission = await verifyPermissions();
    if (hasPermission) {
      const locationResp = await getCurrentPositionAsync();
      setLocation({
        lat: locationResp.coords.latitude,
        lng: locationResp.coords.longitude,
      });
    }
  };

  const pickOnMapHandler = () => navigation.navigate("Map");

  let locationPreview = <Text>No location available</Text>;
  if (location) {
    locationPreview = (
      <Image
        style={styles.image}
        source={{ uri: getMapPreview(location.lat, location.lng) }}
      />
    );
  }

  useEffect(() => {
    if (savedLocation) {
      setLocation({
        lat: savedLocation.latitude,
        lng: savedLocation.longitude,
      });
    }
  }, [savedLocation]);

  useEffect(() => {
    if (location) {
      onChangeLocation(location);
    }
  }, [location, onChangeLocation]);

  return (
    <>
      <View style={styles.mapPreview}>{locationPreview}</View>

      <View style={styles.actions}>
        <OutlinedButton icon="location" onPress={getLocationHandler}>
          Locate Me
        </OutlinedButton>
        <OutlinedButton icon="map" onPress={pickOnMapHandler}>
          Pick on Map
        </OutlinedButton>
      </View>
    </>
  );
};

export default LocationPicker;

const styles = StyleSheet.create({
  mapPreview: {
    width: "100%",
    height: 200,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.primary100,
    borderRadius: 4,
    overflow: "hidden",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
  },
});

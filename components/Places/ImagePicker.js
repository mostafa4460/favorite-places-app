import { Alert, Image, StyleSheet, Text, View } from "react-native";
import {
  launchCameraAsync,
  useCameraPermissions,
  PermissionStatus,
} from "expo-image-picker";
import { useState } from "react";
import { COLORS } from "../../constants/colors";
import OutlinedButton from "../UI/OutlinedButton";

const ImagePicker = ({ onChangeImage }) => {
  const [imageUri, setImageUri] = useState();
  const [cameraPermission, requestPermission] = useCameraPermissions();

  const verifyPermissions = async () => {
    let permission = true;
    if (cameraPermission.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission();
      permission = permissionResponse.granted;
    } else if (cameraPermission.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Insufficient Permission",
        "You need to grant camera access to use this app"
      );
      permission = false;
    }
    return permission;
  };

  const takeImageHandler = async () => {
    const hasPermission = await verifyPermissions();
    if (hasPermission) {
      const image = await launchCameraAsync({
        allowsEditing: true,
        aspect: [16, 9],
        quality: 0.5,
      });
      setImageUri(image.assets[0].uri);
      onChangeImage(image.assets[0].uri);
    }
  };

  let imagePreview = <Text>No image available</Text>;

  if (imageUri) {
    imagePreview = <Image style={styles.image} source={{ uri: imageUri }} />;
  }

  return (
    <View>
      <View style={styles.imagePreview}>{imagePreview}</View>
      <OutlinedButton onPress={takeImageHandler} icon="camera">Take Image</OutlinedButton>
    </View>
  );
};

export default ImagePicker;

const styles = StyleSheet.create({
  imagePreview: {
    width: "100%",
    height: 200,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.primary100,
    borderRadius: 4,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
});

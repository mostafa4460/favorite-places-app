import axios from "axios";

const GOOGLE_MAP_API_KEY = process.env.GOOGLE_MAP_API_KEY;

export const getMapPreview = (lat, lng) => {
  const imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:S%7C${lat},${lng}&key=${GOOGLE_MAP_API_KEY}`;
  return imagePreviewUrl;
};

export const getAddress = async (lat, lng) => {
  try {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_MAP_API_KEY}`;
    const response = await axios.get(url);
    const address = response.data.results[0].formatted_address;
    return address;
  } catch (error) {
    throw new Error(error.error_message);
  }
};

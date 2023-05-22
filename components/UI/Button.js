import { Pressable, StyleSheet, Text } from "react-native";
import { COLORS } from "../../constants/colors";

const Button = ({ onPress, children }) => (
  <Pressable
    onPress={onPress}
    style={({ pressed }) => [styles.button, pressed && styles.pressed]}
  >
    <Text style={styles.text}>{children}</Text>
  </Pressable>
);

export default Button;

const styles = StyleSheet.create({
  button: {
    paddingVertical: 8,
    marginTop: 12,
    marginBottom: 42,
    backgroundColor: COLORS.primary800,
    elevation: 2,
    shadowColor: "black",
    shadowOpacity: 0.15,
    shadowOffset: { width: 1, height: 1 },
    shadowRadius: 2,
    borderRadius: 4,
  },
  pressed: {
    opacity: 0.7,
  },
  text: {
    textAlign: "center",
    fontSize: 16,
    color: COLORS.primary50,
  },
});

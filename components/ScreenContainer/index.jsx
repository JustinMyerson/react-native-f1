import react from "react";
import { View, StyleSheet } from "react-native";

const ScreenContainer = ({ children }) => {
  return <View style={styles.screenContainer}>{children}</View>;
};

const styles = StyleSheet.create({
  screenContainer: {
    padding: 30,
  },
});

export default ScreenContainer;

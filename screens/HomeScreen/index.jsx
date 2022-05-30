import react from "react";
import { View, Text, ImageBackground } from "react-native";
const HomeScreen = ({ navigation }) => {
  return (
    <View>
      <ImageBackground
        source={require("../../assets/home-background.jpg")}
        resizeMode="cover"
        style={{ height: "100%" }}
      ></ImageBackground>
    </View>
  );
};

export default HomeScreen;

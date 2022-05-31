import react from "react";
import { View, Text, ImageBackground, Image } from "react-native";
import { styles } from "./style";

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.homeScreen}>
      <ImageBackground
        source={require("../../assets/home-background.jpg")}
        resizeMode="cover"
        style={{ height: "100%" }}
      >
        <Image
          source={require("../../assets/F1-logo.png")}
          style={{ width: 450, height: 225, bottom: -550 }}
        />
      </ImageBackground>
    </View>
  );
};

export default HomeScreen;

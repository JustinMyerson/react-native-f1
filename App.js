import { NavigationContainer, TabActions } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet, Text, View, Button } from "react-native";
import CircuitsScreen from "./screens/CircuitsScreen";
import ConstructorsScreen from "./screens/ConstructorsScreen";
import DriversScreen from "./screens/DriversScreen";
import ResultsScreen from "./screens/ResultsScreen";

const Tab = createBottomTabNavigator();

const HomeScreen = ({ navigation }) => {
  return <View></View>;
};

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Circuits" component={CircuitsScreen} />
        <Tab.Screen name="Constructors" component={ConstructorsScreen} />
        <Tab.Screen name="Drivers" component={DriversScreen} />
        <Tab.Screen name="Results" component={ResultsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

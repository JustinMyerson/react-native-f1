import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet, Text, View, Button } from "react-native";
import CircuitsScreen from "./screens/CircuitsScreen";
import ConstructorsScreen from "./screens/ConstructorsScreen";
import DriversScreen from "./screens/DriversScreen";
import ResultsScreen from "./screens/ResultsScreen";

const Stack = createNativeStackNavigator();

const HomeScreen = ({ navigation }) => {
  return (
    <View>
      <Button
        title="Go to Circuits Screen"
        onPress={() => navigation.navigate("Circuits", { name: "Justin" })}
      />
      <Button
        title="Go to Constructors Screen"
        onPress={() => navigation.navigate("Constructors", { name: "Justin" })}
      />
      <Button
        title="Go to Drivers Screen"
        onPress={() => navigation.navigate("Drivers", { name: "Justin" })}
      />
      <Button
        title="Go to Results Screen"
        onPress={() => navigation.navigate("Results", { name: "Justin" })}
      />
    </View>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "F1 React Native" }}
        />
        <Stack.Screen name="Circuits" component={CircuitsScreen} />
        <Stack.Screen name="Constructors" component={ConstructorsScreen} />
        <Stack.Screen name="Drivers" component={DriversScreen} />
        <Stack.Screen name="Results" component={ResultsScreen} />
      </Stack.Navigator>
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

import { NavigationContainer, TabActions } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet, Text, View, Button, ImageBackground } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CircuitsScreen from "./screens/CircuitsScreen";
import ConstructorsScreen from "./screens/ConstructorsScreen";
import DriversScreen from "./screens/DriversScreen";
import DriverScreen from "./screens/DriverScreen";
import ResultsScreen from "./screens/ResultsScreen";
import HomeScreen from "./screens/HomeScreen";
import {
  Feather,
  AntDesign,
  Foundation,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function DriverNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Drivers" component={DriversScreen} />
      <Stack.Screen name="Driver" component={DriverScreen} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarLabel: "Home",
            tabBarIcon: ({ color, size }) => (
              <Feather name="home" size={24} color="#9e1111" />
            ),
          }}
        ></Tab.Screen>
        <Tab.Screen
          name="Circuits"
          component={CircuitsScreen}
          options={{
            tabBarLabel: "Circuits",
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="go-kart-track"
                size={24}
                color="#9e1111"
              />
            ),
          }}
        />
        <Tab.Screen
          name="Constructors"
          component={ConstructorsScreen}
          options={{
            tabBarLabel: "Constructors",
            tabBarIcon: ({ color, size }) => (
              <AntDesign name="team" size={24} color="#9e1111" />
            ),
          }}
        />
        <Tab.Screen
          name="DriverNavigator"
          component={DriverNavigator}
          options={{
            tabBarLabel: "Drivers",
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="racing-helmet"
                size={24}
                color="#9e1111"
              />
            ),
          }}
        />
        <Tab.Screen
          name="Results"
          component={ResultsScreen}
          options={{
            tabBarLabel: "Results",
            tabBarIcon: ({ color, size }) => (
              <Foundation name="results" size={24} color="#9e1111" />
            ),
          }}
        />
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

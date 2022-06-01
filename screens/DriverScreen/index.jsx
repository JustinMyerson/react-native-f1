import { ActivityIndicator, View, Text } from "react-native";
import { useEffect, useState } from "react";
import { styles } from "./style";
import { Ionicons } from "@expo/vector-icons";
import { Card } from "react-native-paper";

function DriverScreen(props, { navigation }) {
  const driverID = props.route.params.driverId;
  const driverURL = "https://ergast.com/api/f1/drivers/" + driverID + ".json";
  console.log(driverURL);

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [driver, setDriver] = useState("");

  useEffect(() => {
    setIsLoading(true);
    // Reset the error in case we had one last time we
    // did an api call
    setError(null);
    fetch(driverURL)
      .then((res) => res.json())
      .then(
        (result) => {
          setDriver(result.MRData.DriverTable.Drivers[0]);
          setIsLoading(false);
        },
        (error) => {
          setIsLoading(false);
          setError(error);
        }
      );
  }, []);

  if (isLoading) {
    return (
      <ActivityIndicator
        style={{ marginTop: 20 }}
        size="large"
        color="#9e1111"
      />
    );
  }

  if (error) {
    return (
      <View>
        <Text>Error: {error.message}</Text>
      </View>
    );
  }

  return (
    <View style={styles.driverView}>
      <Ionicons
        onPress={() => props.navigation.navigate("All Drivers")}
        name="return-up-back"
        size={44}
        color="#9e1111"
        style={{ paddingLeft: 15 }}
      />
      <Card style={styles.driverCard}>
        <Text style={styles.driverText}>
          {driver.givenName} {driver.familyName}
        </Text>
        <Text style={styles.driverText}>{driver.nationality}</Text>
        <Text style={styles.driverText}>{driver.dateOfBirth}</Text>
      </Card>
    </View>
  );
}

export default DriverScreen;

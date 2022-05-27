import react, { useState, useEffect } from "react";
import { render } from "react-dom";
import {
  SafeAreaView,
  ActivityIndicator,
  View,
  Text,
  FlatList,
} from "react-native";
import { styles } from "./style";

const DriversScreen = ({ navigation }) => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [drivers, setDrivers] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    // Reset the error in case we had one last time we
    // did an api call
    setError(null);
    fetch("http://ergast.com/api/f1/drivers.json")
      .then((res) => res.json())
      .then(
        (result) => {
          setDrivers(result.MRData.DriverTable.Drivers);
          setIsLoading(false);
        },
        (error) => {
          setIsLoading(false);
          setError(error);
        }
      );
  }, []);

  const Driver = ({ dateOfBirth, familyName, givenName, nationality }) => (
    <View>
      <Text style={styles.driver}>
        {givenName} {familyName} {dateOfBirth} {nationality}
      </Text>
    </View>
  );

  const renderItem = ({ item }) => {
    return (
      <Driver
        dateOfBirth={item.dateOfBirth}
        familyName={item.familyName}
        givenName={item.givenName}
        nationality={item.nationality}
      />
    );
  };

  if (isLoading) {
    return (
      <ActivityIndicator
        style={{ marginTop: 20 }}
        size="large"
        color="#039dfc"
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
    <SafeAreaView style={styles.driverList}>
      <FlatList
        data={drivers}
        renderItem={renderItem}
        keyExtractor={(driver) => driver.driverId}
      />
    </SafeAreaView>
  );
};

export default DriversScreen;

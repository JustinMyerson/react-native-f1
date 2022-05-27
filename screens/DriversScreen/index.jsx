import react, { useState, useEffect } from "react";
import { render } from "react-dom";
import {
  SafeAreaView,
  ActivityIndicator,
  View,
  Text,
  FlatList,
} from "react-native";

const DriversScreen = ({ navigation }) => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [drivers, setDrivers] = useState([]);

  useEffect(() => {
    fetch("http://ergast.com/api/f1/drivers.json")
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setDrivers(result.MRData.DriverTable.Drivers);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);

  if (error) {
    return (
      <View>
        <Text>Error: {error.message}</Text>
      </View>
    );
  } else if (!isLoaded) {
    return (
      <ActivityIndicator
        style={{ marginTop: 20 }}
        size="large"
        color="#039dfc"
      />
    );
  } else {
    console.log(drivers);
    const Driver = ({ dateOfBirth, familyName, givenName, nationality }) => (
      <View>
        <Text>
          {givenName} {familyName} {dateOfBirth} {nationality}
        </Text>
      </View>
    );

    const renderItem = ({ driver }) => (
      <Driver
        dateOfBirth={driver.dateOfBirth}
        familyName={driver.familyName}
        givenName={driver.givenName}
        nationality={driver.nationality}
      />
    );

    return (
      <SafeAreaView style={{ padding: 5 }}>
        <FlatList
          data={drivers}
          renderItem={renderItem}
          keyExtractor={(driver) => driver.driverId}
        />
      </SafeAreaView>
    );
  }
};

export default DriversScreen;

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
  }
  if (!isLoaded) {
    return (
      <ActivityIndicator
        style={{ marginTop: 20 }}
        size="large"
        color="#039dfc"
      />
    );
  }

  const Driver = ({ props }) => (
    <View>
      <Text>
        {driver.givenName} {driver.familyName} {driver.dateOfBirth}{" "}
        {driver.nationality}
      </Text>
    </View>
  );

  // const renderItem = ({ driver }) => {
  //   return (
  //     <Driver
  //       style={{ marginBottom: 10 }}
  //       dateOfBirth={driver.dateOfBirth}
  //       familyName={driver.familyName}
  //       givenName={driver.givenName}
  //       nationality={driver.nationality}
  //     />
  //   );
  // };

  const renderItem = (props) => {
    console.log(props);
  };

  return (
    <SafeAreaView style={{ padding: 5 }}>
      <FlatList
        data={drivers}
        renderItem={renderItem}
        keyExtractor={(driver) => driver.driverId}
      />
    </SafeAreaView>
  );
};

export default DriversScreen;

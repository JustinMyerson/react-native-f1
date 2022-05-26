import react, { useState, useEffect } from "react";
import { ActivityIndicator, View, Text } from "react-native";

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
    return <ActivityIndicator size="large" color="#00ff00" />;
  } else {
    console.log(drivers);
    return (
      <View>
        {drivers.map((driver) => (
          <Text>
            {driver.givenName} {driver.familyName}
          </Text>
        ))}
      </View>
    );
  }
};

export default DriversScreen;

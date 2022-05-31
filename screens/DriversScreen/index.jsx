import { useState, useEffect } from "react";
import {
  SafeAreaView,
  ActivityIndicator,
  View,
  Text,
  FlatList,
  Pressable,
} from "react-native";
import { styles } from "./style";
import { Ionicons } from "@expo/vector-icons";

const DriversScreen = ({ navigation }) => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [drivers, setDrivers] = useState([]);
  const [offset, setOffset] = useState(0);
  const [total, setTotal] = useState(60);

  function handleBackClicked() {
    let difference = offset - 30;
    difference < 0 ? setOffset(0) : setOffset(offset - 30);
  }

  function handleForwardClicked() {
    let difference = total - offset;
    difference >= 30 ? setOffset(offset + 30) : setOffset(offset + difference);
  }

  function navigateDriver(driverId) {
    navigation.navigate("Driver", { driverId });
  }

  useEffect(() => {
    setIsLoading(true);
    // Reset the error in case we had one last time we
    // did an api call
    setError(null);
    fetch("http://ergast.com/api/f1/drivers.json?offset=" + offset)
      .then((res) => res.json())
      .then(
        (result) => {
          setDrivers(result.MRData.DriverTable.Drivers);
          setTotal(result.MRData.total);
          setIsLoading(false);
        },
        (error) => {
          setIsLoading(false);
          setError(error);
        }
      );
  }, [offset]);

  const Driver = ({ dateOfBirth, familyName, givenName, nationality }) => (
    <View>
      <Text style={styles.driver}>
        {givenName} {familyName} {dateOfBirth} {nationality}
      </Text>
    </View>
  );

  const renderItem = ({ item }) => {
    return (
      <Pressable onPress={() => navigateDriver(item.driverId)}>
        <Driver
          dateOfBirth={item.dateOfBirth}
          familyName={item.familyName}
          givenName={item.givenName}
          nationality={item.nationality}
        />
      </Pressable>
    );
  };

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
    <SafeAreaView style={styles.driverList}>
      <FlatList
        data={drivers}
        renderItem={renderItem}
        keyExtractor={(driver) => driver.driverId}
      />
      <View style={styles.buttons}>
        <Ionicons
          onPress={() => handleBackClicked()}
          name="ios-chevron-back-circle-outline"
          size={44}
          color="#9e1111"
        />
        <Ionicons
          onPress={() => handleForwardClicked()}
          name="chevron-forward-circle-outline"
          size={44}
          color="#9e1111"
        />
      </View>
    </SafeAreaView>
  );
};

export default DriversScreen;

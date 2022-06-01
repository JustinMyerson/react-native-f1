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
import { Card } from "react-native-paper";
import SearchBar from "react-native-dynamic-search-bar";

const DriversScreen = ({ navigation }) => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [drivers, setDrivers] = useState([]);
  const [filteredDrivers, setFilteredDrivers] = useState([]);
  const [search, setSearch] = useState("");
  const [offset, setOffset] = useState(0);
  const [total, setTotal] = useState(60);

  let difference = total - offset;

  function handleBackClicked() {
    difference < 0 ? setOffset(0) : setOffset(offset - 30);
  }

  function handleForwardClicked() {
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
          setFilteredDrivers(result.MRData.DriverTable.Drivers);
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
      <Card style={styles.drivers}>
        <Text style={styles.driversText}>
          {familyName}, {givenName}
        </Text>
      </Card>
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

  const searchFilterFunction = (text) => {
    if (text) {
      const newData = drivers.filter(function (item) {
        const itemData = item.familyName ? item.familyName : "";
        const textData = text;
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDrivers(newData);
      setSearch(text);
    } else {
      setFilteredDrivers(drivers);
      setSearch(text);
    }
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
      <SearchBar
        style={styles.searchBar}
        placeholder="Driver Surname"
        onChangeText={(text) => searchFilterFunction(text)}
        onClear={() => searchFilterFunction("")}
        value={search}
      />
      <FlatList
        style={styles.driversCard}
        data={filteredDrivers}
        renderItem={renderItem}
        keyExtractor={(driver) => driver.driverId}
      />
      <View style={styles.buttons}>
        {offset >= 30 ? (
          <Ionicons
            onPress={() => handleBackClicked()}
            familyName="ios-chevron-back-circle-outline"
            size={44}
            color="#9e1111"
          />
        ) : null}
        {difference >= 30 ? (
          <Ionicons
            onPress={() => handleForwardClicked()}
            familyName="chevron-forward-circle-outline"
            size={44}
            color="#9e1111"
          />
        ) : null}
      </View>
    </SafeAreaView>
  );
};

export default DriversScreen;

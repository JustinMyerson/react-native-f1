import react, { useState, useEffect } from "react";
import {
  SafeAreaView,
  ActivityIndicator,
  View,
  Text,
  FlatList,
  Linking,
} from "react-native";
import { Card } from "react-native-paper";
import { styles } from "./style";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import SearchBar from "react-native-dynamic-search-bar";

const CircuitsScreen = ({ navigation }) => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [offset, setOffset] = useState(0);
  const [total, setTotal] = useState(30);
  const [search, setSearch] = useState("");
  const [filteredCircuits, setFilteredCircuits] = useState([]);
  const [circuits, setCircuits] = useState([]);

  let difference = total - offset;

  function handleBackClicked() {
    difference < 0 ? setOffset(0) : setOffset(offset - 30);
  }

  function handleForwardClicked() {
    difference >= 30 ? setOffset(offset + 30) : setOffset(offset + difference);
  }

  const countryData = require("country-data");
  const { getCode, getName } = require("country-list");

  useEffect(() => {
    setIsLoading(true);
    // Reset the error in case we had one last time we
    // did an api call
    setError(null);
    fetch("http://ergast.com/api/f1/circuits.json?offset=" + offset)
      .then((res) => res.json())
      .then(
        (result) => {
          setCircuits(result.MRData.CircuitTable.Circuits);
          setFilteredCircuits(result.MRData.CircuitTable.Circuits);
          setTotal(result.MRData.total);
          setIsLoading(false);
        },
        (error) => {
          setIsLoading(false);
          setError(error);
        }
      );
  }, [offset]);

  const Circuit = ({ circuitName, Location, flag, city, url }) => (
    <View>
      <Card style={styles.circuit}>
        <Text style={styles.circuitText}>
          {circuitName} {flag}
        </Text>
        <View style={styles.bottomView}>
          <MaterialCommunityIcons
            name="search-web"
            size={30}
            color="black"
            onPress={() => Linking.openURL(url)}
          />
          <Text style={styles.circuitTextBottom}>
            {" "}
            {city}, {Location}{" "}
          </Text>
        </View>
      </Card>
    </View>
  );

  const renderItem = ({ item }) => {
    return (
      <Circuit
        circuitName={item.circuitName}
        Location={
          item.Location.country === "USA" ? "US" : item.Location.country
        }
        city={item.Location.locality}
        flag={
          typeof getCode(item.Location.country) !== "undefined"
            ? countryData.countries[getCode(item.Location.country)].emoji
            : ""
        }
        url={item.url}
      />
    );
  };

  const searchFilterFunction = (text) => {
    if (text) {
      const newData = circuits.filter(function (item) {
        const itemData = item.circuitName ? item.circuitName : "";
        const textData = text;
        return itemData.indexOf(textData) > -1;
      });
      setFilteredCircuits(newData);
      setSearch(text);
    } else {
      setFilteredCircuits(circuits);
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
    <SafeAreaView style={styles.circuitList}>
      <SearchBar
        style={styles.searchBar}
        adam
        placeholder="Track Name"
        onChangeText={(text) => searchFilterFunction(text)}
        onClear={(text) => searchFilterFunction("")}
        value={search}
      />
      <FlatList
        style={styles.circuitCard}
        data={filteredCircuits}
        renderItem={renderItem}
        keyExtractor={(circuit) => circuit.circuitId}
      />
      <View style={styles.buttons}>
        {offset >= 30 ? (
          <Ionicons
            onPress={() => handleBackClicked()}
            name="ios-chevron-back-circle-outline"
            size={44}
            color="#9e1111"
          />
        ) : null}

        {difference >= 30 ? (
          <Ionicons
            onPress={() => handleForwardClicked()}
            name="chevron-forward-circle-outline"
            size={44}
            color="#9e1111"
          />
        ) : null}
      </View>
    </SafeAreaView>
  );
};

export default CircuitsScreen;

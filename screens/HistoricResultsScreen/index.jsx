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
import { Ionicons } from "@expo/vector-icons";
import { Card } from "react-native-paper";
import SearchBar from "react-native-dynamic-search-bar";

const HistoricResults = ({ navigation }) => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [historicResultsArray, setHistoricResultsArray] = useState([]);

  const [filteredResults, setFilteredResults] = useState([]);
  const [search, setSearch] = useState("");
  const [offset, setOffset] = useState(0);

  const [total, setTotal] = useState(30);

  let difference = total - offset;

  function handleBackClicked() {
    difference < 0 ? setOffset(0) : setOffset(offset - 30);
  }

  function handleForwardClicked() {
    difference >= 30 ? setOffset(offset + 30) : setOffset(offset + difference);
  }

  function navigateResults(resultId) {
    navigation.navigate("Results", { resultId });
  }

  useEffect(() => {
    setIsLoading(true);
    // Reset the error in case we had one last time we
    // did an api call
    setError(null);
    fetch(`https://ergast.com/api/f1/results.json?offset=${offset}&limit=300`)
      .then((res) => res.json())
      .then(
        (result) => {
          setHistoricResultsArray(result.MRData.RaceTable.Races);
          setTotal(result.MRData.total);
          setIsLoading(false);
        },
        (error) => {
          setIsLoading(false);
          setError(error);
        }
      );
  }, [offset]);

  // console.log(historicResultsArray[0].season, "season");
  // // Access first circuit in race
  // console.log(historicResultsArray[0].Circuit, "array");
  // // Access first result in the first race
  // console.log(historicResultsArray[0].Results[0], "result");

  const HistoricResult = ({ raceName, circuitName, year, country }) => (
    <View>
      <Card style={styles.results}>
        <Text style={styles.resultText}>
          {raceName} - {circuitName} ({year})
        </Text>
      </Card>
    </View>
  );

  const renderItem = ({ item }) => {
    return (
      <HistoricResult
        raceName={item.raceName}
        circuitName={item.Circuit.circuitName}
        year={item.season}
        country={item.Circuit.Location.country}
      />
    );
  };

  const searchFilterFunction = (text) => {
    if (text) {
      const newData = historicResultsArray.filter(function (item) {
        const itemData = item.raceName ? item.raceName : "";
        const textData = text;
        return itemData.indexOf(textData) > -1;
      });
      setFilteredResults(newData);
      setSearch(text);
    } else {
      setFilteredResults(historicResultsArray);
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

  console.log(historicResultsArray.length, "length");

  return (
    <SafeAreaView style={styles.resultList}>
      <SearchBar
        style={styles.searchBar}
        placeholder="Race"
        onChangeText={(text) => searchFilterFunction(text)}
        onClear={(text) => searchFilterFunction("")}
        value={search}
      />
      <FlatList
        style={styles.resultCard}
        data={filteredResults}
        renderItem={renderItem}
        // keyExtractor={(Result) => Result.Driver.driverId}
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
        ) : (
          console.log("not rendering")
        )}
      </View>
    </SafeAreaView>
  );
};

export default HistoricResults;

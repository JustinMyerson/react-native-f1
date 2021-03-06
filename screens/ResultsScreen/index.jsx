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
import { Card } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import uuid from "react-native-uuid";

const ResultsScreen = (props, { navigation }) => {
  const resultID = props.route.params.resultId;
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [resultsArray, setResultsArray] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    // Reset the error in case we had one last time we
    // did an api call
    setError(null);
    fetch(`https://ergast.com/api/f1/${resultID}/results.json`)
      .then((res) => res.json())
      .then(
        (result) => {
          try {
            setResultsArray(result.MRData.RaceTable.Races[0].Results);
          } catch (error) {
            console.log(error, "Could not load data");
          }
          setResults(result.MRData.RaceTable.Races);
          setIsLoading(false);
        },
        (error) => {
          setIsLoading(false);
          setError(error);
        }
      );
  }, []);

  const Result = ({ position, firstName, surname, constructor }) => (
    <View>
      <Card style={styles.results}>
        <Text style={styles.resultText}>
          {position} - {firstName} {surname} : {constructor}
        </Text>
      </Card>
    </View>
  );

  const renderItem = ({ item }) => {
    return (
      <Result
        position={item.position}
        firstName={item.Driver.givenName}
        surname={item.Driver.familyName}
        constructor={item.Constructor.name}
      />
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
    <SafeAreaView style={styles.resultList}>
      <View style={styles.heading}></View>
      <Ionicons
        onPress={() => props.navigation.navigate("All Results")}
        name="return-up-back"
        size={44}
        color="#9e1111"
        style={{ paddingLeft: 15 }}
      />
      <FlatList
        style={styles.resultCard}
        data={resultsArray}
        renderItem={renderItem}
        keyExtractor={(result) => uuid.v4()}
      />
    </SafeAreaView>
  );
};

export default ResultsScreen;

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

const ResultsScreen = ({ navigation }) => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [resultsArray, setResultsArray] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    // Reset the error in case we had one last time we
    // did an api call
    setError(null);
    fetch("https://ergast.com/api/f1/current/last/results.json")
      .then((res) => res.json())
      .then(
        (result) => {
          setResultsArray(result.MRData.RaceTable.Races[0].Results);
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
      <Text style={styles.result}>
        {position} - {firstName} {surname} : {constructor}
      </Text>
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
    <SafeAreaView style={styles.resultList}>
      <View style={styles.heading}>
        <Text>
          {results[0].season} {results[0].raceName}
        </Text>
      </View>
      <FlatList
        data={resultsArray}
        renderItem={renderItem}
        keyExtractor={(Result) => Result.Driver.driverId}
      />
    </SafeAreaView>
  );
};

export default ResultsScreen;

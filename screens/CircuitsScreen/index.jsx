import react, { useState, useEffect } from "react";
import { render } from "react-dom";
import {
  SafeAreaView,
  ActivityIndicator,
  View,
  Text,
  FlatList,
} from "react-native";
import { ScreenContainer } from "../../components/ScreenContainer/index";
import { styles } from "./style";

const CircuitsScreen = ({ navigation }) => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [circuits, setCircuits] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    // Reset the error in case we had one last time we
    // did an api call
    setError(null);
    fetch("http://ergast.com/api/f1/circuits.json")
      .then((res) => res.json())
      .then(
        (result) => {
          setCircuits(result.MRData.CircuitTable.Circuits);
          setIsLoading(false);
        },
        (error) => {
          setIsLoading(false);
          setError(error);
        }
      );
  }, []);

  const Circuit = ({ circuitName, Location, country }) => (
    <View>
      <Text style={styles.circuit}>
        {country} {Location} {circuitName}
      </Text>
    </View>
  );

  const renderItem = ({ item }) => {
    return (
      <Circuit
        circuitName={item.circuitName}
        Location={item.Location.country}
        country={item.country}
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
    <SafeAreaView style={styles.circuitList}>
      <FlatList
        data={circuits}
        renderItem={renderItem}
        keyExtractor={(circuit) => circuit.circuitId}
      />
    </SafeAreaView>
  );
};

export default CircuitsScreen;

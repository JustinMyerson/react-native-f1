import react, { useState, useEffect } from "react";
import {
  SafeAreaView,
  ActivityIndicator,
  View,
  Text,
  FlatList,
} from "react-native";
import { Card } from "react-native-paper";
import { styles } from "./style";
import { Ionicons } from "@expo/vector-icons";

const CircuitsScreen = ({ navigation }) => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [circuits, setCircuits] = useState([]);
  const [offset, setOffset] = useState(0);
  const [total, setTotal] = useState(30);

  let difference = total - offset;

  function handleBackClicked() {
    difference < 0 ? setOffset(0) : setOffset(offset - 30);
  }

  function handleForwardClicked() {
    difference >= 30 ? setOffset(offset + 30) : setOffset(offset + difference);
    console.log(offset);
  }

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
          setTotal(result.MRData.total);
          setIsLoading(false);
        },
        (error) => {
          setIsLoading(false);
          setError(error);
        }
      );
  }, [offset]);

  const Circuit = ({ circuitName, Location, wiki }) => (
    <View>
      <Card style={styles.circuit}>
        <Text style={styles.circuitText}>
          {circuitName} - {Location}
        </Text>
      </Card>
    </View>
  );

  const renderItem = ({ item }) => {
    return (
      <Circuit
        circuitName={item.circuitName}
        Location={item.Location.country}
        wiki={item.url}
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
    <SafeAreaView style={styles.circuitList}>
      <FlatList
        style={styles.circuitCard}
        data={circuits}
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

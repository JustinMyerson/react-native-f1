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
import { Ionicons } from "@expo/vector-icons";

const CircuitsScreen = ({ navigation }) => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [circuits, setCircuits] = useState([]);
  const [offset, setOffset] = useState(0);
  const [total, setTotal] = useState(30);

  function handleBackClicked() {
    let difference = offset - 30;
    difference < 0 ? setOffset(0) : setOffset(offset - 30);
  }

  function handleForwardClicked() {
    let difference = total - offset;
    difference >= 30 ? setOffset(offset + 30) : setOffset(offset + difference);
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

  const Circuit = ({ circuitName, Location }) => (
    <View>
      <Text style={styles.circuit}>
        {circuitName} - {Location}
      </Text>
    </View>
  );

  const renderItem = ({ item }) => {
    return (
      <Circuit
        circuitName={item.circuitName}
        Location={item.Location.country}
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

export default CircuitsScreen;

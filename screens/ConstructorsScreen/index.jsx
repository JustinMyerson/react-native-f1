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

const ConstructorsScreen = ({ navigation }) => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [constructors, setConstructors] = useState([]);
  const [offset, setOffset] = useState(0);
  const [total, setTotal] = useState(30);

  function handleBackClicked() {
    let difference = offset - 30;
    difference < 0 ? setOffset(0) : setOffset(offset - 30);
    console.log("back:", offset);
  }

  function handleForwardClicked() {
    let difference = total - offset;
    difference >= 30 ? setOffset(offset + 30) : setOffset(offset + difference);
    console.log("forward:", offset);
  }

  useEffect(() => {
    setIsLoading(true);
    // Reset the error in case we had one last time we
    // did an api call
    setError(null);
    fetch("http://ergast.com/api/f1/constructors.json?offset=" + offset)
      .then((res) => res.json())
      .then(
        (result) => {
          setConstructors(result.MRData.ConstructorTable.Constructors);
          setTotal(result.MRData.total);
          setIsLoading(false);
        },
        (error) => {
          setIsLoading(false);
          setError(error);
        }
      );
  }, [offset]);

  const Constructor = ({ name, nationality }) => (
    <View>
      <Text style={styles.constructor}>
        {name} {nationality}
      </Text>
    </View>
  );

  const renderItem = ({ item }) => {
    return <Constructor name={item.name} nationality={item.nationality} />;
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
    <SafeAreaView style={styles.constructorsList}>
      <FlatList
        data={constructors}
        renderItem={renderItem}
        keyExtractor={(Constructor) => Constructor.constructorId}
      />
      <View style={styles.buttons}>
        <Ionicons
          onPress={() => handleBackClicked()}
          name="ios-chevron-back-circle-outline"
          size={24}
          color="#9e1111"
        />
        <Ionicons
          onPress={() => handleForwardClicked()}
          name="chevron-forward-circle-outline"
          size={24}
          color="#9e1111"
        />
      </View>
    </SafeAreaView>
  );
};

export default ConstructorsScreen;

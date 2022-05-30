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

const ConstructorsScreen = ({ navigation }) => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [constructors, setConstructors] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    // Reset the error in case we had one last time we
    // did an api call
    setError(null);
    fetch("http://ergast.com/api/f1/constructors.json")
      .then((res) => res.json())
      .then(
        (result) => {
          setConstructors(result.MRData.ConstructorTable.Constructors);
          setIsLoading(false);
        },
        (error) => {
          setIsLoading(false);
          setError(error);
        }
      );
  }, []);

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
    </SafeAreaView>
  );
};

export default ConstructorsScreen;

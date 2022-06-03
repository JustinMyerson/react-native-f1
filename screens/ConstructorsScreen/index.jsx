import react, { useState, useEffect } from "react";
import {
  SafeAreaView,
  ActivityIndicator,
  View,
  Text,
  FlatList,
  Linking,
} from "react-native";
import { styles } from "./style";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Card } from "react-native-paper";
import SearchBar from "react-native-dynamic-search-bar";

const ConstructorsScreen = ({ navigation }) => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [constructors, setConstructors] = useState([]);
  const [filteredConstructors, setFilteredConstructors] = useState([]);
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
          setFilteredConstructors(result.MRData.ConstructorTable.Constructors);
          setTotal(result.MRData.total);
          setIsLoading(false);
        },
        (error) => {
          setIsLoading(false);
          setError(error);
        }
      );
  }, [offset]);

  const Constructor = ({ name, nationality, url }) => (
    <View>
      <Card style={styles.constructor}>
        <Text style={styles.constructorText}>{name}</Text>
        <View style={styles.bottomView}>
          <MaterialCommunityIcons
            name="search-web"
            size={30}
            color="black"
            onPress={() => Linking.openURL(url)}
          />
          <Text style={styles.constructorTextBottom}>{nationality}</Text>
        </View>
      </Card>
    </View>
  );

  const renderItem = ({ item }) => {
    return (
      <Constructor
        name={item.name}
        nationality={item.nationality}
        url={item.url}
      />
    );
  };

  const searchFilterFunction = (text) => {
    if (text) {
      const newData = constructors.filter(function (item) {
        const itemData = item.name ? item.name : "";
        const textData = text;
        return itemData.indexOf(textData) > -1;
      });
      setFilteredConstructors(newData);
      setSearch(text);
    } else {
      setFilteredConstructors(constructors);
      setSearch(text);
    }
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
      <SearchBar
        style={styles.searchBar}
        placeholder="Constructor Name"
        onChangeText={(text) => searchFilterFunction(text)}
        onClear={(text) => searchFilterFunction("")}
        value={search}
      />
      <FlatList
        style={styles.constructorCard}
        data={filteredConstructors}
        renderItem={renderItem}
        keyExtractor={(Constructor) => Constructor.constructorId}
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

export default ConstructorsScreen;

import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  constructorsList: {
    marginLeft: 10,
    marginTop: 10,
    marginRight: 10,
  },

  constructor: {
    flex: 1,
    justifyContent: "center",
    padding: 8,
    marginTop: 8,
    marginBottom: 3,
    backgroundColor: "#c96565",
  },

  constructorText: { fontSize: 13, textAlign: "center", padding: 5 },

  constructorCard: {
    paddingLeft: 5,
    marginBottom: 5,
    height: "87%",
  },

  buttons: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },

  searchBar: {
    marginBottom: 5,
  },
});

import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  bottomView: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },

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

  constructorText: {
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
    padding: 5,
  },

  constructorTextBottom: {
    fontSize: 18,
    fontStyle: "italic",
    textAlign: "right",
  },

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

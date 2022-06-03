import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  circuitList: {
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
  },

  circuit: {
    flex: 1,
    justifyContent: "center",
    padding: 8,
    marginTop: 8,
    marginBottom: 3,
    backgroundColor: "#c96565",
  },

  circuitText: {
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
    padding: 8,
  },

  circuitTextBottom: {
    fontSize: 15,
    fontStyle: "italic",
    textAlign: "right",
  },

  circuitCard: {
    paddingLeft: 5,
    marginBottom: 5,
    height: "87%",
  },

  buttons: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },

  bottomView: {
    display: "flex",
  },

  searchBar: {
    marginBottom: 5,
  },
});

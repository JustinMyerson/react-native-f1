import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  driverList: {
    marginLeft: 10,
    marginTop: 10,
    marginRight: 10,
  },

  drivers: {
    flex: 1,
    justifyContent: "center",
    padding: 8,
    marginTop: 8,
    marginBottom: 3,
    backgroundColor: "#c96565",
  },

  driversText: {
    fontSize: 18,
    textAlign: "center",
    padding: 5,
    fontWeight: "bold",
  },

  driversTextBottom: {
    fontSize: 18,
    fontStyle: "italic",
    textAlign: "right",
  },

  driversCard: {
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
    flexDirection: "row",
    justifyContent: "space-between",
  },

  searchBar: {
    marginBottom: 5,
  },
});

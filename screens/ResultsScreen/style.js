import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  resultList: {
    marginLeft: 10,
    marginTop: 10,
    marginRight: 10,
  },

  results: {
    flex: 1,
    justifyContent: "center",
    padding: 8,
    marginTop: 8,
    marginBottom: 3,
    backgroundColor: "#c96565",
  },

  resultText: { fontSize: 13, textAlign: "center", padding: 5 },

  heading: {
    display: "flex",
    alignItems: "center",
  },

  raceName: {
    fontSize: 40,
    color: "#9e1111",
  },

  resultCard: {
    paddingLeft: 5,
    marginBottom: 5,
    height: "92%",
  },
});

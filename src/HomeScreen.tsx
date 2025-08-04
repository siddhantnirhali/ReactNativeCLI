import React from "react";
import { View, Text, StyleSheet } from "react-native";

type HomeScreenProps = {
  name?: string;
};
const HomeScreen : React.FC<HomeScreenProps> = ({name}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome {name} to the Home Screen!</Text>
    </View>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
  },
  text: {
    fontSize: 20,
    color: "#333",
  },
});

export default HomeScreen;
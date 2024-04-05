import { View, Text, StyleSheet } from "react-native";
import { colors } from "../components/constants";
import { fetchScore } from "../util/http";

export default ResultScreen = ({ route }) => {
  const { correctWord, guessCount, condition } = route.params;
  

  return (
    <View style={styles.container}>
      <Text
        style={[
          styles.title,
          route.params.condition === "won!"
            ? { color: "green" }
            : { color: "red" },
        ]}
      >
        You {condition}
      </Text>
      <Text style={styles.subtitle}>The word was {correctWord}</Text>
      <Text style={styles.subtitle}>Number of guesses: {guessCount}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 48,
    color: colors.primary,
  },
  subtitle: {
    fontSize: 24,
    color: colors.grey,
  },
});

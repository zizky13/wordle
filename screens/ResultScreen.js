import { View, Text, StyleSheet, Button } from "react-native";
import { colors } from "../components/constants";
import { fetchScore } from "../util/http";

export default ResultScreen = ({ route, navigation }) => {
  const { correctWord, guessCount, condition, reset } = route.params;

  const playAgain = () => {
    reset();
    navigation.navigate("MainGameScreen");
  };
  

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
      <Button title="Play Again" onPress={playAgain} />
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

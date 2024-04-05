import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { fetchScore } from "./util/http";
import MainGameScreen from "./screens/MainGameScreen";
import ResultScreen from "./screens/ResultScreen";

// Todo:
// - Save current progress in AsyncStorage or backend stuff
// - keep track of stats such as (number of games played, win rate, current streak, longest streak, etc)
// - Add a timer to track the time taken to solve the word
// - Add reset button to reset the game, or implement reset login when number is guessed corretcly or user lost

const highestNumberOfGuess = fetchScore()
.then(score => console.log('Fetched score: ', score))
.catch(error => console.error('Failed to fetch score: ', error));

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="MainGameScreen" screenOptions={{headerShown: false}}>
        <Stack.Screen name="MainGameScreen" component={MainGameScreen} />
        <Stack.Screen 
          name="ResultScreen" 
          children={(props) => <ResultScreen {...props} highestNumberOfGuess={highestNumberOfGuess} />} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

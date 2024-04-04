import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainGameScreen from "./screens/MainGameScreen";
import ResultScreen from "./screens/ResultScreen";

// Todo:
// - Save current progress in AsyncStorage or backend stuff
// - keep track of stats such as (number of games played, win rate, current streak, longest streak, etc)
// - Add a timer to track the time taken to solve the word
// - Add reset button to reset the game, or implement reset login when number is guessed corretcly or user lost

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="MainGameScreen" screenOptions={{headerShown: false}}>
        <Stack.Screen name="MainGameScreen" component={MainGameScreen} />
        <Stack.Screen name="ResultScreen" component={ResultScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

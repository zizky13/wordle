import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, SafeAreaView, ScrollView } from "react-native";
import { useState } from "react";
import { ENTER, CLEAR, colors } from "./components/constants";
import Keyboard from "./components/Keyboard";

/**
 * Main component for the Wordle app.
 *
 * @returns {JSX.Element} The rendered component.
 */

const tries = 6;
const copyArray = (arr) => {
  return [...arr.map((rows) => [...rows])]; //creates a deep copy of the array bcs we need to update the rows state
};

export default function App() {
  const word = "hello";
  const letters = word.split(""); //splits to ['h', 'e', 'l', 'l', 'o']
  const [rows, setRows] = useState(
    new Array(tries).fill(new Array(letters.length).fill(""))
  ); //creates a state variable rows with initial value of rows

  const [currentRow, setCurrentRow] = useState(0); //creates a state to track current pointed row
  const [currentCol, setCurrentCol] = useState(0); //creates a state to track current pointed column
  const greenCaps = [];
  const yellowCaps = [];
  const greyCaps = [];

  const onKeyPressed = (key) => {
    const updatedRows = copyArray(rows); //creates a deep copy of the rows state

    if (key === CLEAR) {
      const previousColumn = currentCol - 1;
      if (previousColumn >= 0) {
        updatedRows[currentRow][previousColumn] = "";
        setRows(updatedRows);
        setCurrentCol(previousColumn);
      }
      return;
    }

    if (key === ENTER) {
      if (currentCol === rows[0].length) {
        setCurrentRow(currentRow + 1);
        setCurrentCol(0);
      }
      return;
    }

    if (currentCol < rows[0].length) {
      updatedRows[currentRow][currentCol] = key;
      setRows(updatedRows);
      setCurrentCol(currentCol + 1);
    }
  };

  const isCellActive = (row, col) => {
    return row === currentRow && col === currentCol;
  };

  const getCellBGColor = (cell, row, col) => {
    if (row >= currentRow) {
      return colors.black;
    }

    if (cell === letters[col]) {
      greenCaps.push(cell);
      return colors.primary;
    }
    if (letters.includes(cell)) {
      yellowCaps.push(cell);
      return colors.secondary;
    }
    greyCaps.push(cell);
    return colors.darkgrey;
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <Text style={styles.title}>WORDLE</Text>
      <ScrollView style={styles.map}>
        {rows.map((row, i) => (
          <View key={`row-${i}`} style={styles.row}>
            {row.map((cell, j) => (
              <View
                key={`cell-${i}-${j}`}
                style={[
                  styles.cell,
                  {
                    borderColor: isCellActive(i, j)
                      ? colors.grey
                      : colors.darkgrey,
                    backgroundColor: getCellBGColor(cell, i, j),
                  },
                ]}
              >
                <Text style={styles.cellText}>{cell.toUpperCase()}</Text>
              </View>
            ))}
          </View>
        ))}
      </ScrollView>

      <Keyboard
        onKeyPressed={onKeyPressed}
        greenCaps={greenCaps}
        yellowCaps={yellowCaps}
        greyCaps={greyCaps}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
    alignItems: "center",
  },

  title: {
    color: colors.lightgrey,
    fontSize: 40,
    fontWeight: "bold",
    letterSpacing: 6,
    marginTop: 20,
  },

  map: {
    alignSelf: "stretch",
    marginVertical: 20,
    height: 100,
  },

  row: {
    alignSelf: "stretch",
    flexDirection: "row",
    justifyContent: "center",
  },

  cell: {
    width: 50,
    height: 50,
    borderColor: colors.lightgrey,
    borderRadius: 5,
    borderWidth: 1,
    flex: 1,
    maxWidth: 70,
    aspectRatio: 1,
    margin: 2,
    justifyContent: "center",
    alignItems: "center",
  },

  cellText: {
    color: colors.lightgrey,
    fontWeight: "bold",
    fontSize: 30,
  },
});

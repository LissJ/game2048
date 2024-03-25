import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

const GRID_SIZE = 4;

const App = () => {
  const [grid, setGrid] = useState(Array.from({ length: GRID_SIZE }, () => Array(GRID_SIZE).fill(0)));

  useEffect(() => {
    addNumber();
    addNumber();
  }, []);

  const addNumber = () => {
    const emptyCells = [];
    grid.forEach((row, i) => {
      row.forEach((cell, j) => {
        if (cell === 0) {
          emptyCells.push([i, j]);
        }
      });
    });

    if (emptyCells.length > 0) {
      const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
      const newValue = Math.random() < 0.9 ? 2 : 4;
      const newGrid = [...grid];
      newGrid[randomCell[0]][randomCell[1]] = newValue;
      setGrid(newGrid);
    }
  };

  const swipe = (direction) => {
    const newGrid = [...grid];
    switch (direction) {
      case 'up':
        // Implement swipe up logic
        break;
      case 'down':
        // Implement swipe down logic
        break;
      case 'left':
        // Implement swipe left logic
        break;
      case 'right':
        // Implement swipe right logic
        break;
    }
    setGrid(newGrid);
    addNumber();
  };

  const renderGrid = () => {
    return grid.map((row, rowIndex) => (
      <View key={rowIndex} style={styles.row}>
        {row.map((cell, cellIndex) => (
          <View key={cellIndex} style={[styles.cell, { backgroundColor: cellColor(cell) }]}>
            <Text style={styles.cellText}>{cell !== 0 ? cell : ''}</Text>
          </View>
        ))}
      </View>
    ));
  };

  const cellColor = (value) => {
    switch (value) {
      case 2:
        return '#EEE4DA';
      case 4:
        return '#EDE0C8';
      case 8:
        return '#F2B179';
      case 16:
        return '#F59563';
      case 32:
        return '#F67C5F';
      case 64:
        return '#F65E3B';
      case 128:
        return '#EDCF72';
      case 256:
        return '#EDCC61';
      case 512:
        return '#EDC850';
      case 1024:
        return '#EDC53F';
      case 2048:
        return '#EDC22E';
      default:
        return '#CDC1B4';
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>2048</Text>
      <View style={styles.gridContainer}>{renderGrid()}</View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => swipe('up')}>
          <Text style={styles.buttonText}>Up</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => swipe('down')}>
          <Text style={styles.buttonText}>Down</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => swipe('left')}>
          <Text style={styles.buttonText}>Left</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => swipe('right')}>
          <Text style={styles.buttonText}>Right</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3C4146',
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 20,
  },
  gridContainer: {
    flexDirection: 'column',
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    width: 80,
    height: 80,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  cellText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#3C4146',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3C4146',
  },
});

export default App;
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons/';
// import { useNavigation } from '@react-navigation/native';


const GRID_SIZE = 4;

const App = () => {
  const [grid, setGrid] = useState(Array.from({ length: GRID_SIZE }, () => Array(GRID_SIZE).fill(0)));

  useEffect(() => {
    addNumber();
    addNumber();
  }, []);

  useEffect(() => {
    const checkGameOver = () => {
      // Verificar se o jogador ganhou (encontrou 2048)
      for (let i = 0; i < GRID_SIZE; i++) {
        for (let j = 0; j < GRID_SIZE; j++) {
          if (grid[i][j] === 2048) {
            Alert.alert('VitaMental', 'Parabéns! Você chegou ao 2048.');
            return;
          }
        }
      }

      // Verificar se o jogador perdeu (não há mais movimentos)
      let movesPossible = false;
      for (let i = 0; i < GRID_SIZE; i++) {
        for (let j = 0; j < GRID_SIZE; j++) {
          if (grid[i][j] === 0) {
            movesPossible = true;
          } else if (
            (i < GRID_SIZE - 1 && grid[i][j] === grid[i + 1][j]) ||
            (j < GRID_SIZE - 1 && grid[i][j] === grid[i][j + 1])
          ) {
            movesPossible = true;
          }
        }
      }

      if (!movesPossible) {
        Alert.alert('VitaMental', 'Poxa! Você perdeu.');
      }
    };

    checkGameOver();
  }, [grid]); // Executar sempre que o estado da grade mudar

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
    let moved = false;

    switch (direction) {
      case 'up':
        moved = swipeUp(newGrid);
        break;
      case 'down':
        moved = swipeDown(newGrid);
        break;
      case 'left':
        moved = swipeLeft(newGrid);
        break;
      case 'right':
        moved = swipeRight(newGrid);
        break;
    }

    if (moved) {
      setGrid(newGrid);
      addNumber();
    }
  };

  const swipeUp = (grid) => {
    let moved = false;

    for (let j = 0; j < GRID_SIZE; j++) {
      for (let i = 1; i < GRID_SIZE; i++) {
        if (grid[i][j] !== 0) {
          let k = i;
          while (k > 0 && grid[k - 1][j] === 0) {
            grid[k - 1][j] = grid[k][j];
            grid[k][j] = 0;
            k--;
            moved = true;
          }
          if (k > 0 && grid[k - 1][j] === grid[k][j]) {
            grid[k - 1][j] *= 2;
            grid[k][j] = 0;
            moved = true;
          }
        }
      }
    }

    return moved;
  };

  const swipeDown = (grid) => {
    let moved = false;

    for (let j = 0; j < GRID_SIZE; j++) {
      for (let i = GRID_SIZE - 2; i >= 0; i--) {
        if (grid[i][j] !== 0) {
          let k = i;
          while (k < GRID_SIZE - 1 && grid[k + 1][j] === 0) {
            grid[k + 1][j] = grid[k][j];
            grid[k][j] = 0;
            k++;
            moved = true;
          }
          if (k < GRID_SIZE - 1 && grid[k + 1][j] === grid[k][j]) {
            grid[k + 1][j] *= 2;
            grid[k][j] = 0;
            moved = true;
          }
        }
      }
    }

    return moved;
  };

  const swipeLeft = (grid) => {
    let moved = false;

    for (let i = 0; i < GRID_SIZE; i++) {
      for (let j = 1; j < GRID_SIZE; j++) {
        if (grid[i][j] !== 0) {
          let k = j;
          while (k > 0 && grid[i][k - 1] === 0) {
            grid[i][k - 1] = grid[i][k];
            grid[i][k] = 0;
            k--;
            moved = true;
          }
          if (k > 0 && grid[i][k - 1] === grid[i][k]) {
            grid[i][k - 1] *= 2;
            grid[i][k] = 0;
            moved = true;
          }
        }
      }
    }

    return moved;
  };

  const swipeRight = (grid) => {
    let moved = false;

    for (let i = 0; i < GRID_SIZE; i++) {
      for (let j = GRID_SIZE - 2; j >= 0; j--) {
        if (grid[i][j] !== 0) {
          let k = j;
          while (k < GRID_SIZE - 1 && grid[i][k + 1] === 0) {
            grid[i][k + 1] = grid[i][k];
            grid[i][k] = 0;
            k++;
            moved = true;
          }
          if (k < GRID_SIZE - 1 && grid[i][k + 1] === grid[i][k]) {
            grid[i][k + 1] *= 2;
            grid[i][k] = 0;
            moved = true;
          }
        }
      }
    }

    return moved;
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

    <View style={styles.header}>
      <View style={styles.container}>
        <Text style={styles.jogos}>
          Jogo 2048
          <View style={styles.iconeHome}>
            <Ionicons name="home-outline"
              style={styles.iconeInicio}
            // onPress={toHome} 
            />
          </View>
        </Text>

        <Text style={styles.resumoJogos}>
          Um jogo de somar os números iguais até chegar a 2048.
        </Text>
      </View>
      <View style={styles.containers}>
        <View style={styles.gridContainer}>{renderGrid()}</View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => swipe('up')}>
            <Text style={styles.buttonText}>
              <Ionicons name="arrow-up-outline" size={15} color='#000' />
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => swipe('down')}>
            <Text style={styles.buttonText}>
              <Ionicons name="arrow-down-outline" size={15} color='#000' />
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => swipe('left')}>
            <Text style={styles.buttonText}>
              <Ionicons name="arrow-back-outline" size={15} color='#000' />
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => swipe('right')}>
            <Text style={styles.buttonText}>
              <Ionicons name="arrow-forward-outline" size={15} color='#000' />
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    height: 180,
    // flex: 0.7,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    paddingHorizontal: 20,
  },
  jogos: {
    marginTop: 50,
    marginLeft: 15,
    fontSize: 23,
    fontWeight: '800',
    color: '#34393E'
  },
  iconeHome: {
    position: 'absolute',
    fontSize: 27,
    // marginLeft: 155,
    marginLeft: 180,
    color: "#34393E"
  },
  iconeInicio: {
    position: 'absolute',
    fontSize: 24,
    // marginTop: 5,
    // marginLeft: 155,
    marginLeft: 180,
    color: "#34393E"
  },
  resumoJogos: {
    marginTop: 10,
    marginLeft: 15,
    marginRight: 15,
    fontSize: 16,
    fontWeight: '500',
    color: '#34393E'
  },
  header: {
    justifyContent: 'center',
    display: 'flex',
    flex: 1,
    backgroundColor: '#3C4146'
  },
  containers: {
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
  arrow: {
    width: 10,
    height: 10,
  },
});

export default App;
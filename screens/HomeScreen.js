import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, ScrollView} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Habit from '../components/Habit';


const HomeScreen = ( { route, navigation } ) => {
  const [pendingHabitItems, setPendingHabitItems] = useState([]);
  const [completedHabitItems, setCompletedHabitItems] = useState([]);

  useEffect(() => {
    //Wenn Parameter übergeben, erstelle neues Habit
    if (route.params?.habit) {
      addHabitToList();
      navigation.setParams({ habit: null });
    }
  }, [route.params?.habit]);
 
  const addHabitToList = () => {
    const newHabit = route.params.habit;
    setPendingHabitItems(pendingHabitItems => [...pendingHabitItems, newHabit]);
  } 

  const moveHabitToCompleted = (index) => {
    const habitToMove = pendingHabitItems[index];
    setPendingHabitItems(pendingHabitItems => pendingHabitItems.filter((_, i) => i !== index));
    setCompletedHabitItems(completedHabitItems => [...completedHabitItems, habitToMove]);   
  }

  const moveHabitToPending = (index) => {
    const habitToMove = completedHabitItems[index];
    setCompletedHabitItems(completedHabitItems => completedHabitItems.filter((_, i) => i !== index));
    setPendingHabitItems(pendingHabitItems => [...pendingHabitItems, habitToMove]);  
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator = {false}>
      <Text style = {styles.mainHeading}>Hello, {username}!</Text>

      {pendingHabitItems.length > 0 && (
      <View style={styles.pendingTasksContainer}>
        <Text style = {styles.taskHeading}>Pending for today</Text>
        {
          pendingHabitItems.map((habit, index) => (
          <Habit key={index} text={habit} onPress={() => moveHabitToCompleted(index)} />
          ))}

      </View>
      )}
            
      {completedHabitItems.length > 0 && ( // Conditionally render the View if completedHabits is not empty
        <View style={styles.completedTasksContainer}>
          <Text style={styles.taskHeading}>Completed</Text>
          {completedHabitItems.map((habit, index) => (
            <Habit key={index} text={habit} onPress={() => moveHabitToPending(index)} />
          ))}
        </View>
      )}

      <StatusBar style="auto" />
    </ScrollView>
  );
}

const username = "Benedict";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    //alignItems: 'center',
    //justifyContent: 'center',

  },
  pendingTasksContainer: {
    paddingTop: 100,
    paddingHorizontal: 20,
    paddingBottom: 0,
  },
  completedTasksContainer: {
    paddingHorizontal: 20,
    paddingBottom: 100,
    paddingTop: 100,
  },
  taskHeading: {
    fontSize: 24,
    paddingBottom: 10,
    fontWeight: 'normal',
  },
  mainHeading: {
    top: 64,
    paddingHorizontal: 20,
    fontSize: 32,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
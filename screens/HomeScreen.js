import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, ScrollView} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Habit from '../components/Habit';


const HomeScreen = ( { route } ) => {
  const [pendingHabitItems, setPendingHabitItems] = useState([]);
  const [completedHabitItems, setCompletedHabitItems] = useState([]);

  useEffect(() => {
    //Wenn Parameter übergeben, erstelle neues Habit
    if (route.params?.habit) {
      addHabitToList();
    }
  }, [route.params?.habit]);
 
  const addHabitToList = () => {
    const newHabit = route.params.habit;
    setPendingHabitItems(pendingHabitItems => [...pendingHabitItems, newHabit]);
  } 

  const pendingHabits = ['Exercise', 'Read', 'Meditate'];
  const completedHabits = ['Code', 'Go for a walk'];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator = {false}>
      <Text style = {styles.mainHeading}>Hello, {username}!</Text>
      <View style={styles.pendingTasksContainer}>
        <Text style = {styles.taskHeading}>Pending for today</Text>
        {
          pendingHabitItems.map((habit, index) => (
          <Habit key={index} text={habit} />
          ))}

      </View>


      <View style={styles.completedTasksContainer}>
      <Text style = {styles.taskHeading}>Completed</Text>   
          {
          completedHabits.map((habit, index) => (
          <Habit key={index} text={habit} />
          ))}
      </View>

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
    paddingBottom: 30,
  },
  completedTasksContainer: {
    paddingHorizontal: 20,
    paddingBottom: 100,
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
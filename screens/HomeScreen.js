import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, ScrollView} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Habit from '../components/Habit';
import AsyncStorage from '@react-native-async-storage/async-storage';


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

  
  useEffect(() => {
    const loadData = async () => {
      try {
        const pendingItems = await AsyncStorage.getItem('pendingHabitItems');
        const completedItems = await AsyncStorage.getItem('completedHabitItems');

        console.log(await AsyncStorage.getItem('pendingItems'));
        console.log(await AsyncStorage.getItem('completedItems'));
        
        if (pendingItems !== null) {
          setPendingHabitItems(JSON.parse(pendingItems));
        }
        if (completedItems !== null) {
          setCompletedHabitItems(JSON.parse(completedItems));
        }
      } catch (error) {
        console.error('Error loading data: ', error);
      }
    };

    loadData();
  }, []);

  useEffect(() => {
    const saveData = async () => {
      try {
        await AsyncStorage.setItem('pendingHabitItems', JSON.stringify(pendingHabitItems));
        console.log('Saving pendingHabitItems successful');
      } catch (error) {
        console.error('Error saving pendingHabitItems', error);
      }
    };
  
    saveData();
  }, [pendingHabitItems]);
  
  useEffect(() => {
    const saveData = async () => {
      try {
        await AsyncStorage.setItem('completedHabitItems', JSON.stringify(completedHabitItems));
        console.log('Saving completedHabitItems successful');
      } catch (error) {
        console.error('Error saving completedHabitItems', error);
      }
    };
  
    saveData();
  }, [completedHabitItems]);
  

 
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
import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, ScrollView} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Habit from '../components/Habit';
import HabitUpdated from '../components/HabitUpdated';
import Addiction from '../components/Addiction';
import AsyncStorage from '@react-native-async-storage/async-storage';


const HomeScreen = ( { route, navigation } ) => {
  const [pendingHabitItems, setPendingHabitItems] = useState([]);
  const [completedHabitItems, setCompletedHabitItems] = useState([]);
  const [addictionItems, setAddictionItems] = useState([]);
  const [habitToDeleteIndex, setHabitToDeleteIndex] = useState(null);
  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);

  useEffect(() => {
    //Create a new habit if a parameter is passed
    if (route.params?.habit) {
      addHabitToList();
      navigation.setParams({ habit: null });
    }
  }, [route.params?.habit]);

  useEffect(() => {
    //Create a new addiction if a parameter is passed
    if (route.params?.addiction) {
      addAddictionToList();
      navigation.setParams({ addiction: null });
    }
  }, [route.params?.addiction]);

  //useEffect hook to load pending and completed habits from AsyncStorage into 
  //Pending habits work fine, completed habits are not loaded properly
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


  //These two useEffect hooks save Data from pending and completed habits into AsyncStorage
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
  

 //This function is called when a new habit is passed to the home screen
  const addHabitToList = () => {
    const newHabit = route.params.habit;
    const newQuantity = route.params.quantity;
    const newHabitWithQuantity = {name: newHabit, quantity: newQuantity};
    setPendingHabitItems(pendingHabitItems => [...pendingHabitItems, newHabitWithQuantity]);
  } 

 //This function is called when a new addiction is passed to the home screen
 const addAddictionToList = () => {
  const newAddictionTitle = route.params.addiction;
  const newDate = new Date(route.params.date);
  const newAddiction = {addiction: newAddictionTitle, date: newDate};
  setAddictionItems(addictionItems => [...addictionItems, newAddiction]);
} 

  //Placeholder functions for swapping habits between pending and completed
  //Todo: Make quantifiable habits move automatically when the desired amount is achieved
  const moveHabitToCompleted = (index) => {
    const habitToMove = pendingHabitItems[index];
    //if (habitToMove.quantity === 1 || (habitToMove.quantity > 1 && habitToMove.completed === habitToMove.quantity)) {
    setPendingHabitItems(pendingHabitItems => pendingHabitItems.filter((_, i) => i !== index));
    setCompletedHabitItems(completedHabitItems => [...completedHabitItems, habitToMove]);   
    //}
  }

  const moveHabitToPending = (index) => {
    const habitToMove = completedHabitItems[index];
    setCompletedHabitItems(completedHabitItems => completedHabitItems.filter((_, i) => i !== index));
    setPendingHabitItems(pendingHabitItems => [...pendingHabitItems, habitToMove]);  
  }


  
  const deleteHabit = (index, isCompleted) => {
    if (index !== null) {
      if (isCompleted) {
        const newCompletedHabitItems = [...completedHabitItems];
        newCompletedHabitItems.splice(index, 1);
        setCompletedHabitItems(newCompletedHabitItems);
      } else {
        const newPendingHabitItems = [...pendingHabitItems];
        newPendingHabitItems.splice(index, 1);
        setPendingHabitItems(newPendingHabitItems);
      }
      setHabitToDeleteIndex(null); 
      setDeleteModalVisible(false);
    }
  };

  const deleteAddiction = (index) => {
    if (index !== null) {
      const newAddictionItems = [...addictionItems];
      newAddictionItems.splice(index, 1);
      setAddictionItems(newAddictionItems);
      setHabitToDeleteIndex(null); 
      setDeleteModalVisible(false);
    }
  };



  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator = {false}>
      <Text style = {styles.mainHeading}>Hello, {username}!</Text>

      {/*Conditional rendering, if array is not empty, render habits using the map function*/}
      {pendingHabitItems.length > 0 && (
      <View style={styles.pendingTasksContainer}>
        <Text style = {styles.taskHeading}>Pending for today</Text>
        {
          pendingHabitItems.map((habit, index) => (
          <HabitUpdated key={index} 
          text={habit.name} 
          quantity = {habit.quantity} 
          moveHabit={() => moveHabitToCompleted(index)}
          onLongPress = {() => setHabitToDeleteIndex(index)}
          onDelete={() => deleteHabit(index, false)}
          />
          ))}

      </View>
      )}

      {/*Conditional rendering, if array is not empty, render habits using the map function*/}            
      {completedHabitItems.length > 0 && (
        <View style={styles.completedTasksContainer}>
          <Text style={styles.taskHeading}>Completed</Text>
          {completedHabitItems.map((habit, index) => (
            <HabitUpdated key={index} 
            text={habit.name} 
            quantity = {habit.quantity} 
            moveHabit={() => moveHabitToPending(index)}
            onLongPress = {() => setHabitToDeleteIndex(index)}
            onDelete={() => deleteHabit(index, true)}
            />
          ))}
        </View>
      )}


      {/*Conditional rendering, if array is not empty, render addictions using the map function*/}   
               
      {addictionItems.length > 0 && (
        <View style={styles.completedTasksContainer}>
          <Text style={styles.taskHeading}>Addictions</Text>
          {addictionItems.map((addiction, index) => (
            <Addiction key={index} 
            text = {addiction.addiction} 
            initialStartDate = {new Date(addiction.date)}
            onLongPress = {() => setHabitToDeleteIndex(index)}
            onDelete={() => deleteAddiction(index)}

            />
          ))}
        </View>
      )} 


      <StatusBar style="auto" />
    </ScrollView>
  );
}

//Todo: implement input which is called on first launch of the app
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
    paddingBottom: 100,
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
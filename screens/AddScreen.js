import React from 'react'; 
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';

//This screen is used to choose between adding a new habit and adding a new addiction
const AddScreen = ( { navigation } ) => {
    return (
        <View style = {styles.addScreenContainer}>
        <Text style = {styles.addHabitHeading}>I would like to...</Text>
        <View style = {styles.addHabitContainer}>
    
          <TouchableOpacity style = {styles.addHabitButton} onPress = {() => navigation.navigate('NewHabit')}>
            <View style = {styles.addHabitButtonTextContainer}>
            <Text style = {styles.addHabitButtonHeading}>Establish a habit</Text>
            <Text style = {styles.addHabitButtonInfoText}>Track your progress manually every day to build a positive habit.</Text>
            </View>
          </TouchableOpacity>
        </View>
    
        <View style = {styles.addAddictionContainer}>
          <TouchableOpacity style = {styles.addAddictionButton} onPress = {() => navigation.navigate('NewAddiction')}>
            <View style = {styles.addHabitButtonTextContainer}>
            <Text style = {styles.addHabitButtonHeading}>Quit an addiction</Text>
            <Text style = {styles.addHabitButtonInfoText}>Your progress will be tracked automatically to grow your streak, unless you reset it.</Text>
            </View>
          </TouchableOpacity>
        </View>
        </View>
    
      );
  }


//Stylesheet
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f0f0f0',
  
    },
    pendingTasksContainer: {
      paddingTop: 100,
      paddingHorizontal: 20,
      paddingBottom: 20,
  
    },
    taskHeading: {
      fontSize: 24,
      color: '#474141',
      marginBottom: 10,
    },
    mainHeading: {
      top: 64,
      paddingHorizontal: 20,
      fontSize: 32,
      color: '#474141',
    },
    completedTasksContainer: {
      paddingHorizontal: 20,
      paddingBottom: 100,
    },
  addScreenContainer: {
    paddingHorizontal: 27,
  },
  addHabitContainer: {
    marginTop: 10,
  },
  addHabitButton: {
    borderRadius: 10,
    backgroundColor: '#503B89',
    height: 180,
  },
  addAddictionContainer: {
    marginTop: 30,
  },
  addAddictionButton: {
    borderRadius: 10,
    backgroundColor: '#632660',
    height: 180,
  },
  addHabitButtonHeading: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 28,
    textAlign: 'left',
    marginTop: 10,
  },
  addHabitButtonTextContainer: {
    marginLeft: 80,
    marginRight: 20,
    marginTop: 10,
  },
  addHabitButtonInfoText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'left',
  },
  addHabitHeading: {
    fontSize: 24,
    color: '#474141',
    marginTop: 100,
    marginBottom: 10,
  },
  
  
  });


  export default AddScreen;
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Habit from '../components/Habit';


const HomeScreen = () => {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator = {false}>
      <Text style = {styles.mainHeading}>Hello, {username}!</Text>
      <View style={styles.pendingTasksContainer}>
        <Text style = {styles.taskHeading}>Pending for today</Text>

        <View style = {styles.pendingItems}>
          <Habit text = "Go to bed early 🛏️"/>
          <Habit text = "Meditate"/>
          <Habit text = "Meditate"/>
          <Habit text = "Meditate"/>
          <Habit text = "Meditate"/>
          <Habit text = "Meditate"/>
          <Habit text = "Meditate"/>
        </View>

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
    paddingBottom: 100,
  },
  taskHeading: {
    fontSize: 24,
  },
  mainHeading: {
    top: 64,
    paddingHorizontal: 20,
    fontSize: 32,
  },
});

export default HomeScreen;
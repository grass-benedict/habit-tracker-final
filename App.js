import * as React from 'react';
import { Text, View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
//import { Button, Overlay } from 'react-native-elements';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { Entypo } from '@expo/vector-icons'; 
import { FontAwesome } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons'; 
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import Habit from './components/Habit'; 

import CalendarScreen from './screens/CalendarScreen';
import StatisticsScreen from './screens/StatisticsScreen';
import NotificationScreen from './screens/NotificationScreen';
import HomeScreen from './screens/HomeScreen';
import AddScreen from './screens/AddScreen';
import NewHabitScreen from './screens/NewHabitScreen';
import NewAddictionScreen from './screens/NewAddictionScreen';


/*
const UsernameOverlay = () => {
  const [visible, setVisible] = useState(false);
  const toggleOverlay = () => {
    setVisible (!visible);
  }

  return (
    <View>
      <Overlay isVisible = {visible} onBackdropPress = {toggleOverlay}></Overlay>
    </View>
  );
}
*/

//Create Navigators for tab and stack navigation
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator(); 


//Display options for the navbar
const screenOptions = {
  tabBarShowLabel: false,
  headerShown: false,
  headerMode: "none",
  tabBarStyle: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    elevation: 0, 
    height: 60,
    borderTopWidth: 0,

  }
}

//Tab Navigator at the bottom of screen
const TabNavigator = () => {

  return (

    <Tab.Navigator screenOptions = {screenOptions}>
        <Tab.Screen name="Home" 
        component={HomeScreen} 
        options = {{
          tabBarIcon: ({focused}) => {
            return (
              <View style = {{alignItems: 'center', justifyContent: 'center'}}>
                <FontAwesome name="home" size={28} color="#686868"/>
              </View>
            )
          }
        }}
        />
        <Tab.Screen name="Calendar" component={CalendarScreen}
        options = {{
          tabBarIcon: ({focused}) => {
            return (
              <View style = {{alignItems: 'center', justifyContent: 'center'}}>
                <Entypo name="calendar" size={24} color="#686868" />
              </View>
            )
          }
        }}
         />

      
       <Tab.Screen name="Add" 
        component={AddScreen}
        options = {{
          tabBarIcon: ({focused}) => {
            return(
              <View style = {{
                top: -30,
                width: 60,
                height: 60,
                borderRadius: 30,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#6750A4',
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 4,
                },
                shadowOpacity: 0.25,
                shadowRadius: 4,
                
                elevation: 5,

              
              }}>
               <Entypo name="plus" size={30} color="white" />
              </View>
            )
          }
        }}
         />
        <Tab.Screen name="Statistics" component={StatisticsScreen}
        options = {{
          tabBarIcon: ({focused}) => {
            return (
              <View style = {{alignItems: 'center', justifyContent: 'center'}}>
              <Ionicons name="stats-chart" size={24} color="#686868" />
              </View>
            )
          }
        }}
       />
        <Tab.Screen name="Notifications" 
        component={NotificationScreen}
        options = {{
          tabBarIcon: ({focused}) => {
            return (
              <View style = {{alignItems: 'center', justifyContent: 'center'}}>
              <Ionicons name="alarm" size={24} color="#686868" />
              </View>
            )
          }
        }} />
      </Tab.Navigator>
  )

}

//Nested Navigation, render the tab navigator inside the stack navigator
//AddScreen and NewHabitScreen are placed on top of the stack
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="TabNavigator"  screenOptions={{ headerShown: false }}>
      <Stack.Screen name="TabNavigator" component={TabNavigator}/>  
      <Stack.Screen name="Add" component={AddScreen} options={{ title: 'Add' }} /> 
      <Stack.Screen name="NewHabit" component={NewHabitScreen}/>   
      <Stack.Screen name="NewAddiction" component={NewAddictionScreen}/>   

      </Stack.Navigator>
      
    </NavigationContainer>
  );
}

//Todo: write a function to input username
const username = "Benedict";

//Stylesheet
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

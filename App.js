import * as React from 'react';
import { Text, View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
//import { Button, Overlay } from 'react-native-elements';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Entypo } from '@expo/vector-icons'; 
import { FontAwesome } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons'; 
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import Habit from './components/Habit'; 

function HomeScreen() {
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

      <View style={styles.completedTasksContainer}>
        <Text style = {styles.taskHeading}>Completed</Text>
      </View>

    </ScrollView>
  
  )
}

function CalendarScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings!</Text>
    </View>
  );
}

function StatisticsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Statistics!</Text>
    </View>
  );
}

function NotificationScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Notifications!</Text>
    </View>
  );
}

function AddScreen() {
  return (
    <View style = {styles.addScreenContainer}>
    <Text style = {styles.addHabitHeading}>I would like to...</Text>
    <View style = {styles.addHabitContainer}>

      <TouchableOpacity style = {styles.addHabitButton}>
        <View style = {styles.addHabitButtonTextContainer}>
        <Text style = {styles.addHabitButtonHeading}>Establish a habit</Text>
        <Text style = {styles.addHabitButtonInfoText}>Track your progress manually every day to build a positive habit.</Text>
        </View>
      </TouchableOpacity>
    </View>

    <View style = {styles.addAddictionContainer}>
      <TouchableOpacity style = {styles.addAddictionButton} onPress = {AddAddictionScreen}>
        <View style = {styles.addHabitButtonTextContainer}>
        <Text style = {styles.addHabitButtonHeading}>Quit an addiction</Text>
        <Text style = {styles.addHabitButtonInfoText}>Your progress will be tracked automatically to grow your streak, unless you reset it.</Text>
        </View>
      </TouchableOpacity>
    </View>
    </View>

  );
}

//Neues Habit hinzufügen
function AddHabitScreen(){
  return (
    <Text>Hello!</Text>
  )
}

//Neue Addiction hinzufügen
function AddAddictionScreen(){

}

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

const Tab = createBottomTabNavigator();
const screenOptions = {
  tabBarShowLabel: false,
  headerShown: false,
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

export default function App() {
  return (
    <NavigationContainer>




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
    </NavigationContainer>
  );
}

//TODO: Funktion zur Eingabe des Namens implementieren
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

import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Alert } from 'react-native';


//Addiction component which calculates and displays the elapsed time
//based on the startDate object passed as a parameter
const Addiction = ({ text, initialStartDate }) => {

    //Destructuring the props object
    //const { text, startDate } = props;

    const [elapsedTime, setElapsedTime] = useState(0);
    const [startDate, setStartDate] = useState(initialStartDate);

    //useEffect hook to calculate the interval, called every 1000ms (1 second)
    useEffect(() => {
        const interval = setInterval(() => {
            const currentTime = Date.now();
            const elapsed = currentTime - startDate.getTime();
            setElapsedTime(elapsed);
        }, 1000);


        return () => clearInterval(interval);
    }, [startDate]);

//Helper function to format the time in a readable format
const formatTime = (milliseconds) => {
  const seconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  // Calculate remaining hours after removing days
  const remainingHours = hours % 24;

  // Pad single digit values with leading zeros
  const formatDigit = (digit) => {
    return digit < 10 ? '0' + digit : digit;
  };

  return `${days > 0 ? days + 'd ' : ''}${formatDigit(remainingHours)}:${formatDigit(minutes % 60)}:${formatDigit(seconds % 60)}`;
};

//onPress handler which resets the timer to 00:00:00
const handleOnPress = () => {
    Alert.alert(
      'Reset Streak',
      'Are you sure you want to reset your streak?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => {
            const newStartDate = new Date(); // Reset the streak with current time as new start date
            setElapsedTime(0); // Reset elapsed time
            setStartDate(newStartDate); // Update startDate
          },
        },
      ],
      { cancelable: false }
    );
}

      //Display component
      return  (
            <TouchableOpacity style={styles.addictionContainer} onPress = {handleOnPress}>
                <Text style={styles.text}>{text}</Text>
                <Text style={styles.timeText}>{formatTime(elapsedTime)}</Text>
            </TouchableOpacity>
        
      );
};


//Stylesheet
const styles = StyleSheet.create({
    addictionContainer: {
        padding: 20,
        marginVertical: 5,
        borderRadius: 10,
        backgroundColor: '#fff',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 2,
        elevation: 2,
        alignItems: 'center',
    },
    text: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 8,
      },
    timeText: {
        fontSize: 18,
        color: '#202020',
      },
});


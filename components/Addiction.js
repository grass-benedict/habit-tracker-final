import React, { useState, useEffect } from 'react';
import { Modal, Text, View, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const DeleteModal = ({ visible, onClose, onDelete }) => {
  return (
<Modal
  animationType="slide"
  transparent={true}
  visible={visible}
  onRequestClose={onClose}
>
  <View style={styles.modalContainer}>
    <View style={styles.modalContent}>
      <Text style={styles.deleteText}>Are you sure you want to delete this addiction?</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={onDelete} style={styles.button}>
          <Text style={styles.buttonText}>Yes</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onClose} style={styles.button}>
          <Text style={styles.buttonText}>No</Text>
        </TouchableOpacity>
      </View>
    </View>
  </View>
</Modal>
  );
};



//Addiction component which calculates and displays the elapsed time
//based on the startDate object passed as a parameter
const Addiction = ({ text, initialStartDate, onPress, onDelete }) => {

    //Destructuring the props object
    //const { text, startDate } = props;


    //Delete function
    const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);

    const handleOpenDeleteModal = () => {
      setDeleteModalVisible(true);
    };
  
    const handleCloseDeleteModal = () => {
      setDeleteModalVisible(false);
    };
  
    const handleDelete = () => {
      onDelete();
      handleCloseDeleteModal();
    };

    const [elapsedTime, setElapsedTime] = useState(0);
    const [startDate, setStartDate] = useState(initialStartDate || new Date());

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
            <TouchableOpacity style={styles.addictionContainer} onPress = {handleOnPress} onLongPress = {handleOpenDeleteModal}>
                <Text style={styles.text}>{text}</Text>
                <Text style={styles.timeText}>{formatTime(elapsedTime)}</Text>

                <DeleteModal
                  visible={isDeleteModalVisible}
                  onClose={handleCloseDeleteModal}
                  onDelete={handleDelete}
                />

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
      modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      },
      modalContent: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
        flexDirection: 'column',
      },
      deleteText: {
        marginBottom: 20,
        fontSize: 18,
      },
      buttonContainer: {
        flexDirection: 'row',
      },
      button: {
        backgroundColor: '#6750A4',
        borderRadius: 8,
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginHorizontal: 5,
      },
      buttonText: {
        color: '#fff',
        fontWeight: 'bold',
      },
});

export default Addiction;

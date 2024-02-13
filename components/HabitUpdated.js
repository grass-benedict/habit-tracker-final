import React, {useState} from 'react'; 
import {Modal, Text, View, TextInput, StyleSheet, TouchableOpacity} from 'react-native';

const HabitPopup = ({ visible, initialValue, onSubmit, onClose }) => {
  const [value, setValue] = useState(initialValue.toString());

  const handleSubmit = () => {
    onSubmit(parseInt(value));
    onClose();
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text>Enter the amount completed:</Text>
          <TextInput
            style={styles.input}
            value={value}
            onChangeText={setValue}
            keyboardType="numeric"
          />
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style = {styles.buttonText}>Ok</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const HabitUpdated = (props) => {
    
  //Destructuring the props object
  const { text, onPress, quantity } = props;

  const [completed, setCompleted] = useState(0);
  const [isPopupVisible, setPopupVisible] = useState(false);

  const handleOpenPopup = () => {
    setPopupVisible(true);
  };

  const handleSubmitPopup = (value) => {
    setCompleted(value);
  };

  const handleClosePopup = () => {
    setPopupVisible(false);
  };

  if (quantity > 1) {
    return (
      <TouchableOpacity style={styles.containerQuantifiable} onPress={handleOpenPopup}>
        <Text style={styles.text}>{text}</Text>
        <Text style={styles.progressText}>{completed}/{quantity} completed</Text>
        <View style={styles.progressBarContainer}>
          <View style={[styles.progressBar, { width: `${(completed / quantity) * 100}%` }]} />
        </View>
        <HabitPopup
          visible={isPopupVisible}
          initialValue={completed}
          onSubmit={handleSubmitPopup}
          onClose={handleClosePopup}
        />
      </TouchableOpacity>
    );
  }

  // If quantity is 1 or less, render the component as is
  return (
    <TouchableOpacity style={styles.containerNonQuantifiable} onPress={onPress}>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};

const commonStyles = {
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
};

const styles = StyleSheet.create({
  containerQuantifiable: {
    ...commonStyles,
    alignItems: 'center',
  },
  containerNonQuantifiable: {
    ...commonStyles,
    alignItems: 'center',
  },
  progressBarContainer: {
    width: '90%',
    height: 10,
    backgroundColor: '#e0e0e0', // Light green background color
    borderRadius: 5, // Rounded corners
    overflow: 'hidden', // Ensure the progress bar doesn't overflow the container
    marginTop: 5,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#503B89',
    borderRadius: 5,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  progressText: {
    fontSize: 16,
    color: 'gray',
    marginTop: 5,
    marginBottom: 5,
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
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
    width: '100%',
  },
  button: {
    backgroundColor: '#503B89',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

  export default HabitUpdated;
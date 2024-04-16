import React, { useState } from 'react';
import { Modal, Text, View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';

//Updated version of the Habit component which supports quantifiable habits
//This Popup is used to adjust the amount achieved
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
//This modal is executed on long press and is used to delete habits
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
      <Text style={styles.deleteText}>Are you sure you want to delete this habit?</Text>
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

//The updated habit component
const HabitUpdated = (props) => {

  //Destructuring the props object
  const { text, onPress, quantity, onLongPress, moveHabit, onDelete } = props;

  //Modal popup to handle deleting the habit on long press
  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);

  //Functions to handle modal visibility and function
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


  //Modal popup to set completion rate
  const [completed, setCompleted] = useState(0);
  const [isPopupVisible, setPopupVisible] = useState(false);


  //Functions to handle completion popup
  const handleOpenPopup = () => {
    setPopupVisible(true);
  };

  const handleSubmitPopup = (value) => {
    setCompleted(value); 
    if (value == quantity || quantity <= 1) {
      moveHabit();
    }
  };

  const handleClosePopup = () => {
    setPopupVisible(false);
  };

  //If quantity is greater than 1, render the component with a linear progress bar
  if (quantity > 1) {
    return (
      <TouchableOpacity style={styles.containerQuantifiable} onPress={handleOpenPopup} onLongPress={handleOpenDeleteModal}>
        <Text style={styles.text}>{text}</Text>
        <Text style={styles.progressText}>{completed}/{quantity} completed</Text>
        <View style={styles.progressBarContainer}>
          <View style={[styles.progressBar, { width: `${(completed / quantity) * 100}%` }]} />
          {/*This function calculates the ratio of progress to desired quantity and renders the progressBar accordingly*/}
        </View>

        <HabitPopup
          visible={isPopupVisible}
          initialValue={completed}
          quantity={quantity}
          onSubmit={handleSubmitPopup}
          onClose={handleClosePopup}
        />

        <DeleteModal
          visible={isDeleteModalVisible}
          onClose={handleCloseDeleteModal}
          onDelete={handleDelete}
        />

      </TouchableOpacity>
    );
  }

  //If quantity is 1 or less, render the component without progress bar
  return (
    <TouchableOpacity style={styles.containerNonQuantifiable} onPress={moveHabit} onLongPress={handleOpenDeleteModal}>
      <Text style={styles.text}>{text}</Text>

      <DeleteModal
        visible={isDeleteModalVisible}
        onClose={handleCloseDeleteModal}
        onDelete={handleDelete}
      />

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

export default HabitUpdated;
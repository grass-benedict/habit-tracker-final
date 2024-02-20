import React, {useState} from 'react'; 
import {Text, View, TouchableOpacity, StyleSheet, TextInput} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const NewAddictionScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const handleAddAddiction = () => {
    navigation.navigate('Home', { addiction: name, date: date.toJSON() });
  };

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setShowTimePicker(true); // Show the time picker after selecting the date
    setDate(currentDate);
  };

  const onChangeTime = (event, selectedTime) => {
    if (selectedTime === undefined) {
      setShowTimePicker(false);
      return; // No time selected, no need to update date
    }
    
    // Create a new Date object for the updated date with the selected time
    const updatedDate = new Date(date.getTime()); // Create a new Date object based on the current date
    updatedDate.setHours(selectedTime.getHours());
    updatedDate.setMinutes(selectedTime.getMinutes());
  
    setShowTimePicker(false);
    setDate(updatedDate);
  };

  const showDatePickerMode = () => {
    setShowDatePicker(true);
  };

  const formatDateToString = (date) => {
    const formattedDate = `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
    const formattedTime = `${date.getHours()}:${date.getMinutes() < 10 ? '0' : ''}${date.getMinutes()}`;
    return `${formattedDate}, ${formattedTime}`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Name</Text>
      <TextInput style={styles.input} placeholder="Enter addiction..." value={name} onChangeText={text => setName(text)} />

      <TouchableOpacity style={styles.addButton} onPress={handleAddAddiction}>
        <Text style={styles.addButtonText}>+ Add</Text>
      </TouchableOpacity>

      <Text style={styles.startDateHeading}>Start date</Text>

      <TouchableOpacity onPress={showDatePickerMode}>
        <Text style={styles.input}>{formatDateToString(date)}</Text>
        {showDatePicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={onChangeDate}
          />
        )}
      </TouchableOpacity>

      {showTimePicker && (
        <DateTimePicker
          value={date}
          mode="time"
          display="default"
          onChange={onChangeTime}
        />
      )}

      <TouchableOpacity onPress={() => navigation.navigate('Home')}>
        <Text style={styles.cancelButton}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingLeft: 30,
        paddingRight: 30,
        paddingTop: 100,
        backgroundColor: '#f0f0f0',
        //alignItems: 'center',
        //justifyContent: 'center'
      },
    heading: {
        fontSize: 24,
        paddingBottom: 10,
    }, 
    startDateHeading: {
        fontSize: 24, 
        paddingTop: 20,
        paddingBottom: 10,
    },
    input: {
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: "darkgrey",
        borderRadius: 5,
        padding: 5,
    },
    cancelButton:
    {
        marginTop: 20,
    },
    addButton:
    {
      backgroundColor: '#6750A4',
      borderRadius: 50,
      alignItems: 'center',
      paddingTop: 25,
      paddingBottom: 25,
      position: 'absolute',
      bottom: 25,
      left: 0,
      right: 0,
      marginLeft: 25,
      marginRight: 25,
    },
    addButtonText: {
      color: 'white',
      fontSize: 25,
      fontWeight: 'bold',
    },
    checkBox: {
      marginRight: 10,
    },
    checkBoxSection: {
      marginVertical: 10,
      flexDirection: 'row',
      alignItems: 'center',
    },
    checkBoxText: {
      fontSize: 15,
    }


})

export default NewAddictionScreen;
import React, {useState} from 'react'; 
import {Text, View, TouchableOpacity, StyleSheet, TextInput} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const NewAddictionScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const handleAddAddiction = () => {
    const combinedDateTime = new Date(date);
    combinedDateTime.setHours(time.getHours());
    combinedDateTime.setMinutes(time.getMinutes());
    navigation.navigate('Home', { addiction: name, date: combinedDateTime.toJSON() });
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
      return; // No time selected, no need to update time
    }
    
    setShowTimePicker(false);
    setTime(selectedTime);
  };

  const showDatePickerMode = () => {
    setShowDatePicker(true);
  };

  const formatDateToString = (datetime) => {
    const formattedDate = `${datetime.getDate()}.${datetime.getMonth() + 1}.${datetime.getFullYear()}`;
    const formattedTime = `${datetime.getHours()}:${datetime.getMinutes() < 10 ? '0' : ''}${datetime.getMinutes()}`;
    return `${formattedDate}, ${formattedTime}`;
  };

  return (
    <View style={styles.container}>

      <View style = {styles.headerContainer}>
      <TouchableOpacity onPress={() => navigation.navigate('Home')}>
        <Text style={styles.cancelButton}>&lt;</Text>
      </TouchableOpacity>

      <Text style = {styles.mainHeading}>Quit an addiction</Text>
      </View>

      <Text style={styles.heading}>Name</Text>
      <TextInput style={styles.input} placeholder="Enter addiction..." value={name} onChangeText={text => setName(text)} />

      <TouchableOpacity style={styles.addButton} onPress={handleAddAddiction}>
        <Text style={styles.addButtonText}>+ Add</Text>
      </TouchableOpacity>

      <Text style={styles.startDateHeading}>Start date</Text>

      <TouchableOpacity onPress={showDatePickerMode}>
        <Text style={styles.dateInput}>{formatDateToString(date)}</Text>
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
          value={time}
          mode="time"
          display="default"
          onChange={onChangeTime}
        />
      )}


    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingLeft: 30,
        paddingRight: 30,
        paddingTop: 50,
        backgroundColor: '#f0f0f0',
        //alignItems: 'center',
        //justifyContent: 'center'
      },
    headerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 20,
    },
    mainHeading: {
      fontWeight: 'bold',
      fontSize: 24,
      flex: 1,
      textAlign: 'center',
    },
    cancelButton: {
      color: '#00A3FE',
      fontSize: 24,
    },

    heading: {
        fontSize: 20,
        paddingBottom: 10,
    }, 
    startDateHeading: {
        fontSize: 20, 
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
    dateInput: {
      borderStyle: "solid",
      borderWidth: 1,
      borderColor: "darkgrey",
      borderRadius: 5,
      paddingVertical: 10,
      paddingLeft: 5,
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
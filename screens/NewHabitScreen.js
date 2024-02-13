import React, {useState} from 'react'; 
import {Text, View, TouchableOpacity, StyleSheet, TextInput} from 'react-native';
import CheckBox from 'expo-checkbox';

const NewHabitScreen = ( { navigation } ) => {

    const [name, setName] = useState();
    const [isChecked, setChecked] = useState(false);

    const handleAddHabit = () => {
        navigation.navigate('Home', {habit: name})
    }



    return (
      <View style={styles.container}>
        <Text style = {styles.heading}>Name</Text>
        <TextInput style = {styles.input} placeholder = "Enter habit name..." value = {name} onChangeText={text => setName(text)}></TextInput>

        <TouchableOpacity style = {styles.addButton} onPress = {() => handleAddHabit()}>
        <Text style = {styles.addButtonText}>+ Add</Text>
        </TouchableOpacity>

        <View style = {styles.checkBoxSection}>
        <CheckBox style = {styles.checkBox} value = {isChecked} onValueChange = {setChecked} color={isChecked ? '#6750A4' : undefined}></CheckBox>
        <Text style = {styles.checkBoxText}>Track quantity</Text>
        </View>

        <TouchableOpacity onPress = {() => navigation.navigate('Home')}>
        <Text style = {styles.cancelButton}>Cancel</Text>
        </TouchableOpacity>
      </View>
    );
  }

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
    input: {
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: "darkgrey",
        borderRadius: 5,
        padding: 5,
    },
    cancelButton:
    {
        marginTop: 10,
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
      marginTop: 10,
      flexDirection: 'row',
      alignItems: 'center',
    },
    checkBoxText: {
      fontSize: 15,
    }


})

export default NewHabitScreen;
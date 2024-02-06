import React, {useState} from 'react'; 
import {Text, View, TouchableOpacity, StyleSheet, TextInput} from 'react-native';

const NewHabitScreen = ( { navigation } ) => {

    const [name, setName] = useState();


    return (
      <View style={styles.container}>
        <Text style = {styles.heading}>Name</Text>
        <TextInput style = {styles.input} placeholder = "Enter habit name..."></TextInput>
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
    }

})

export default NewHabitScreen;
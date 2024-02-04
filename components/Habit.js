import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

const Habit = (props) => {
    return (
        <View style = {styles.itemContainer}>
            <TouchableOpacity style = {styles.itemBox}>
                <Text style = {styles.itemText}>{props.text}</Text>
            </TouchableOpacity>

        </View>
    )

}

const styles = StyleSheet.create({
    itemContainer: {
        padding: 30,
        marginVertical: 10,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 2,
        
        elevation: 2,
    },
    itemBox: {},
    itemText: {
        fontSize: 24,
        fontWeight: 'bold',
    },

});


export default Habit;
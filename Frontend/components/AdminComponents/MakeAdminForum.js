import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, SafeAreaView, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';

const MakeAdminForum = () => {
  const [username, setUsername] = useState('');

  const makeAdmin = async () => {
    if (!username) {
      Alert.alert('Error', 'Please enter a username');
      return;
    }

    try {
      const response = await axios.put('https://boss-turkey-happily.ngrok-free.app/makeAdmin', {
        username: username, // Only send the username in the request
      });

      // Check if the response indicates a successful update
      if (response.data) {
        Alert.alert('Success', 'User has been made an admin successfully.');
      } else {
        Alert.alert('Error', 'Unable to make the user an admin. Please try again.');
      }
    } catch (error) {
      // Handle errors such as network issues or server errors
      console.error('Error making user admin:', error);
      Alert.alert('Error', 'An error occurred while making the user an admin.');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Admin Forum</Text>
        <Text style={styles.label}>Enter Username:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter username"
          placeholderTextColor="#888"
          value={username}
          onChangeText={setUsername}
        />
        <TouchableOpacity style={styles.button} onPress={makeAdmin}>
          <Text style={styles.buttonText}>Make Admin</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Poppins-Bold',
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
    marginBottom: 10,
  },
  input: {
    width: '80%',
    height: 44,
    backgroundColor: '#ebecf4',
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    fontFamily: 'Poppins-Normal',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#6200EE',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
  },
});

export default MakeAdminForum;

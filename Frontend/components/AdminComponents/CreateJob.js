import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import axios from 'axios';

export default function CreateJob() {
  const [title, setTitle] = useState(''); // Changed to title
  const [location, setLocation] = useState('');
  const [type, setType] = useState(''); // Added type
  const [level, setLevel] = useState(''); // Added level
  const [salary, setSalary] = useState(''); // Changed to salary

  const handleSubmit = async () => {
    try {
      const response = await axios.post('https://boss-turkey-happily.ngrok-free.app/jobs', {
        title, // Updated attribute name
        location,
        type, // Updated attribute name
        level, // Updated attribute name
        salary, // Updated attribute name
      });
      console.log('Job form submitted', response.data);
      resetForm();
    } catch (error) {
      console.error('Error submitting job form', error);
    }
  };

  const resetForm = () => {
    setTitle('');
    setLocation('');
    setType('');
    setLevel('');
    setSalary('');
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.label}>Job Title:</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
      />
      <Text style={styles.label}>Location:</Text>
      <TextInput
        style={styles.input}
        value={location}
        onChangeText={setLocation}
      />
      <Text style={styles.label}>Type:</Text>
      <TextInput
        style={styles.input}
        value={type} // Updated to use type
        onChangeText={setType}
      />
      <Text style={styles.label}>Level:</Text>
      <TextInput
        style={styles.input}
        value={level} // Updated to use level
        onChangeText={setLevel}
      />
      <Text style={styles.label}>Salary Range:</Text>
      <TextInput
        style={styles.input}
        value={salary} // Updated to use salary
        onChangeText={setSalary}
        keyboardType="numeric"
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={handleSubmit}
        >
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: '#B2B2B2',
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 8,
    backgroundColor: '#F6F6F6',
  },
  buttonContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 50,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 15,
    fontFamily: 'Poppins-Bold',
  },
});

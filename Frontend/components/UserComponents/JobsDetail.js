import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';

export default function JobDetail({ route }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [aadhaar, setAadhaar] = useState('');

  const handleSubmit = async () => {
    try {
      const applicationData = {
        name,
        email,
        phone,
        address,
        aadhaar,
        jobtitle: route.params.jobTitle, // Ensure this is set correctly
        applicationdate: new Date().toISOString().split('T')[0],
      };
  
      console.log('Application Data:', applicationData); // Log the data
  
      const response = await fetch('https://boss-turkey-happily.ngrok-free.app/api/jobapplicants', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(applicationData),
      });
  
      const text = await response.text();
      console.log('Raw response:', text);
  
      if (response.ok) {
        const jsonResponse = JSON.parse(text);
        Alert.alert('Success', 'Application submitted successfully!');
        console.log(jsonResponse);
      } else {
        const errorResponse = JSON.parse(text);
        Alert.alert('Error', errorResponse.error || 'Failed to submit application.');
        console.error('Error response:', errorResponse);
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong. Please try again.');
      console.error('Fetch error:', error);
    }
  };
  

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.label}>Name:</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
      />
      <Text style={styles.label}>Email:</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
      />
      <Text style={styles.label}>Phone:</Text>
      <TextInput
        style={styles.input}
        value={phone}
        onChangeText={setPhone}
      />
      <Text style={styles.label}>Address:</Text>
      <TextInput
        style={styles.input}
        value={address}
        onChangeText={setAddress}
      />
      <Text style={styles.label}>Aadhaar No:</Text>
      <TextInput
        style={styles.input}
        value={aadhaar}
        onChangeText={setAadhaar}
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
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  buttonContainer: {
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#e81a07',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
  },
});

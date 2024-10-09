import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';

export default function AddLoanForm() {
  const [title, setTitle] = useState(''); // Updated variable name to title
  const [description, setDescription] = useState('');
  const [interest, setInterest] = useState(''); // Updated variable name to interest
  const [amount, setAmount] = useState('');

  const handleSubmit = async () => {
    try {
      const response = await axios.post('https://boss-turkey-happily.ngrok-free.app/loans', {
        title,            // Use title instead of loanName
        description,
        interest: `${interest}%`, // Append % sign to interest
        amount: Number(amount), // Convert amount to a number
      });
      Alert.alert('Success', response.data.message);
      // Clear the form fields
      setTitle('');         // Reset title
      setDescription('');   // Reset description
      setInterest('');      // Reset interest
      setAmount('');        // Reset amount
    } catch (error) {
      console.error('Error submitting loan:', error);
      Alert.alert('Error', 'Failed to submit loan. Please try again.');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.label}>Loan Title:</Text>
      <TextInput
        style={styles.input}
        value={title}        // Update to use title
        onChangeText={setTitle} // Update to use setTitle
      />
      <Text style={styles.label}>Description:</Text>
      <TextInput
        style={[styles.input, styles.descriptionInput]}
        value={description}
        onChangeText={setDescription}
        multiline={true}
        numberOfLines={4}
      />
      <Text style={styles.label}>Interest Rate (%):</Text>
      <TextInput
        style={styles.input}
        value={interest}     // Update to use interest
        onChangeText={setInterest}
        keyboardType="numeric"
      />
      <Text style={styles.label}>Amount:</Text>
      <TextInput
        style={styles.input}
        value={amount}
        onChangeText={setAmount}
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
  descriptionInput: {
    height: 100,
    textAlignVertical: 'top',
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

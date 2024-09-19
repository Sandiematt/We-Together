import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native';

const AddEventForm = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [venue, setVenue] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = () => {
    if (title === '' || content === '' || venue === '' || date === '') {
      Alert.alert('Error', 'All fields are required.');
    } else {
      Alert.alert('Success', 'Event added successfully!');
      navigation.goBack();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Event Details</Text>

      <Text style={styles.label}>Event Title</Text>
      <TextInput
        style={styles.input}
        placeholder="Pottery Class"
        value={title}
        onChangeText={setTitle}
      />

      <Text style={styles.label}>Event Content</Text>
      <TextInput
        style={styles.textArea}
        placeholder="Enter event content"
        value={content}
        onChangeText={setContent}
        multiline={true}
        numberOfLines={4} 
      />

      <Text style={styles.label}>Event Venue</Text>
      <TextInput
        style={styles.input}
        placeholder="Kochi"
        value={venue}
        onChangeText={setVenue}
      />

      <Text style={styles.label}>Event Date </Text>
      <TextInput
        style={styles.input}
        placeholder="(YYYY-MM-DD)"
        value={date}
        onChangeText={setDate}
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 14,
    color: '#888',
    marginBottom: 5,
    marginLeft: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 8,
    fontSize: 16,
    marginBottom: 20,
    backgroundColor: '#f9f9f9',
  },
  textArea: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 8,
    fontSize: 16,
    height: 100,  // You can adjust the height of the text area
    textAlignVertical: 'top',  // Ensures the text starts at the top
    backgroundColor: '#f9f9f9',
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AddEventForm;

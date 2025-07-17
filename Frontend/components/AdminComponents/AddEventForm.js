import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, TouchableOpacity, ScrollView } from 'react-native';

const AddEventForm = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [venue, setVenue] = useState('');
  const [place, setPlace] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  const handleSubmit = async () => {
    if (title === '' || description === '' || venue === '' || place === '' || date === '' || time === '') {
      Alert.alert('Error', 'All fields are required.');
    } else {
      try {
        const eventData = {
          title,
          description,
          venue,
          place,
          date,
          time,
        };

        const response = await fetch('https://raccoon-summary-bluejay.ngrok-free.app/events', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(eventData),
        });

        if (!response.ok) {
          throw new Error('Failed to add event');
        }

        const result = await response.json();
        Alert.alert('Success', 'Event added successfully!');
        navigation.goBack();
      } catch (error) {
        console.error('Error adding event:', error);
        Alert.alert('Error', 'Could not add event. Please try again.');
      }
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Event Details</Text>

      <Text style={styles.label}>Event Title</Text>
      <TextInput
        style={styles.input}
        placeholder="Pottery Class"
        value={title}
        onChangeText={setTitle}
      />

      <Text style={styles.label}>Event Description</Text>
      <TextInput
        style={styles.textArea}
        placeholder="Enter event description"
        value={description}
        onChangeText={setDescription}
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

      <Text style={styles.label}>Event Place</Text>
      <TextInput
        style={styles.input}
        placeholder="Kerala"
        value={place}
        onChangeText={setPlace}
      />

      <Text style={styles.label}>Event Date</Text>
      <TextInput
        style={styles.input}
        placeholder="(YYYY-MM-DD)"
        value={date}
        onChangeText={setDate}
      />

      <Text style={styles.label}>Event Time</Text>
      <TextInput
        style={styles.input}
        placeholder="HH:MM"
        value={time}
        onChangeText={setTime}
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit Event</Text>
      </TouchableOpacity>
    </ScrollView>
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
    height: 100, // You can adjust the height of the text area
    textAlignVertical: 'top', // Ensures the text starts at the top
    backgroundColor: '#f9f9f9',
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AddEventForm;

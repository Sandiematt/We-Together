import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

export default function EventDetail({ route }) {
  const { event } = route.params;
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [contact, setContact] = useState('');
  const [selectedGender, setSelectedGender] = useState('');

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={setName}
        value={name}
        placeholder='Name'
      />
      <TextInput
        style={styles.input}
        onChangeText={setEmail}
        value={email}
        placeholder='Email'
      />
      <Picker
        selectedValue={selectedGender}
        onValueChange={(itemValue) => setSelectedGender(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Select Gender" value="" />
        <Picker.Item label="Male" value="Male" />
        <Picker.Item label="Female" value="Female" />
      </Picker>
      <TextInput
        style={styles.input}
        onChangeText={setAge}
        value={age}
        placeholder='Age'
      />
      <TextInput
        style={styles.input}
        onChangeText={setContact}
        value={contact}
        placeholder='Mobile No'
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 20,
  },
});

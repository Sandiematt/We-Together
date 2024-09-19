import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

export default function CreateJob() {
  const [jobTitle, setJobTitle] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [skillsRequired, setSkillsRequired] = useState('');
  const [salaryRange, setSalaryRange] = useState('');

  const handleSubmit = () => { 
    // Add your submit logic here
    console.log('Job form submitted');
    console.log({
      jobTitle,
      companyName,
      jobDescription,
      skillsRequired,
      salaryRange,
    });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.label}>Job Title:</Text>
      <TextInput
        style={styles.input}
        value={jobTitle}
        onChangeText={setJobTitle}
      />
      <Text style={styles.label}>Company Name:</Text>
      <TextInput
        style={styles.input}
        value={companyName}
        onChangeText={setCompanyName}
      />
      <Text style={styles.label}>Job Description:</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        value={jobDescription}
        onChangeText={setJobDescription}
        multiline={true}
        numberOfLines={5}
      />
      <Text style={styles.label}>Skills Required:</Text>
      <TextInput
        style={styles.input}
        value={skillsRequired}
        onChangeText={setSkillsRequired}
      />
      <Text style={styles.label}>Salary Range:</Text>
      <TextInput
        style={styles.input}
        value={salaryRange}
        onChangeText={setSalaryRange}
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
  textArea: {
    height: 100,
    textAlignVertical: 'top', // Ensure the text starts at the top of the TextInput
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

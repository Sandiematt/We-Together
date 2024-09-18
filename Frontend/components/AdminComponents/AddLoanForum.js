import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

export default function AddLoanForm() {
  const [loanAmount, setLoanAmount] = useState('');
  const [loanTerm, setLoanTerm] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [monthlyIncome, setMonthlyIncome] = useState('');
  const [employmentStatus, setEmploymentStatus] = useState('');

  const handleSubmit = () => {
    // Add your submit logic here
    console.log('Loan form submitted');
    console.log({
      loanAmount,
      loanTerm,
      interestRate,
      monthlyIncome,
      employmentStatus,
    });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.label}>Loan Amount:</Text>
      <TextInput
        style={styles.input}
        value={loanAmount}
        onChangeText={setLoanAmount}
        keyboardType="numeric"
      />
      <Text style={styles.label}>Loan Term (years):</Text>
      <TextInput
        style={styles.input}
        value={loanTerm}
        onChangeText={setLoanTerm}
        keyboardType="numeric"
      />
      <Text style={styles.label}>Interest Rate (%):</Text>
      <TextInput
        style={styles.input}
        value={interestRate}
        onChangeText={setInterestRate}
        keyboardType="numeric"
      />
      <Text style={styles.label}>Monthly Income:</Text>
      <TextInput
        style={styles.input}
        value={monthlyIncome}
        onChangeText={setMonthlyIncome}
        keyboardType="numeric"
      />
      <Text style={styles.label}>Employment Status:</Text>
      <TextInput
        style={styles.input}
        value={employmentStatus}
        onChangeText={setEmploymentStatus}
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

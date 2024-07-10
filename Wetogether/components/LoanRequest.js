import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const loanTypes = [
  { id: 1, title: 'Personal Loan', amount: '$5,000 - $50,000' },
  { id: 2, title: 'Home Loan', amount: '$100,000 - $500,000' },
];

export default function LoanRequest() {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {loanTypes.map((loan) => (
          <TouchableOpacity key={loan.id} style={styles.card}>
            <View style={styles.cardContent}>
              <View style={styles.textContainer}>
                <Text style={styles.cardTitle}>{loan.title}</Text>
                <Text style={styles.cardAmount}>{loan.amount}</Text>
              </View>
              <TouchableOpacity style={styles.arrowButton}>
                <AntDesign name="arrowright" size={24} color="#007AFF" />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: 20,
  },
  scrollContainer: {
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 50,
    marginBottom: 15,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textContainer: {
    

  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  cardAmount: {
    fontSize: 16,
    color: '#666',
  },
  arrowButton: {
    padding: 10,
  },
});
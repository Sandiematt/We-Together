import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; // You can use any icon library

const LoanAdminDetail = () => {
  // Example user data who have taken loans
  const users = [
    { id: 1, name: 'anjitha', loanAmount: '$500.00', loanDate: '2023-08-10' },
    { id: 2, name: 'Hai', loanAmount: '$500.00', loanDate: '2023-08-17' },
    { id: 3, name: 'eldho', loanAmount: '$417.00', loanDate: '2024-02-11' }
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
     
      {/* Total Amount and Borrowers */}
      <View style={styles.overview}>
        <View style={styles.overviewCard}>
          <Text style={styles.cardTitle}>Total Amount</Text>
          <Text style={styles.amount}>$7000</Text>
        </View>
        <View style={styles.overviewCard}>
          <Text style={styles.cardTitle}>Borrowers</Text>
          <Text style={styles.borrowers}>3</Text>
        </View>
      </View>

      {/* Loan Users List */}
      <View>
        {users.map((user) => (
          <View key={user.id} style={styles.loanItem}>
            <Text style={styles.loanIndex}>{user.id}.</Text>
            <View style={styles.loanDetails}>
              <Text style={styles.loanName}>{user.name}</Text>
              <Text style={styles.loanAmount}>{user.loanAmount}</Text>
              <Text style={styles.loanDate}>{user.loanDate}</Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
    elevation: 2, // For Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 }
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 20
  },
  overview: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20
  },
  overviewCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginHorizontal: 10,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 }
  },
  cardTitle: {
    fontSize: 16,
    color: '#333'
  },
  amount: {
    fontSize: 24,
    color: 'green',
    fontWeight: 'bold',
    marginTop: 10
  },
  borrowers: {
    fontSize: 24,
    color: 'green',
    fontWeight: 'bold',
    marginTop: 10
  },
  loanItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    marginVertical: 5,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 }
  },
  loanIndex: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10
  },
  loanDetails: {
    flex: 1
  },
  loanName: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  loanAmount: {
    color: 'green',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5
  },
  loanDate: {
    color: 'red',
    marginTop: 5
  }
});

export default LoanAdminDetail;

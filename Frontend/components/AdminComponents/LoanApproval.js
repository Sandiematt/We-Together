import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';

const LoanApprovalDetail = () => {
  // Example users data for loan applications
  const initialUsers = [
    { id: 1, name: 'Alice', email: 'alice@example.com', loanAmount: '$5000', status: 'Pending' },
    { id: 2, name: 'Bob', email: 'bob@example.com', loanAmount: '$3000', status: 'Pending' },
    { id: 3, name: 'Charlie', email: 'charlie@example.com', loanAmount: '$7000', status: 'Pending' }
  ];

  const [users, setUsers] = useState(initialUsers);

  // Function to approve or reject loan status
  const updateStatus = (id, newStatus) => {
    setUsers(users.map(user =>
      user.id === id ? { ...user, status: newStatus } : user
    ));
  };

  // Function to handle the submit button press
  const handleSubmit = () => {
    // Here you can handle the submit action, such as sending the data to a server.
    // For now, we will just show an alert with the updated user statuses.
    Alert.alert('Loan Status Updated', 'The loan statuses have been successfully updated.');
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Loan Applications</Text>
      </View>

      {/* Total Users and Status Overview */}
      <View style={styles.overview}>
        <View style={styles.circle}>
          <Text style={styles.circleText}>{users.length}</Text>
          <Text style={styles.circleLabel}>Total</Text>
        </View>
        <View style={styles.overviewCard}>
          <Text style={styles.cardTitle}>Approved</Text>
          <Text style={styles.participantsCount}>{users.filter(user => user.status === 'Approved').length}</Text>
        </View>
        <View style={styles.overviewCard}>
          <Text style={styles.cardTitle}>Rejected</Text>
          <Text style={styles.participantsCount}>{users.filter(user => user.status === 'Rejected').length}</Text>
        </View>
      </View>

      {/* Users List */}
      <View>
        {users.map((user) => (
          <View key={user.id} style={styles.userItem}>
            <View style={styles.userDetails}>
              <Text style={styles.userName}>{user.name}</Text>
              <Text style={styles.userEmail}>{user.email}</Text>
              <Text style={styles.loanAmount}>Loan Amount: {user.loanAmount}</Text>
            </View>
            <View style={styles.actionButtons}>
              <TouchableOpacity
                style={[styles.statusButton, styles.approveButton]}
                onPress={() => updateStatus(user.id, 'Approved')}
              >
                <Text style={styles.buttonText}>Approve</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.statusButton, styles.rejectButton]}
                onPress={() => updateStatus(user.id, 'Rejected')}
              >
                <Text style={styles.buttonText}>Reject</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>

      {/* Submit Button */}
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Submit Decisions</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 2
  },
  header: {
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: 15
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  overview: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20
  },
  circle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#d4f5d6',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 }
  },
  circleText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  circleLabel: {
    fontSize: 16,
    color: '#888',
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
  participantsCount: {
    fontSize: 24,
    color: 'green',
    fontWeight: 'bold',
    marginTop: 10
  },
  userItem: {
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
  userDetails: {
    flex: 1
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  userEmail: {
    color: '#666',
    fontSize: 14,
    marginTop: 5
  },
  loanAmount: {
    fontSize: 14,
    color: '#444',
    marginTop: 5
  },
  actionButtons: {
    flexDirection: 'row'
  },
  statusButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginLeft: 10,
  },
  approveButton: {
    backgroundColor: 'green'
  },
  rejectButton: {
    backgroundColor: 'red'
  },
  buttonText: {
    fontSize: 14,
    color: '#fff',
    fontWeight: 'bold'
  },
  submitButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 10,
    marginVertical: 20,
    alignItems: 'center',
    elevation: 2,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
  }
});

export default LoanApprovalDetail;

import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';

const EventAdminDetail = () => {
  // Example participants data for events
  const initialParticipants = [
    { id: 1, name: 'Anjitha', email: 'anjitha@example.com', status: 'Present' },
    { id: 2, name: 'Hai', email: 'hai@example.com', status: 'Absent' },
    { id: 3, name: 'Eldho', email: 'eldho@example.com', status: 'Present' }
  ];

  const [participants, setParticipants] = useState(initialParticipants);

  // Function to toggle status between 'Present' and 'Absent'
  const toggleStatus = (id) => {
    setParticipants(participants.map(p =>
      p.id === id ? { ...p, status: p.status === 'Present' ? 'Absent' : 'Present' } : p
    ));
  };

  const handleSubmit = () => {
    Alert.alert('Attendance Submitted', 'The attendance has been successfully saved.');
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Event Participants</Text>
      </View>

      {/* Total Participants and Status Overview */}
      <View style={styles.overview}>
        <View style={styles.circle}>
          <Text style={styles.circleText}>{participants.length}</Text>
          <Text style={styles.circleLabel}>Total</Text>
        </View>
        <View style={styles.overviewCard}>
          <Text style={styles.cardTitle}>Present</Text>
          <Text style={styles.participantsCount}>{participants.filter(p => p.status === 'Present').length}</Text>
        </View>
        <View style={styles.overviewCard}>
          <Text style={styles.cardTitle}>Absent</Text>
          <Text style={styles.participantsCount}>{participants.filter(p => p.status === 'Absent').length}</Text>
        </View>
      </View>

      {/* Participants List */}
      <View>
        {participants.map((participant) => (
          <View key={participant.id} style={styles.participantItem}>
            <View style={styles.participantDetails}>
              <Text style={styles.participantName}>{participant.name}</Text>
              <Text style={styles.participantEmail}>{participant.email}</Text>
            </View>
            <TouchableOpacity 
              style={[styles.statusBox, participant.status === 'Present' ? styles.presentBox : styles.absentBox]} 
              onPress={() => toggleStatus(participant.id)}
            >
              <Text style={styles.participantStatus}>{participant.status}</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>

      {/* Submit Button */}
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Submit Attendance</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 2
  },
 header:{
    backgroundColor: '#fff',
    alignItems:'center',
    padding:15
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
    elevation: 3, // For Android shadow
    shadowColor: '#000', // iOS shadow
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
  participantItem: {
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
  participantDetails: {
    flex: 1
  },
  participantName: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  participantEmail: {
    color: '#666',
    fontSize: 14,
    marginTop: 5
  },
  participantStatus: {
    fontSize: 14,
    color: '#fff',
    fontWeight: 'bold'
  },
  statusBox: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginLeft: 10,
  },
  presentBox: {
    backgroundColor: 'green'
  },
  absentBox: {
    backgroundColor: 'red'
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

export default EventAdminDetail;
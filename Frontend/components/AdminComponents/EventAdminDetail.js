import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';

const EventAdminDetail = ({ route }) => {
  const { eventTitle } = route.params; // Get event title from navigation parameters
  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    const fetchParticipants = async () => {
      try {
        const response = await fetch(`https://boss-turkey-happily.ngrok-free.app/attendees?eventTitle=${encodeURIComponent(eventTitle)}`); // Replace with your backend URL
        
        // Check if the response is OK (status code 200-299)
        if (!response.ok) {
          throw new Error(`Server Error: ${response.status}`);
        }
        
        const data = await response.json();
        setParticipants(data);
      } catch (error) {
        console.error('Error fetching participants:', error);
        // Log the entire response for debugging
        const text = await response.text();
        console.error('Response text:', text);
      }
    };
    
    fetchParticipants();
  }, [eventTitle]);

  // Function to toggle status between 'Present' and 'Absent' using participant's name
  const toggleStatus = async (name, newStatus) => {
    setParticipants((prevParticipants) =>
      prevParticipants.map((participant) =>
        participant.name === name
          ? { ...participant, status: newStatus } // Update status locally
          : participant
      )
    );

    // Update the backend
    try {
      const response = await fetch('https://boss-turkey-happily.ngrok-free.app/updateAttendance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, status: newStatus }), // Send name instead of _id
      });

      if (!response.ok) {
        const errorData = await response.json();
        Alert.alert('Error', errorData.message || 'Failed to update attendance status.');
      } else {
        Alert.alert('Success', 'Attendance status updated successfully.');
      }
    } catch (error) {
      console.error('Error updating attendance status:', error);
      Alert.alert('Error', 'Failed to update attendance status.');
    }
  };

  return (
    <ScrollView style={styles.container}>
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
          <View key={participant.name} style={styles.participantItem}>
            <View style={styles.participantDetails}>
              <Text style={styles.participantName}>{participant.name}</Text>
              <Text style={styles.participantEmail}>{participant.email}</Text>
            </View>

            {/* Button for Present */}
            <TouchableOpacity
              style={[styles.toggleButton, styles.presentButton, participant.status === 'Present' ? styles.selectedButton : null]}
              onPress={() => toggleStatus(participant.name, 'Present')}
            >
              <Text style={styles.toggleButtonText}>Present</Text>
            </TouchableOpacity>

            {/* Button for Absent */}
            <TouchableOpacity
              style={[styles.toggleButton, styles.absentButton, participant.status === 'Absent' ? styles.selectedButton : null]}
              onPress={() => toggleStatus(participant.name, 'Absent')}
            >
              <Text style={styles.toggleButtonText}>Absent</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 2,
  },
  overview: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
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
    shadowOffset: { width: 0, height: 2 },
  },
  circleText: {
    fontSize: 24,
    fontFamily: 'Poppins-Bold', // Use your chosen font family
    fontWeight: 'bold',
  },
  circleLabel: {
    fontSize: 16,
    color: '#888',
    fontFamily: 'Poppins-Bold', // Use your chosen font family
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
    shadowOffset: { width: 0, height: 2 },
  },
  cardTitle: {
    fontSize: 16,
    color: '#333',
    fontFamily: 'Poppins-Bold', // Use your chosen font family
  },
  participantsCount: {
    fontSize: 24,
    color: 'green',
    fontWeight: 'bold',
    marginTop: 10,
    fontFamily: 'Poppins-Bold', // Use your chosen font family
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
    shadowOffset: { width: 0, height: 2 },
  },
  participantDetails: {
    flex: 1,
  },
  participantName: {
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Poppins-Bold', // Use your chosen font family
  },
  participantEmail: {
    color: '#666',
    fontSize: 14,
    marginTop: 5,
    fontFamily: 'Poppins-Bold', // Use your chosen font family
  },
  toggleButton: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 20,
    marginLeft: 10,
  },
  presentButton: {
    backgroundColor: 'green',
  },
  absentButton: {
    backgroundColor: 'red',
  },
  toggleButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontFamily: 'Poppins-Bold', // Use your chosen font family
  },
});

export default EventAdminDetail;

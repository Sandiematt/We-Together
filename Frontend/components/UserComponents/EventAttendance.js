import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator, TextInput, Modal, Button } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function EventAttendance() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [name, setName] = useState('');
  const [email, setemail] = useState(''); // Using email as email
  const [error, setError] = useState('');

  // Fetch events from the backend
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('https://boss-turkey-happily.ngrok-free.app/events');
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

//submit attend
  const handleSubmit = async () => {
  if (!name || !email) {
    setError('Please fill in all details.');
    return;
  }

  try {
    const response = await fetch('https://boss-turkey-happily.ngrok-free.app/attend', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        email: email,
        eventTitle: selectedEvent.title, // Use the event title instead of ID
      }),
    });

    const data = await response.json();

    // Check for the response status and/or the exact message
    if (response.status === 201 && data.message === "User registered successfully for event") {
      setModalVisible(false);
      setName('');
      setemail('');
      setError('');
    } else {
      setError('Failed to register.');
    }
  } catch (err) {
    console.error('Post error:', err);
    setError('Post failed. Please try again.');
  }
};

  
  

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#007BFF" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {events.map((event, index) => (
        <View style={styles.card} key={event._id}>
          <Image
            style={styles.cardImage}
            source={{ uri: event.image || `https://picsum.photos/700?random=${index}` }}
          />
          <View style={styles.cardContent}>
            <Text style={styles.contentTitle}>{event.title}</Text>
            <Text style={styles.contentText}>{event.description}</Text>
            <View style={styles.detailsContainer}>
              <View>
                <Text style={styles.contentDetails}>
                  <Icon name="map-marker" size={14} color="#999" /> Venue: {event.venue}, {event.place}
                </Text>
                <Text style={styles.contentDetails}>
                  <Icon name="calendar" size={14} color="#999" /> Date: {new Date(event.date).toLocaleDateString()} at {event.time}
                </Text>
              </View>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  setSelectedEvent(event);
                  setModalVisible(true);
                }}
              >
                <Text style={styles.buttonText}>Attend</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      ))}

      {/* Modal for attendance */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Enter Your Details</Text>
            <TextInput
              style={styles.input}
              placeholder="Name"
              value={name}
              onChangeText={setName}
            />
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              onChangeText={setemail}
              keyboardType="email-address"
            />
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
            <View style={styles.modalButtons}>
              <Button title="Submit" onPress={handleSubmit} />
              <Button title="Cancel" color="red" onPress={() => setModalVisible(false)} />
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f5f5f5',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    marginVertical: 10,
    overflow: 'hidden',
  },
  cardImage: {
    width: '100%',
    height: 180,
    backgroundColor: '#ccc',
  },
  cardContent: {
    padding: 15,
  },
  contentTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  contentText: {
    fontSize: 14,
    color: '#666',
    marginVertical: 10,
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  contentDetails: {
    fontSize: 12,
    color: '#999',
  },
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 20,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 10,
  },
});

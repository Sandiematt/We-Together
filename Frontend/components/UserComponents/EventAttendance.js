import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator, TextInput, Modal, Button } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

// Import local images
const localImages = {
  event1: require('../../assets/event1.jpg'),
  event4: require('../../assets/event2.jpg'),
  event2: require('../../assets/event3.jpg'),
  event3: require('../../assets/event4.jpg'),
  event5: require('../../assets/event5.jpg'),
};

export default function EventAttendance() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState('');

  // Fetch events from the backend
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('https://raccoon-summary-bluejay.ngrok-free.app/events');
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

  // Filter events based on search term
  const filteredEvents = events.filter((event) =>
    event.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Submit attendance with proper name and email format 
  const handleSubmit = async () => {
    const nameRegex = /^[A-Za-z\s]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
    if (!name || !email) {
      setError('Please fill in all details.');
      return;
    }
    if (!nameRegex.test(name)) {
      setError('Name should only contain letters.');
      return;
    }
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    try {
      const response = await fetch('https://raccoon-summary-bluejay.ngrok-free.app/attend', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name,
          email: email,
          eventTitle: selectedEvent.title,
        }),
      });

      const data = await response.json();

      if (response.status === 201 && data.message === "User registered successfully for event") {
        setError(''); // Clear any existing errors
        alert('Submitted successfully!');
        setModalVisible(false);
        setName('');
        setEmail('');
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
      <View style={styles.header}>
        <Text style={styles.headerText}>Explore New Events !!</Text>
        <TextInput
          style={styles.searchBar}
          placeholder="Search events..."
          value={searchTerm}
          onChangeText={setSearchTerm}
          placeholderTextColor="#999" 
        />
      </View>

      {filteredEvents.map((event, index) => (
        <View style={styles.card} key={event._id}>
          <Image
            style={styles.cardImage}
            source={localImages[`event${index + 1}`]}  
          />
          <View style={styles.cardContent}>
            <Text style={styles.contentTitle}>{event.title}</Text>
            <Text style={styles.contentText}>{event.description}</Text>
            <View style={styles.detailsContainer}>
              <View>
                <Text style={styles.contentDetails}>
                  <Icon name="map-marker" size={20} color="#FF6347" alignItems="left" /> 
                  {` ${event.venue}, ${event.place}`}
                </Text>
                <Text style={styles.contentDetails}>
                  <Icon name="calendar" size={20} color="#4682B4" />
                  {` ${new Date(event.date).toLocaleDateString('en-GB')} at ${event.time}`}
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
              onChangeText={setEmail}
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
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 30,
    backgroundColor: '#5A67D8',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerText: {
    fontSize: 24,
    fontFamily: 'Poppins-Bold',
    color: '#fff',
    textAlign: 'left',
    marginBottom: 10,
  },
  searchBar: {
    backgroundColor: '#fff',
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
    fontFamily: 'Poppins-Regular', 
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 15,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
    overflow: 'hidden',
    padding: 15,
  },
  cardImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  cardContent: {
    padding: 15,
  },
  contentTitle: {
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
    color: '#333',
    marginBottom: 5,
  },
  contentText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  contentDetails: {
    fontSize: 12,
    color: '#999',
    marginBottom: 5,
    flexDirection: 'row', 
    alignItems: 'center', 
  },
  button: {
    backgroundColor: '#5A67D8',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignSelf: 'flex-end',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
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
    borderRadius: 15,
    width: '80%',
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 20,
    padding: 10,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
  },
});

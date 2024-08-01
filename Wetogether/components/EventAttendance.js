import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const events = [
  { title: 'Pottery Workshop', content: 'Learn the art of pottery.', venue: 'Art Center', date: '2024-07-20'},
  { title: 'Yoga Retreat', content: 'Relax and rejuvenate.', venue: 'Wellness Spa', date: '2024-07-25' },
  { title: 'Cooking Class', content: 'Master the art of Italian cuisine.', venue: 'Cooking Studio', date: '2024-07-28' },
];

export default function EventAttendance() {
  return (
    <ScrollView style={styles.container}>
      {events.map((event, index) => (
        <View style={styles.card} key={index}>
          <Image
            style={styles.cardImage}
            source={{ uri: `https://picsum.photos/700?random=${index}` }}
          />
          <View style={styles.cardContent}>
            <Text style={styles.contentTitle}>{event.title}</Text>
            <Text style={styles.contentText}>{event.content}</Text>
            <View style={styles.detailsContainer}>
              <View>
                <Text style={styles.contentDetails}><Icon name="map-marker" size={14} color="#999" />  Venue: {event.venue}</Text>
                <Text style={styles.contentDetails}><Icon name="calendar" size={14} color="#999" /> Date: {event.date}</Text>
              </View>
              <TouchableOpacity style={styles.button} onPress={() => { /* Add your event handling logic here */ }}>
                <Text style={styles.buttonText}>Attend</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f5f5',
  },
  card: {
    borderRadius: 10,
    elevation: 4,
    backgroundColor: 'white',
    margin: 15,
    overflow: 'hidden',
  },
  cardContent: {
    padding: 15,
  },
  contentTitle: {
    fontSize: 24,
    fontFamily: 'Poppins-Bold',
    color: '#333',
  },
  contentText: {
    fontSize: 16,
    color: '#666',
    fontFamily: 'Poppins-Normal',
    marginVertical: 0,
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  contentDetails: {
    fontSize: 14,
    color: '#999',
    marginVertical: 2,
  },
  cardImage: {
    width: '100%',
    height: 200,
  },
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 25,
  },
  buttonText: {
    fontSize: 15,
    color: 'white',
    fontFamily: 'Poppins-Bold',
    alignItems: 'center'
  },
});

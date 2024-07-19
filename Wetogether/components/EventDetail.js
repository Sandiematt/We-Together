// EventDetail.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function EventDetail({ route }) {
  const { event } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{event.title}</Text>
      <Text style={styles.content}>{event.content}</Text>
      <Text style={styles.details}>Venue: {event.venue}</Text>
      <Text style={styles.details}>Date: {event.date}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  content: {
    fontSize: 16,
    marginBottom: 10,
  },
  details: {
    fontSize: 14,
    color: '#555',
    marginBottom: 5,
  },
});

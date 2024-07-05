import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';

export default function HomeScreen({ navigation }) {
  const goToProfile = () => {
    // Navigate to the profile screen using navigation.navigate()
    // Example: navigation.navigate('Profile');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greetingText}>Hello User!</Text>
        <TouchableOpacity style={styles.profileButton} onPress={goToProfile}>
          <Text style={styles.profileButtonText}>To Profile</Text>
        </TouchableOpacity>
      </View>
      <Image
        source={require('../assets/profile_icon.png')}
        style={styles.profileIcon}
      />
      <View style={styles.eventsContainer}>
        <Text style={styles.eventsTitle}>Upcoming Events..</Text>
        <View style={styles.eventBox}>
          <Text style={styles.eventTitle}>Event 1</Text>
          <Text style={styles.eventDetails}>Date:</Text>
          <Text style={styles.eventDetails}>Time:</Text>
          <Text style={styles.eventDetails}>Venue:</Text>
          <Text style={styles.eventDetails}>Location:</Text>
        </View>
        <View style={styles.eventBox}>
          <Text style={styles.eventTitle}>Event 2</Text>
          <Text style={styles.eventDetails}>Date:</Text>
          <Text style={styles.eventDetails}>Time:</Text>
          <Text style={styles.eventDetails}>Venue:</Text>
          <Text style={styles.eventDetails}>Location:</Text>
        </View>
        <View style={styles.eventBox}>
          <Text style={styles.eventTitle}>Event 3</Text>
          <Text style={styles.eventDetails}>Date:</Text>
          <Text style={styles.eventDetails}>Time:</Text>
          <Text style={styles.eventDetails}>Venue:</Text>
          <Text style={styles.eventDetails}>Location:</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
  },
  greetingText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  profileIcon: {
    width: 150,
    height: 150,
    borderRadius: 50,
    marginVertical: 20,
  },
  profileButton: {
    backgroundColor: '#7713D1',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
  },
  profileButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  eventsContainer: {
    width: '100%',
    marginTop: 20,
  },
  eventsTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  eventBox: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  eventDetails: {
    fontSize: 14,
    color: '#555',
  },
});

import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';

const events = [
  { title: 'Pottery Workshop', content: 'Learn the art of pottery.', venue: 'Art Center', date: '2024-07-20' },
  { title: 'Yoga Retreat', content: 'Relax and rejuvenate.', venue: 'Wellness Spa', date: '2024-07-25' },
  { title: 'Cooking Class', content: 'Master the art of Italian cuisine.', venue: 'Cooking Studio', date: '2024-07-28' },
];

export default function HomeScreen({ navigation }) {
  const goToProfile = () => {
    navigation.navigate('Profile');
  };

  const handleAttendPress = (event) => {
    // Handle event attendance logic here
    console.log(`Attending event: ${event.title}`);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greetingText}>Hello User!</Text>
        <TouchableOpacity style={styles.profileButton} onPress={goToProfile}>
          <Image
            source={require('../assets/right-arrow.png')} 
            style={styles.profileButtonImage}
          />
        </TouchableOpacity>
      </View>
      <Image
        source={require('../assets/main_profile.png')}
        style={styles.profileIcon}
      />
      <View style={styles.eventsContainer}>
        <Text style={styles.eventsTitle}>Upcoming Events..</Text>
        {events.map((event, index) => (
          <View style={styles.card} key={index}>
            <Image
              style={styles.cardImage}
              source={{ uri: `https://picsum.photos/700?random=${index}`}}
            />
            <View style={styles.cardContent}>
              <Text style={styles.contentTitle}>{event.title}</Text>
              <Text style={styles.contentText}>{event.content}</Text>
              <View style={styles.detailsContainer}>
                <View>
                  <Text style={styles.contentDetails}>Venue: {event.venue}</Text>
                  <Text style={styles.contentDetails}>Date: {event.date}</Text>
                </View>
                <TouchableOpacity style={styles.button} onPress={() => handleAttendPress(event)}>
                  <Text style={styles.buttonText}>Attend</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
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
    fontFamily: 'Poppins-Bold',
  },
  profileIcon: {
    width: 150,
    height: 150,
    borderRadius: 50,
    marginVertical: 20,
  },
  profileButton: {
    padding: 10,
  },
  profileButtonImage: {
    width: 25, 
    height: 25, 
  },
  eventsContainer: {
    width: '100%',
    marginTop: 20,
  },
  eventsTitle: {
    fontSize: 25,
    marginBottom: 20,
    fontFamily: 'Poppins-Bold',
  },
  card: {
    borderRadius: 10,
    elevation: 4,
    backgroundColor: 'white',
    marginBottom:14,
    
    overflow: 'hidden',
  },
  cardContent: {
    padding: 15,
  },
  contentTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  contentText: {
    fontSize: 16,
    color: '#666',
    marginVertical: 2,
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
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  buttonText: {
    fontSize: 16,
    color: 'white',
  },
});

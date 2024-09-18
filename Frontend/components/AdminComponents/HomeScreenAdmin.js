import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import { Icon } from 'react-native-elements';

export default function HomeScreenAdmin() {
  return (
    <View style={styles.container}>
     
      {/* User Count Section */}
      <View style={styles.userCountSection}>
        <View style={styles.circle}>
          <Text style={styles.userCountText}>26</Text>
          <Text style={styles.userText}>Users</Text>
        </View>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.button}>
            <Icon name="event" color="black" size={20} />
            <Text style={styles.buttonText}>Create Event</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button}>
            <Icon name="add" color="black" size={20} />
            <Text style={styles.buttonText}>Create Job</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.logoutButton}>
            <Icon name="logout" color="white" size={20} />
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Upcoming Events Section */}
      <View style={styles.upcomingEventsSection}>
        <Text style={styles.upcomingEventsText}>Upcoming Events..</Text>
        <Image
          style={styles.noEventsImage}
          source={{ uri: 'https://img.icons8.com/ios/452/nothing-found.png' }}
        />
        <Text style={styles.noEventsText}>No Upcoming Events</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#f8f8f8',
  },
  headerText: {
    fontSize: 22,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  userCountSection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: '#fff',
  },
  circle: {
    padding:50,
    borderRadius: 30,
    backgroundColor: '#d4f5d6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  userCountText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  userText: {
    fontSize: 16,
    color: '#888',
  },
  buttonsContainer: {
    justifyContent: 'center',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
    width: 130,
  },
  buttonText: {
    marginLeft: 5,
    fontSize: 16,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ff4d4d',
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
    width: 130,
  },
  logoutText: {
    color: 'white',
    marginLeft: 5,
    fontSize: 16,
  },
  upcomingEventsSection: {
    alignItems: 'center',
    paddingVertical: 100,
  },
  upcomingEventsText: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  noEventsImage: {
    width: 150,
    height: 150,
    marginVertical: 10,
  },
  noEventsText: {
    fontSize: 16,
    color: '#888',
  },
});

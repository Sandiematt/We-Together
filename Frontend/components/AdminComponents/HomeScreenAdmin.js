import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, Alert } from 'react-native';
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreenAdmin({ handleLogout }) {
  const navigation = useNavigation();
  const [userCount, setUserCount] = useState(0);

  useEffect(() => {
    const fetchUserCount = async () => {
      try {
        const response = await fetch('https://boss-turkey-happily.ngrok-free.app/userCount'); // Update with your API endpoint
        const data = await response.json();
        setUserCount(data.count);
      } catch (error) {
        console.error("Failed to fetch user count:", error);
      }
    };

    fetchUserCount();
  }, []);

  const handleLogoutPress = () => {
    Alert.alert(
      "Logout Confirmation",
      "Do you want to logout?",
      [
        {
          text: "No",
          onPress: () => console.log("Logout cancelled"),
          style: "cancel"
        },
        {
          text: "Yes",
          onPress: () => handleLogout(),
        }
      ],
      { cancelable: false }
    );
  };

  const handleCreateJobPress = () => {
    navigation.navigate('Jobs');
  };

  const handleEventPress = () => {
    navigation.navigate('Events');
  };

  return (
    <View style={styles.container}>
      {/* User Count Section */}
      <View style={styles.userCountSection}>
        <View style={styles.circle}>
          <Text style={styles.userCountText}>{userCount}</Text>
          <Text style={styles.userText}>Users</Text>
        </View>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.button} onPress={handleEventPress}>
            <Icon name="event" color="black" size={20} />
            <Text style={styles.buttonText}>Create Event</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={handleCreateJobPress}>
            <Icon name="add" color="black" size={20} />
            <Text style={styles.buttonText}>Create Job</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.logoutButton} onPress={handleLogoutPress}>
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
  userCountSection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: '#fff',
  },
  circle: {
    padding: 50,
    borderRadius: 30,
    backgroundColor: '#d4f5d6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  userCountText: {
    fontSize: 24,
    fontFamily: 'Poppins-Bold',
  },
  userText: {
    fontSize: 16,
    color: '#888',
    fontFamily: 'Poppins-Bold',
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
    fontSize: 13,
    fontFamily: 'Poppins-Bold',
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
    marginLeft: 10,
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
  },
  upcomingEventsSection: {
    alignItems: 'center',
    paddingVertical: 100,
  },
  upcomingEventsText: {
    fontSize: 30,
    fontFamily: 'Poppins-Bold',
  },
  noEventsImage: {
    width: 150,
    height: 150,
    marginVertical: 10,
  },
  noEventsText: {
    fontSize: 16,
    color: '#888',
    fontFamily: 'Poppins-Bold',
  },
});

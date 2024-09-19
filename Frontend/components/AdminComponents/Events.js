import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import EventAdminDetail from './EventAdminDetail.js'; 
import AddEventForm from './AddEventForm.js'; 

const Stack = createStackNavigator();

const events = [
  { 
    title: 'Pottery Workshop', 
    content: 'Learn the art of pottery.', 
    venue: 'Art Center', 
    date: '2024-07-20' 
  },
  { 
    title: 'Yoga Retreat', 
    content: 'Relax and rejuvenate.', 
    venue: 'Wellness Spa', 
    date: '2024-07-25' 
  },
  { 
    title: 'Cooking Class', 
    content: 'Master the art of Italian cuisine.', 
    venue: 'Cooking Studio', 
    date: '2024-07-28' 
  },
];

const EventsScreen = ({ navigation }) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('AddEventForm')}>
        <Ionicons name="add" size={24} color="#fff" />
        <Text style={styles.addButtonText}>Add Event</Text>
      </TouchableOpacity>

      {events.map((event, index) => (
        <View key={index} style={styles.card}>
          <Image
            style={styles.cardImage}
            source={{ uri: `https://picsum.photos/700?random=${index}` }}
          />
          <View style={styles.cardContent}>
            <Text style={styles.contentTitle}>{event.title}</Text>
            <Text style={styles.contentText}>{event.content}</Text>
            <View style={styles.detailsContainer}>
              <View>
                <Text style={styles.contentDetails}><Ionicons name="location" size={14} color="#999" /> Venue: {event.venue}</Text>
                <Text style={styles.contentDetails}><Ionicons name="calendar" size={14} color="#999" /> Date: {event.date}</Text>
              </View>
              <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('EventAdminDetail')}
              >
                <Text style={styles.buttonText}>View Details</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

const AdminEvents = () => {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName="EventsScreen">
        <Stack.Screen
          name="EventsScreen"
          component={EventsScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="EventAdminDetail"
          component={EventAdminDetail}
          options={{ headerTitle: '' }}
        />
        <Stack.Screen
          name="AddEventForm"
          component={AddEventForm}
          options={{ headerTitle: '' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingTop: 36,
    paddingBottom: 18,
    paddingHorizontal: 18,
    backgroundColor: '#f7f7f7',
  },
  addButton: {
    alignItems: 'center',
    marginBottom: 18,
    padding: 12,
    borderRadius: 9,
    backgroundColor: '#4caf50', 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1.8 },
    shadowOpacity: 0.09,
    shadowRadius: 9,
    elevation: 4.5,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 6,
    fontFamily: 'Poppins-Bold',
  },
  card: {
    marginBottom: 18,
    padding: 18,
    borderRadius: 9,
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1.8 },
    shadowOpacity: 0.09,
    shadowRadius: 9,
    elevation: 4.5,
  },
  cardImage: {
    width: '100%',
    height: 200,
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
  },
});

export default AdminEvents;

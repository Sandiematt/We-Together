import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const events = [
  { id: '1', title: 'Community Clean-Up', date: 'July 30, 2024', image: require('../../assets/event2.jpg') },
  { id: '2', title: 'Charity Run', date: 'August 12, 2024', image: require('../../assets/event4.jpg') },
];

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Hi, User...</Text>
        <Text style={styles.subHeaderText}>Welcome to We-Together</Text>
        <View style={styles.searchContainer}>
          <TextInput placeholder="Search Here..." style={styles.searchInput} />
          <Icon name="search" size={20} color="#000" />
        </View>
        <TouchableOpacity style={styles.startLearningButton} onPress={() => navigation.navigate('Events')}>
          <Text style={styles.startLearningText}>Explore New Events</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.sectionTitle}>Upcoming Events...</Text>
      <FlatList
        data={events}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.courseContainer}>
            <Image source={item.image} style={styles.courseImage} />
            <View style={styles.courseDetails}>
              <Text style={styles.courseTitle}>{item.title}</Text>
              <Text style={styles.courseLessons}>{item.date}</Text>
            </View>
            <TouchableOpacity style={styles.playButton}>
              <Icon name="calendar" size={20} color="#000" />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    padding: 20,
    backgroundColor: '#5A67D8',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerText: {
    fontSize: 30,
    color: '#fff',
    top: 10,
    fontFamily: 'Poppins-Bold',
  },
  subHeaderText: {
    fontSize: 16,
    color: '#fff',
    marginVertical: 10,
    fontFamily: 'Poppins-Normal',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 18,
  },
  searchInput: {
    flex: 1,
    height: 50,
  },
  startLearningButton: {
    backgroundColor: '#E53E3E',
    borderRadius: 50,
    padding: 10,
    marginTop: 20,
  },
  startLearningText: {
    color: '#fff',
    textAlign: 'center',
    fontFamily: 'Poppins-Bold',
  },
  sectionTitle: {
    fontSize: 23,
    marginVertical: 20,
    marginHorizontal: 20,
    fontFamily: 'Poppins-Bold',
  },
  courseContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F2F4F3',
    padding: 15,
    marginHorizontal: 15,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  courseImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 10,
  },
  courseDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  courseTitle: {
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
    marginBottom: 5,
    marginLeft:10,
  },
  courseLessons: {
    fontSize: 14,
    color: '#555',
    marginLeft:10,
    fontFamily: 'Poppins-Normal',
  },
  playButton: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
});

export default HomeScreen;

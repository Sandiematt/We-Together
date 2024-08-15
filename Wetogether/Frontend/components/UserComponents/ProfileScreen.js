import React from 'react';
import { View, StyleSheet, Image, Text, ScrollView, ImageBackground, TouchableOpacity } from 'react-native';

const ProfileScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.headerContainer}>
        <ImageBackground
          source={require('../assets/circles.png')}
          style={styles.header}
          imageStyle={styles.backgroundImage}
        >
          <Image
            source={require('../assets/profile_user.jpg')}
            style={styles.profileImage}
          />
        </ImageBackground>
        <View style={styles.card}>
          <View style={styles.cardItem}>
            <Text style={styles.label}>Name:</Text>
            <Text style={styles.value}>John Doe</Text>
          </View>
          <View style={styles.line} />
          <View style={styles.cardItem}>
            <Text style={styles.label}>Email:</Text>
            <Text style={styles.value}>johndoe@example.com</Text>
          </View>
          <View style={styles.line} />
          <View style={styles.cardItem}>
            <Text style={styles.label}>Phone:</Text>
            <Text style={styles.value}>+1234567890</Text>
          </View>
          <View style={styles.line} />
          <View style={styles.cardItem}>
            <Text style={styles.label}>Address:</Text>
            <Text style={styles.value}>123 Main St, City, Country</Text>
          </View>
        </View>
      </View>
      <TouchableOpacity style={styles.logoutButton}>
        <Text style={styles.logoutButtonText}>Log Out</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  headerContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  header: {
    backgroundColor: '#064878',
    width: '100%',
    height: '75%',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  backgroundImage: {
    resizeMode: 'cover',
    opacity: 0.5, 
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: '#fff',
  },
  card: {
    position: 'absolute',
    top: 300,
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  label: {
    fontSize: 18,
    color: '#333',
    fontFamily:'Poppins-Bold',
    top:5,
    
  },
  value: {
    fontSize: 18,
    color: '#333',
    top:5,
  },
  line: {
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 5,
  },
  logoutButton: {
    marginTop: 90,
    backgroundColor: '#ed1c1c',
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 35,
    alignItems: 'center',
  },
  logoutButtonText: {
    fontSize: 15,
    color: '#fff',
    
    fontFamily:"Poppins-Bold"
  },
});

export default ProfileScreen;

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const ProfileScreen = ({ handleLogout }) => {
  const [userData, setUserData] = useState(null);
  const [editableFields, setEditableFields] = useState({
    name: false,
    email: false,
    contact: false,
    gender: false,
  });

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [contact, setContact] = useState('');
  const [gender, setGender] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedUsername = await AsyncStorage.getItem('username');
        if (storedUsername) {
          const response = await axios.get(`http://10.0.2.2:5000/users/${storedUsername}`);
          setUserData(response.data);
          setName(response.data.name);
          setEmail(response.data.email);
          setContact(response.data.contact);
          setGender(response.data.gender);
        }
      } catch (error) {
        console.log('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleSave = async () => {
    try {
      const storedUsername = await AsyncStorage.getItem('username');
      if (storedUsername) {
        const response = await axios.put(`https://raccoon-summary-bluejay.ngrok-free.app/users/${storedUsername}`, {
          name,
          email,
          contact,
          gender,
        });
        if (response.status === 200) {
          setEditableFields({
            name: false,
            email: false,
            contact: false,
            gender: false,
          });
          Alert.alert('Success', 'Profile updated successfully');
        }
      }
    } catch (error) {
      console.log('Error updating profile:', error);
      Alert.alert('Error', 'Failed to update profile');
    }
  };

  const handleLogoutPress = () => {
    Alert.alert(
      "Logout Confirmation",
      "Do you want to logout?",
      [
        {
          text: "No",
          onPress: () => console.log("Logout cancelled"),
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: async () => {
            try {
              // Clear AsyncStorage to log out
              await AsyncStorage.clear();
              console.log('Logged out successfully');
              handleLogout();  // Call the parent logout function to update the state or navigate
            } catch (error) {
              console.log('Error logging out:', error);
            }
          },
        },
      ],
      { cancelable: false }
    );
  };


  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.headerContainer}>
        <ImageBackground
          source={require('../../assets/circles.png')}
          style={styles.header}
          imageStyle={styles.backgroundImage}
        >
          <Image
            source={require('../../assets/profile_user.jpg')}
            style={styles.profileImage}
          />
        </ImageBackground>
        <View style={styles.card}>
          <View style={styles.cardItem}>
            <Text style={styles.label}>Name:</Text>
            {editableFields.name ? (
              <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
              />
            ) : (
              <Text style={styles.value}>{name}</Text>
            )}
          </View>
          <View style={styles.line} />
          <View style={styles.cardItem}>
            <Text style={styles.label}>Email:</Text>
            {editableFields.email ? (
              <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
              />
            ) : (
              <Text style={styles.value}>{email}</Text>
            )}
          </View>
          <View style={styles.line} />
          <View style={styles.cardItem}>
            <Text style={styles.label}>Phone:</Text>
            {editableFields.contact ? (
              <TextInput
                style={styles.input}
                value={contact}
                onChangeText={setContact}
              />
            ) : (
              <Text style={styles.value}>{contact}</Text>
            )}
          </View>
          <View style={styles.line} />
          <View style={styles.cardItem}>
            <Text style={styles.label}>Gender:</Text>
            {editableFields.gender ? (
              <TextInput
                style={styles.input}
                value={gender}
                onChangeText={setGender}
              />
            ) : (
              <Text style={styles.value}>{gender}</Text>
            )}
          </View>
        </View>
      </View>
      <View style={styles.buttonsContainer}>
        {Object.values(editableFields).includes(true) ? (
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => setEditableFields({
              name: true,
              email: true,
              contact: true,
              gender: true,
            })}
          >
            <Text style={styles.editButtonText}>Edit</Text>
          </TouchableOpacity>
        )}
      </View>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogoutPress}>
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
    fontFamily: 'Poppins-Bold',
    top: 5,
  },
  value: {
    fontSize: 18,
    color: '#333',
    top: 5,
  },
  input: {
    fontSize: 18,
    color: '#333',
    top: 5,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    padding: 5,
    width: '60%',
  },
  line: {
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 5,
  },
  buttonsContainer: {
    marginTop: 20,
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 35,
    alignItems: 'center',
  },
  saveButtonText: {
    fontSize: 15,
    color: '#fff',
    fontFamily: 'Poppins-Bold',
  },
  editButton: {
    backgroundColor: '#FFA500',
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 35,
    alignItems: 'center',
  },
  editButtonText: {
    fontSize: 15,
    color: '#fff',
    fontFamily: 'Poppins-Bold',
  },
  logoutButton: {
    marginTop: 30,
    backgroundColor: '#ed1c1c',
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 35,
    alignItems: 'center',
  },
  logoutButtonText: {
    fontSize: 15,
    color: '#fff',
    fontFamily: 'Poppins-Bold',
  },
});

export default ProfileScreen;

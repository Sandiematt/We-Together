import React from 'react';
import { StyleSheet, Text, View, Image, ImageBackground, TouchableOpacity} from 'react-native';
import bgImage from '../assets/profile_bg.png';
import { AntDesign } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';

export default function ProfileScreen({ navigation }) {
  return (
    <ScrollView>
    <ImageBackground source={bgImage} style={styles.bgImage}>
      <View style={styles.container}>
        <View style={styles.icons}>
          <TouchableOpacity style={styles.edit}>
            <AntDesign name="edit" size={24} color="white" />
          </TouchableOpacity>
        </View>
        
        <View style={styles.middle}>
          <View style={styles.imageContainer}>
            <Image source={require("../assets/profile_user.jpg")} style={styles.image} />
            <Text style={styles.font}>John Doe</Text>
            <Text>hello@gmail.com</Text>
          </View>
        </View>

        <View Style={styles.bottomContainer}>
          <View style={styles.card}>
            <Text style={styles.cardText}>Name: John Doe</Text>
            <Text style={styles.cardText}>Email: hello@gmail.com</Text>
            <Text style={styles.cardText}>Mobile No: 1234567890</Text>
            <Text style={styles.cardText}>Aadhar Number: 1234-5678-9012</Text>
          </View>
        </View>

        <View style={styles.signOutContainer}>
          <TouchableOpacity style={styles.signOutButton}  >
            <Text style={styles.signOutText}>Sign Out</Text>
          </TouchableOpacity>
        </View>

      </View>
    </ImageBackground>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  bgImage: {
    flex: 1,
    resizeMode: "cover",
  },
  container: {
    marginHorizontal: 20,
    marginTop: 10,
  },
  icons: {
    flexDirection: 'row',
    marginTop: 20,
  },
  edit: {
    paddingLeft: 320,
  },
  middle: {
    marginTop: 30,
  },
  imageContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 5,
  },
  font: {
    fontSize: 16,
    color: "white",
    fontWeight: "bold",
  },
  card:{
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding:30,
    marginTop:50,
    borderRadius:10,
    alignItems:"left"
  },
  cardText:{
    fontSize: 16,
    color: '#333',
    marginVertical: 5,
  },
  signOutContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  signOutButton: {
    backgroundColor: '#ff5757',
    marginTop:160,
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  signOutText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

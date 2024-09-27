import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, SafeAreaView, KeyboardAvoidingView, TouchableOpacity, Image, Platform, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';

const SignUp = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [contact, setContact] = useState('');
  const [gender, setGender] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post('https://boss-turkey-happily.ngrok-free.app/register', {
        username,
        name,
        email,
        contact,
        gender,
        password,
      });
      
      console.log('Response:', response.data); // Log response data for debugging

      // Check the response structure
      if (response.data && response.data.message === "User registered successfully") {
        navigation.navigate('Login'); // Corrected navigation method
      } else {
        setError('Sign-up failed');
      }
    } catch (err) {
      console.error('Sign-up error:', err.response ? err.response.data : err.message); // Log detailed error
      setError('Sign-up failed');
    }
  };

  const gotoLogin = () => {
    navigation.navigate('Login'); // Use navigation to go to Login screen
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0} // Adjust if needed
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.innerContainer}>
            <View style={styles.header}>
              <Image source={require('../../assets/main_logo.png')} style={styles.headerImg} />
              <Text style={styles.title}>Create a New Account</Text>
            </View>
            <View style={styles.formContainer}>
              <View style={styles.form}>
                <View style={styles.input}>
                  <Text style={styles.inputLabel}>Username:</Text>
                  <TextInput
                    autoCapitalize='none'
                    autoCorrect={false}
                    style={styles.inputText}
                    placeholder="john_doe"
                    placeholderTextColor="#003f5c"
                    onChangeText={(text) => setUsername(text)}
                  />
                </View>
                <View style={styles.input}>
                  <Text style={styles.inputLabel}>Name:</Text>
                  <TextInput
                    autoCapitalize='words'
                    autoCorrect={false}
                    style={styles.inputText}
                    placeholder="John Doe"
                    placeholderTextColor="#003f5c"
                    onChangeText={(text) => setName(text)}
                  />
                </View>
                <View style={styles.input}>
                  <Text style={styles.inputLabel}>Email Address:</Text>
                  <TextInput
                    autoCapitalize='none'
                    autoCorrect={false}
                    keyboardType='email-address'
                    style={styles.inputText}
                    placeholder="john.doe@example.com"
                    placeholderTextColor="#003f5c"
                    onChangeText={(text) => setEmail(text)}
                  />
                </View>
                <View style={styles.input}>
                  <Text style={styles.inputLabel}>Contact Number:</Text>
                  <TextInput
                    keyboardType='phone-pad'
                    style={styles.inputText}
                    placeholder="+91 234567890"
                    placeholderTextColor="#003f5c"
                    onChangeText={(text) => setContact(text)}
                  />
                </View>
                <View style={styles.input}>
                  <Text style={styles.inputLabel}>Gender:</Text>
                  <View style={styles.pickerContainer}>
                    <Picker
                      selectedValue={gender}
                      style={styles.picker}
                      onValueChange={(itemValue) => setGender(itemValue)}
                    >
                      <Picker.Item label="Select Gender" value="" />
                      <Picker.Item label="Male" value="Male" />
                      <Picker.Item label="Female" value="Female" />
                    </Picker>
                  </View>
                </View>
                <View style={styles.input}>
                  <Text style={styles.inputLabel}>Password:</Text>
                  <TextInput
                    secureTextEntry
                    style={styles.inputText}
                    placeholder="Enter password"
                    placeholderTextColor="#003f5c"
                    onChangeText={(text) => setPassword(text)}
                  />
                </View>
                <View style={styles.input}>
                  <Text style={styles.inputLabel}>Confirm Password:</Text>
                  <TextInput
                    secureTextEntry
                    style={styles.inputText}
                    placeholder="Confirm password"
                    placeholderTextColor="#003f5c"
                    onChangeText={(text) => setConfirmPassword(text)}
                  />
                </View>
                {error ? <Text style={styles.errorText}>{error}</Text> : null}
                <View style={styles.formAction}>
                  <TouchableOpacity onPress={handleSignUp}>
                    <View style={styles.btn}>
                      <Text style={styles.btnText}>Sign Up</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View style={styles.loginBtn}>
              <Text style={styles.hehe}>Already have an account?</Text>
              <Text style={styles.loginText} onPress={gotoLogin}>Sign In</Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  innerContainer: {
    flex: 1,
    padding: 24,
  },
  header: {
    alignItems: 'center',
    marginTop: 50,
  },
  headerImg: {
    width: 300,
    height: 80,
    marginBottom: 20,
  },
  title: {
    fontSize: 25,
    fontFamily: 'Poppins-Bold', // Updated font family
    color: 'black',
    marginBottom: 6,
    textAlign: 'center',
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  form: {
    marginBottom: 24,
  },
  input: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    fontFamily: 'Poppins-Bold', // Updated font family
    color: 'black',
    marginBottom: 8,
  },
  inputText: {
    backgroundColor: '#ebecf4',
    height: 44,
    paddingHorizontal: 16,
    borderRadius: 12,
    fontSize: 15,
    fontFamily: 'Poppins-Normal', // Updated font family
    color: '#222',
  },
  pickerContainer: {
    borderRadius: 10,
    borderColor: '#ddd',
    backgroundColor: '#fff',
  },
  picker: {
    height: 60,
    width: '100%',
  },
  btn: {
    backgroundColor: '#075eec',
    borderRadius: 50,
    alignSelf: 'center',
    paddingVertical: 10,
    width: 150,
  },
  formAction: {
    marginVertical: 24,
  },
  btnText: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    fontFamily: 'Poppins-Bold',
    top: 2,
  },
  loginBtn: {
    alignItems: 'center',
    marginBottom: 24,
  },
  loginText: {
    fontSize: 15,
    fontFamily: 'Poppins-Bold', // Updated font family
    textDecorationLine: 'underline',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 10,
    fontFamily: 'Poppins-Normal', // Updated font family
  },

  hehe:{fontSize:13,fontFamily:'Poppins-Normal',},
});

export default SignUp;

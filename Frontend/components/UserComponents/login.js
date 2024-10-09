import React, { useState, useRef, useEffect } from 'react';
import { View, TextInput, Text, StyleSheet, SafeAreaView, KeyboardAvoidingView, TouchableOpacity, Image, Platform, ScrollView, Animated } from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/Ionicons'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
// Import Ionicons for eye icon

const Login = ({ navigation, onLoginSuccess, onAdminLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isUsernameFocused, setIsUsernameFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false); // State for password visibility

  const usernameLabelAnim = useRef(new Animated.Value(0)).current;
  const passwordLabelAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Username label animation
    Animated.timing(usernameLabelAnim, {
      toValue: isUsernameFocused || username !== '' ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [isUsernameFocused, username]);

  useEffect(() => {
    // Password label animation
    Animated.timing(passwordLabelAnim, {
      toValue: isPasswordFocused || password !== '' ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [isPasswordFocused, password]);

  const handleLogin = async () => {
    if (!username || !password) {
      setError('Username and Password are required.');
      return;
    }
  
    try {
      const response = await axios.post('https://boss-turkey-happily.ngrok-free.app/login', { username, password });
      const user = response.data;
  
      // Store the username in AsyncStorage
      if (user.username) {
        await AsyncStorage.setItem('username', user.username);
      } else {
        console.error('Username not found in response');
      }
  
      if (user.isAdmin) {
        onAdminLogin();
      } else {
        onLoginSuccess();
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Login failed. Please check your credentials.');
    }
  };

  const gotoRegister = () => {
    navigation.navigate('SignUp');
  };

  const labelStyle = (labelAnim) => ({
    position: 'absolute',
    left: 15,
    top: labelAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [12, -25],
    }),
    fontSize: labelAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [15, 12],
    }),
    color: '#075eec',
  });
  
  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.innerContainer}>
            <View style={styles.header}>
              <Image source={require('../../assets/main_logo.png')} style={styles.headerImg} />
              <Text style={styles.title}>Login</Text>
              <Text style={styles.subtitle}>Welcome To We-Together</Text>
            </View>
            <View style={styles.formContainer}>
              <View style={styles.form}>
                <View style={styles.input}>
                  {/* Username Input */}
                  <Animated.Text style={labelStyle(usernameLabelAnim)}>
                    Username:
                  </Animated.Text>
                  <TextInput
                    autoCapitalize='none'
                    autoCorrect={false}
                    keyboardType='email-address'
                    style={styles.inputText}
                    placeholder={isUsernameFocused || username !== '' ? '' : 'Username'}
                    placeholderTextColor="#003f5c"
                    onFocus={() => setIsUsernameFocused(true)}
                    onBlur={() => setIsUsernameFocused(false)}
                    onChangeText={(text) => setUsername(text)}
                  />
                </View>
                <View style={styles.input}>
                  {/* Password Input */}
                  <Animated.Text style={labelStyle(passwordLabelAnim)}>
                    Password:
                  </Animated.Text>
                  <View style={styles.passwordContainer}>
                    <TextInput
                      secureTextEntry={!isPasswordVisible} // Change visibility based on state
                      style={styles.inputText}
                      placeholder={isPasswordFocused || password !== '' ? '' : 'Password'}
                      placeholderTextColor="#003f5c"
                      onFocus={() => setIsPasswordFocused(true)}
                      onBlur={() => setIsPasswordFocused(false)}
                      onChangeText={(text) => setPassword(text)}
                    />
                    <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)} style={styles.eyeIconContainer}>
                      <Icon name={isPasswordVisible ? 'eye-off' : 'eye'} size={24} color="#075eec" />
                    </TouchableOpacity>
                  </View>
                </View>
                {error ? <Text style={styles.errorText}>{error}</Text> : null}
                <View style={styles.formAction}>
                  <TouchableOpacity onPress={handleLogin}>
                    <View style={styles.btn}>
                      <Text style={styles.btnText}>Login</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View style={styles.regBtn}>
              <Text style={styles.hehe}>Don't have an account?</Text>
              <Text style={styles.regText} onPress={gotoRegister}>Sign Up</Text>
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
  scrollContainer: {
    flexGrow: 1,
    position:'static',
  },
  innerContainer: {
    flex: 1,
    padding: 24,
  },
  header: {
    alignItems: 'center',
    marginTop: 90,
  },
  headerImg: {
    width: 300,
    height: 80,
    marginBottom: 20,
  },
  title: {
    fontSize: 27,
    color: 'black',
    marginBottom: 6,
    textAlign: 'center',
    fontFamily: 'Poppins-Bold',
  },
  subtitle: {
    textAlign: 'center',
    color: 'gray',
    fontFamily: 'Poppins-SemiBold',
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
    top: 80,
  },
  form: {
    marginBottom: 150,
  },
  input: {
    marginBottom: 28,
    position: 'relative',
    paddingTop: 0,
    paddingBottom: 5,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'relative', // Set position to relative for absolute positioning of icon
  },
  inputText: {
    backgroundColor: '#ebecf4',
    height: 45,
    paddingHorizontal: 15,
    borderRadius: 12,
    fontSize: 15,
    fontFamily: 'Poppins-Normal',
    color: '#222',
    flex: 1,
  },
  eyeIconContainer: {
    position: 'absolute',
    right: 15, // Adjust position as needed
    top: 10, // Center the icon vertically
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
  regBtn: {
    alignItems: 'center',
    marginBottom: 24,
  },
  regText: {
    fontSize: 15,
    textDecorationLine: 'underline',
    fontFamily: 'Poppins-Bold',
  },
  hehe: {
    fontFamily: 'Poppins-Normal',
  },
  errorText: {
    color: 'red',
    marginVertical: 10,
    textAlign: 'center',
  },
});

export default Login;

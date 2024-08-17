import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, SafeAreaView, KeyboardAvoidingView, TouchableOpacity, Image, Platform, ScrollView } from 'react-native';
import axios from 'axios';

const Login = ({ onLoginSuccess, onAdminLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://192.168.1.11:5000/login', { username, password });
      const user = response.data;

      if (user.isAdmin) {
        onAdminLogin();
      } else {
        onLoginSuccess();
      }
    } catch (err) {
      setError('Login failed');
    }
  };

  const gotoRegister = () => {
    // Define navigation to registration screen
    console.log('Navigate to registration screen');
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
              <Text style={styles.title}>Welcome to We-Together</Text>
              <Text style={styles.subtitle}>Community Development App</Text>
            </View>
            <View style={styles.formContainer}>
              <View style={styles.form}>
                <View style={styles.input}>
                  <Text style={styles.inputLabel}>Email Address:</Text>
                  <TextInput
                    autoCapitalize='none'
                    autoCorrect={false}
                    keyboardType='email-address'
                    style={styles.inputText}
                    placeholder="Username"
                    placeholderTextColor="#003f5c"
                    onChangeText={(text) => setUsername(text)}
                  />
                </View>
                <View style={styles.input}>
                  <Text style={styles.inputLabel}>Password:</Text>
                  <TextInput
                    secureTextEntry
                    style={styles.inputText}
                    placeholder="Password"
                    placeholderTextColor="#003f5c"
                    onChangeText={(text) => setPassword(text)}
                  />
                </View>
                <View style={styles.formAction}>
                  <TouchableOpacity onPress={handleLogin}>
                    <View style={styles.btn}>
                      <Text style={styles.btnText}>Sign In</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View style={styles.regBtn}>
              <Text>Don't have an account?</Text>
              <Text style={styles.regText} onPress={gotoRegister}>Sign Up</Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#ebecf4',
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
    marginTop: 90,
    // Adjust this if needed
  },
  headerImg: {
    width: 300,
    height: 80,
    marginBottom: 20,
  },
  title: {
    fontSize: 27,
    fontWeight: '700',
    color: 'black',
    marginBottom: 6,
    textAlign: 'center',
  },
  subtitle: {
    textAlign: 'center',
    color: 'gray',
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center', // Centers form vertically
  },
  form: {
    marginBottom: 24,
  },
  input: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: 'black',
    marginBottom: 8,
  },
  inputText: {
    backgroundColor: '#fff',
    height: 44,
    paddingHorizontal: 16,
    borderRadius: 12,
    fontSize: 15,
    fontWeight: '500',
    color: '#222',
  },
  btn: {
    backgroundColor: '#075eec',
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  formAction: {
    marginVertical: 24,
  },
  btnText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  regBtn: {
    alignItems: 'center',
    marginBottom: 24, // Ensure this is not too close to the bottom
  },
  regText: {
    fontSize: 20,
    textDecorationLine: 'underline',
    fontWeight: 'bold',
  }
});

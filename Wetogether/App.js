import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import AboutUs from './components/AboutUs';
import CustomDrawerContent from './components/CustomDrawerContent';
import HomeScreen from './components/HomeScreen';
import ProfileScreen from './components/ProfileScreen';
import EventAttendance from './components/EventAttendance';
import LoanStatus from './components/LoanStatus';
import LoanRequest from './components/LoanRequest';

import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import JobList from './components/Jobs';
import Forum from './components/Forum';


const Drawer = createDrawerNavigator();

export default function App() {
  let [fontsLoaded] = useFonts({
    'Poppins-Bold': require('./fonts/Poppins-Bold.ttf'),
    'Poppins-Normal' :require('./fonts/Poppins-Regular.ttf'),
    'Poppins-LightBold':require('./fonts/Poppins-SemiBold.ttf')
  });

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();
  }, []);

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Home"
        drawerContent={(props) => <CustomDrawerContent {...props} />}
      >
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Profile" component={ProfileScreen} />
        <Drawer.Screen name="Events" component={EventAttendance} />
        <Drawer.Screen name="Jobs" component={JobList} />
        <Drawer.Screen name="Loan Request" component={LoanRequest} />
        <Drawer.Screen name="Loan Status" component={LoanStatus} />
        <Drawer.Screen name="Forum" component={Forum} />
        <Drawer.Screen name="About Us" component={AboutUs} />
      </Drawer.Navigator>
      <StatusBar style="auto" />
      
    </NavigationContainer>
  );
}
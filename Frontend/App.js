import React, { useEffect, useState } from 'react'; 
import { StatusBar } from 'expo-status-bar';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import AboutUs from './components/UserComponents/AboutUs';
import CustomDrawerContent from './components/UserComponents/CustomDrawerContent';
import HomeScreen from './components/UserComponents/HomeScreen';
import ProfileScreen from './components/UserComponents/ProfileScreen';
import EventAttendance from './components/UserComponents/EventAttendance';
import LoanStatus from './components/UserComponents/LoanStatus';
import LoanRequest from './components/UserComponents/LoanRequest';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import JobList from './components/UserComponents/Jobs';
import Forum from './components/UserComponents/Forum';
import HomeScreenAdmin from './components/AdminComponents/HomeScreenAdmin';
import Login from './components/UserComponents/login.js';
import Loans from './components/AdminComponents/Loans.js';

const Drawer = createDrawerNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    'Poppins-Bold': require('./fonts/Poppins-Bold.ttf'),
    'Poppins-Regular': require('./fonts/Poppins-Regular.ttf'),
    'Poppins-SemiBold': require('./fonts/Poppins-SemiBold.ttf'),
  });

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

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
    return null; // Show nothing until fonts are loaded
  }

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    setIsAdmin(false); // Set user as non-admin after login success
  };

  const handleAdminLogin = () => {
    setIsAuthenticated(true);
    setIsAdmin(true); // Set user as admin after admin login
  };

  return (
    <NavigationContainer>
      {isAuthenticated ? (
        <Drawer.Navigator
          initialRouteName={isAdmin ? 'HomeAdmin' : 'Home'}
          drawerContent={(props) => <CustomDrawerContent {...props} />}
        >
          {isAdmin ? (
            <>
              <Drawer.Screen name="HomeAdmin" component={HomeScreenAdmin} />
              <Drawer.Screen name="Loans" component={Loans} />
            </>
          ) : (
            <>
              <Drawer.Screen name="Home" component={HomeScreen} />
              <Drawer.Screen name="Profile" component={ProfileScreen} />
              <Drawer.Screen name="Events" component={EventAttendance} />
              <Drawer.Screen name="Jobs" component={JobList} />
              <Drawer.Screen name="Loan Request" component={LoanRequest} />
              <Drawer.Screen name="Loan Status" component={LoanStatus} />
              <Drawer.Screen name="Forum" component={Forum} />
              <Drawer.Screen name="About Us" component={AboutUs} />
            </>
          )}
        </Drawer.Navigator>
      ) : (
        <Login onLoginSuccess={handleLoginSuccess} onAdminLogin={handleAdminLogin} />
      )}
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}

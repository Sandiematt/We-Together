import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';

// Import components
import AboutUs from './components/UserComponents/AboutUs';
import CustomDrawerContent from './components/UserComponents/CustomDrawerContent';
import HomeScreen from './components/UserComponents/HomeScreen';
import ProfileScreen from './components/UserComponents/ProfileScreen';
import EventAttendance from './components/UserComponents/EventAttendance';
import LoanStatus from './components/UserComponents/LoanStatus';
import LoanRequest from './components/UserComponents/LoanRequest';
import JobList from './components/UserComponents/Jobs';
import Forum from './components/UserComponents/Forum';
import HomeScreenAdmin from './components/AdminComponents/HomeScreenAdmin';
import Login from './components/UserComponents/login';
import SignUp from './components/UserComponents/SignUp';
import Loans from './components/AdminComponents/Loans';
import AdminJobs from './components/AdminComponents/AdminJobs';
import AdminEvents from './components/AdminComponents/Events';
import LoanApprovalDetail from './components/AdminComponents/LoanApproval';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    'Poppins-Bold': require('./fonts/Poppins-Bold.ttf'),
    'Poppins-Regular': require('./fonts/Poppins-Regular.ttf'),
    'Poppins-SemiBold': require('./fonts/Poppins-SemiBold.ttf'),
    'Poppins-Normal': require('./fonts/Poppins-Regular.ttf'),
    'Poppins-LightBold':require('./fonts/Poppins-SemiBold.ttf')
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

  const handleLogout = () => {
    console.log('Logging out...');
    setIsAuthenticated(false);
    setIsAdmin(false); // Reset the admin status on logout
  };

  return (
    <NavigationContainer>
      {isAuthenticated ? (
        <Drawer.Navigator
          initialRouteName={isAdmin ? 'HomeAdmin' : 'Home'}
          drawerContent={(props) => (
            <CustomDrawerContent {...props} onLogout={handleLogout} />
          )}
        >
          {isAdmin ? (
            <>
              <Drawer.Screen name="HomeAdmin">
                {(props) => <HomeScreenAdmin {...props} handleLogout={handleLogout} />}
              </Drawer.Screen>
              <Drawer.Screen name="Loans" component={Loans} />
              <Drawer.Screen name="Loan Approval" component={LoanApprovalDetail} />
              <Drawer.Screen name="Jobs" component={AdminJobs} />
              <Drawer.Screen name="Events" component={AdminEvents} />
            </>
          ) : (
            <>
              <Drawer.Screen name="Home" component={HomeScreen} />
              <Drawer.Screen name="Profile">
              {(props) => <ProfileScreen {...props} handleLogout={handleLogout} />}
              </Drawer.Screen>
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
        <Stack.Navigator>
          <Stack.Screen name="Login" options={{ headerShown: false }}>
            {(props) => (
              <Login
                {...props}
                onLoginSuccess={handleLoginSuccess}
                onAdminLogin={handleAdminLogin}
              />
            )}
          </Stack.Screen>
          <Stack.Screen name="SignUp" component={SignUp} />
        </Stack.Navigator>
      )}
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Ensure you have this package installed for icons
import LoanAdminDetail from './LoanAdminDetail.js';
import AddLoanForm from './AddLoanForum.js';

const Stack = createStackNavigator();

const LoansScreen = ({ navigation }) => {
  const loans = [
    {
      title: "Policy Loan",
      subtitle: "Lowest interest as low as 0.18%",
      amount: "$20,000",
      interest: "0.18%",
    },
    {
      title: "Personal Loan",
      subtitle: "Flexible repayment options",
      amount: "$15,000",
      interest: "0.45%",
    }
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('Loanforum')}>
        <Ionicons name="add" size={24} color="#fff" />
        <Text style={styles.addButtonText}>Add Loan</Text>
      </TouchableOpacity>

      {loans.map((loan, index) => (
        <View key={index} style={styles.card}>
          <View style={styles.infoContainer}>
            <Text style={styles.title}>{loan.title}</Text>
            <Text style={styles.subtitle}>{loan.subtitle}</Text>
            <View style={styles.detailsContainer}>
              <View style={styles.details}>
                <View style={styles.detailItem}>
                  <Text style={styles.amount}>{loan.amount}</Text>
                  <Text style={styles.label}>Maximum amount</Text>
                </View>
                <View style={styles.detailItem}>
                  <Text style={styles.interest}>{loan.interest}</Text>
                  <Text style={styles.label}>Interest</Text>
                </View>
              </View>
              <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('LoanDetail')}
              >
                <Text style={styles.buttonText}>View Details</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

const Loans = () => {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName="LoansScreen">
        <Stack.Screen
          name="LoansScreen"
          component={LoansScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="LoanDetail"
          component={LoanAdminDetail}
          options={{ headerTitle:'' }}
        />
        <Stack.Screen
          name="Loanforum"
          component={AddLoanForm}
          options={{ headerTitle:'' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingTop: 36,
    paddingBottom: 18,
    paddingHorizontal: 18,
    backgroundColor: '#f7f7f7',
  },
  addButton: {
    
    alignItems: 'center',
    marginBottom: 18,
    padding: 12,
    borderRadius: 9,
    backgroundColor: '#4caf50', // Light green color
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1.8 },
    shadowOpacity: 0.09,
    shadowRadius: 9,
    elevation: 4.5,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 6,
    fontFamily: 'Poppins-Bold',
  },
  card: {
    marginBottom: 18,
    padding: 18,
    borderRadius: 9,
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1.8 },
    shadowOpacity: 0.09,
    shadowRadius: 9,
    elevation: 4.5,
  },
  infoContainer: {
    alignItems: 'flex-start',
  },
  title: {
    fontSize: 19.8,
    marginBottom: 4.5,
    fontFamily: 'Poppins-Bold',
  },
  subtitle: {
    fontSize: 14.4,
    color: '#666',
    fontFamily: 'Poppins-Normal',
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginTop: 10,
  },
  details: {
    flexDirection: 'row',
  },
  detailItem: {
    marginRight: 13.5,
  },
  amount: {
    fontSize: 21.6,
    color: '#333',
    fontFamily: 'Poppins-Bold',
  },
  interest: {
    fontSize: 21.6,
    color: '#333',
    fontFamily: 'Poppins-Bold',
  },
  label: {
    fontSize: 12.6,
    color: '#999',
    marginBottom: 5,
    fontFamily: 'Poppins-Normal',
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 13,
    borderRadius: 45,
    backgroundColor: '#4c8bf5',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 14.4,
    fontFamily: 'Poppins-Bold',
    marginTop: 5,
  },
});

export default Loans;
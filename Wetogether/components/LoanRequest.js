import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';

const LoanRequest = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <View style={styles.infoContainer}>
          <Text style={styles.title}>Policy Loan</Text>
          <Text style={styles.subtitle}>Lowest interest as low as 0.18%</Text>
          <View style={styles.detailsContainer}>
            <View style={styles.details}>
              <View style={styles.detailItem}>
                <Text style={styles.amount}>$20,000</Text>
                <Text style={styles.label}>Maximum amount</Text>
              </View>
              <View style={styles.detailItem}>
                <Text style={styles.interest}>0.18%</Text>
                <Text style={styles.label}>Interest</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Apply Now</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Personal Loan Card */}
      <View style={styles.card}>
        <View style={styles.infoContainer}>
          <Text style={styles.title}>Personal Loan</Text>
          <Text style={styles.subtitle }>Flexible repayment options</Text>
          <View style={styles.detailsContainer}>
            <View style={styles.details}>
              <View style={styles.detailItem}>
                <Text style={styles.amount}>$15,000</Text>
                <Text style={styles.label}>Maximum amount</Text>
              </View>
              <View style={styles.detailItem}>
                <Text style={styles.interest}>0.45%</Text>
                <Text style={styles.label}>Interest</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Apply Now</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
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
    fontFamily:'Poppins-Bold',
  },
  subtitle: {
    fontSize: 14.4,
    color: '#666',
    fontFamily:'Poppins-Normal',
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
    fontFamily:'Poppins-Bold',
  },
  interest: {
    fontSize: 21.6,
    color: '#333',
    fontFamily:'Poppins-Bold',
  },
  label: {
    fontSize: 12.6,
    color: '#999',
    marginBottom: 5,
    fontFamily:'Poppins-Normal'
  },
  button: {
    paddingVertical: 10.8,
    paddingHorizontal: 18,
    borderRadius: 45,
    backgroundColor: '#4c8bf5',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 14.4,
    fontFamily:'Poppins-Bold',
    marginTop:5,
  },
});

export default LoanRequest;

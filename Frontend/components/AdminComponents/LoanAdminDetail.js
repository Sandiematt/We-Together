import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';

const LoanAdminDetail = ({ route }) => {
  const { loanTitle } = route.params; // Get loan title from navigation parameters
  const [applicants, setApplicants] = useState([]);

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const response = await fetch(`https://boss-turkey-happily.ngrok-free.app/loanapplicantsadmin?loantitle=${encodeURIComponent(loanTitle)}`); // Replace with your backend URL
        
        if (!response.ok) {
          throw new Error(`Server Error: ${response.status}`);
        }
        
        const data = await response.json();
        setApplicants(data);
      } catch (error) {
        console.error('Error fetching loan applicants:', error);
      }
    };
    
    fetchApplicants();
  }, [loanTitle]);

  // Function to approve or reject loan
  const updateLoanStatus = async (name, newStatus) => {
    setApplicants((prevApplicants) =>
      prevApplicants.map((applicant) =>
        applicant.name === name
          ? { ...applicant, status: newStatus } // Update status locally
          : applicant
      )
    );

    // Update backend
    try {
      const response = await fetch('https://boss-turkey-happily.ngrok-free.app/updateLoanStatus', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, status: newStatus }),
      });

      if (!response.ok) {
        throw new Error('Failed to update loan status');
      } else {
        Alert.alert('Success', 'Loan status updated successfully.');
      }
    } catch (error) {
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.overview}>
        <View style={styles.circle}>
          <Text style={styles.circleText}>{applicants.length}</Text>
          <Text style={styles.circleLabel}>Total</Text>
        </View>
        <View style={styles.overviewCard}>
          <Text style={styles.cardTitle}>Approved</Text>
          <Text style={styles.applicantsCount}>{applicants.filter(a => a.status === 'Approved').length}</Text>
        </View>
        <View style={styles.overviewCard}>
          <Text style={styles.cardTitle}>Rejected</Text>
          <Text style={styles.applicantsCount}>{applicants.filter(a => a.status === 'Rejected').length}</Text>
        </View>
      </View>

      {/* Loan Applicants List */}
      <View>
        {applicants.map((applicant) => (
          <View key={applicant.name} style={styles.applicantItem}>
            <View style={styles.applicantDetails}>
              <Text style={styles.applicantName}>{applicant.name}</Text>
              <Text style={styles.applicantEmail}>{applicant.email}</Text>
            </View>

            {/* Button for Approve */}
            <TouchableOpacity
              style={[styles.toggleButton, styles.approveButton, applicant.status === 'Approved' ? styles.selectedButton : null]}
              onPress={() => updateLoanStatus(applicant.name, 'Approved')}
            >
              <Text style={styles.toggleButtonText}>Approve</Text>
            </TouchableOpacity>

            {/* Button for Reject */}
            <TouchableOpacity
              style={[styles.toggleButton, styles.rejectButton, applicant.status === 'Rejected' ? styles.selectedButton : null]}
              onPress={() => updateLoanStatus(applicant.name, 'Rejected')}
            >
              <Text style={styles.toggleButtonText}>Reject</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 2,
  },
  overview: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
  },
  circle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#d4f5d6',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  circleText: {
    fontSize: 24,
    fontFamily: 'Poppins-Bold',
    fontWeight: 'bold',
  },
  circleLabel: {
    fontSize: 16,
    color: '#888',
    fontFamily: 'Poppins-Bold',
  },
  overviewCard: {
    flex: 1,
    width: '20%', 
    height: '100%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginHorizontal: 10,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 5 },
  },
  cardTitle: {
    fontSize: 16,
    color: '#333',
    fontFamily: 'Poppins-Bold',
  },
  applicantsCount: {
    fontSize: 24,
    color: 'green',
    fontWeight: 'bold',
    marginTop: 10,
    fontFamily: 'Poppins-Bold',
  },
  applicantItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    marginVertical: 5,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  applicantDetails: {
    flex: 1,
  },
  applicantName: {
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Poppins-Bold',
  },
  applicantEmail: {
    color: '#666',
    fontSize: 14,
    marginTop: 5,
    fontFamily: 'Poppins-Bold',
  },
  toggleButton: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 20,
    marginLeft: 10,
  },
  approveButton: {
    backgroundColor: 'green',
  },
  rejectButton: {
    backgroundColor: 'red',
  },
  toggleButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontFamily: 'Poppins-Bold',
  },
  selectedButton: {
    opacity: 0.7,
  },
});

export default LoanAdminDetail;
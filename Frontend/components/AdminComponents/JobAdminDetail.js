import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const JobAdminDetail = () => {
  // Example job applicants data
  const applicants = [
    { id: 1, name: 'Alex', jobTitle: 'Software Engineer', applicationDate: '2023-07-10' },
    { id: 2, name: 'Maria', jobTitle: 'UI/UX Designer', applicationDate: '2023-08-05' },
    { id: 3, name: 'John', jobTitle: 'Data Analyst', applicationDate: '2024-02-15' }
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Header */}

      {/* Total Applicants and Job Openings */}
      <View style={styles.overview}>
        <View style={styles.overviewCard}>
          <Text style={styles.cardTitle}>Total Job Openings</Text>
          <Text style={styles.openings}>5</Text>
        </View>
        <View style={styles.overviewCard}>
          <Text style={styles.cardTitle}>Applicants</Text>
          <Text style={styles.applicants}>3</Text>
        </View>
      </View>

      {/* Job Applicants List */}
      <View>
        {applicants.map((applicant) => (
          <View key={applicant.id} style={styles.applicantItem}>
            <Text style={styles.applicantIndex}>{applicant.id}.</Text>
            <View style={styles.applicantDetails}>
              <Text style={styles.applicantName}>{applicant.name}</Text>
              <Text style={styles.jobTitle}>{applicant.jobTitle}</Text>
              <Text style={styles.applicationDate}>{applicant.applicationDate}</Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10
  },
  overview: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20
  },
  overviewCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginHorizontal: 10,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 }
  },
  cardTitle: {
    fontSize: 13,
    color: '#333',
    fontFamily:'Poppins-Bold',
    top:10,
  },
  openings: {
    fontSize: 24,
    color: 'blue',
    fontFamily:'Poppins-Bold',
    marginTop: 10
  },
  applicants: {
    fontSize: 24,
    color: 'blue',
    fontFamily:'Poppins-Bold',
    marginTop: 27
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
    shadowOffset: { width: 0, height: 2 }
  },
  applicantIndex: {
    fontSize: 16,
    fontFamily:'Poppins-Bold',
    marginRight: 10
  },
  applicantDetails: {
    flex: 1
  },
  applicantName: {
    fontSize: 15,
    fontFamily:'Poppins-Bold',
  },
  jobTitle: {
    color: 'green',
    fontSize: 16,
    fontWeight: 'bold',
  },
  applicationDate: {
    color: 'red',
    marginTop: 5
  }
});

export default JobAdminDetail;

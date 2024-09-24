import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const JobAdminDetail = () => {
  const [applicants, setApplicants] = useState([]);
  const [totalJobOpenings, setTotalJobOpenings] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch applicants
        const applicantsResponse = await fetch('https://boss-turkey-happily.ngrok-free.app/api/jobapplicants');
        const applicantsData = await applicantsResponse.json();
        setApplicants(applicantsData);

        // Fetch job openings
        const jobsResponse = await fetch('https://boss-turkey-happily.ngrok-free.app/jobs'); // Adjust the endpoint as necessary
        const jobsData = await jobsResponse.json();
        setTotalJobOpenings(jobsData.length); // Assuming jobsData is an array of job objects
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>JOB APPLICANTS</Text>
      </View>

      <View style={styles.overview}>
        <View style={styles.overviewCard}>
          <Text style={styles.cardTitle}>Total Job Openings</Text>
          <Text style={styles.openings}>{totalJobOpenings}</Text>
        </View>
        <View style={styles.overviewCard}>
          <Text style={styles.cardTitle1}>Applicants</Text>
          <Text style={styles.applicants}>{applicants.length}</Text>
        </View>
      </View>

      <View>
        {applicants.map((applicant, index) => (
          <View key={applicant._id.$oid} style={styles.applicantItem}>
            <Text style={styles.applicantIndex}>{index + 1}.</Text>
            <View style={styles.applicantDetails}>
              <Text style={styles.applicantName}>{applicant.name}</Text>
              <Text style={styles.jobTitle}>{applicant.jobtitle || 'N/A'}</Text>
              <Text style={styles.applicationDate}>{applicant.applicationdate || 'N/A'}</Text>
              <Text style={styles.applicantEmail}>Email: {applicant.email}</Text>
              <Text style={styles.applicantAddress}>Address: {applicant.address}</Text>
              <Text style={styles.applicantAadhaar}>Aadhaar No: {applicant.aadhaar}</Text>
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
    padding: 10,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  overview: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
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
    shadowOffset: { width: 0, height: 2 },
  },
  cardTitle: {
    fontSize: 13,
    color: '#333',
    fontFamily: 'Poppins-Bold',
    top: 10,
  },

  cardTitle1:{
    fontSize: 13,
    color: '#333',
    fontFamily: 'Poppins-Bold',
    top: 17,
  },
  openings: {
    fontSize: 24,
    color: 'blue',
    fontFamily: 'Poppins-Bold',
    marginTop: 10,
  },
  applicants: {
    fontSize: 24,
    color: 'blue',
    fontFamily: 'Poppins-Bold',
    marginTop: 27,
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
  applicantIndex: {
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
    marginRight: 10,
  },
  applicantDetails: {
    flex: 1,
  },
  applicantName: {
    fontSize: 15,
    fontFamily: 'Poppins-Bold',
  },
  jobTitle: {
    color: 'green',
    fontSize: 16,
    fontWeight: 'bold',
  },
  applicationDate: {
    color: 'red',
    marginTop: 5,
  },
  applicantEmail: {
    fontSize: 14,
    marginTop: 5,
  },
  applicantAddress: {
    fontSize: 14,
    marginTop: 5,
  },
  applicantAadhaar: {
    fontSize: 14,
    marginTop: 5,
  },
});

export default JobAdminDetail;

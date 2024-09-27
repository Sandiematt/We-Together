import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const JobAdminDetail = ({ route }) => {
  const { job } = route.params; // Get job details from route params
  const selectedJobTitle = job.title; // Extract the job title

  const [applicants, setApplicants] = useState([]);
  const [totalJobOpenings, setTotalJobOpenings] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch applicants by job title
        const applicantsResponse = await fetch(`https://boss-turkey-happily.ngrok-free.app/api/jobapplicants?jobtitle=${encodeURIComponent(selectedJobTitle)}`);
        if (!applicantsResponse.ok) {
          throw new Error('Network response was not ok');
        }
        
        const applicantsData = await applicantsResponse.json();
        setApplicants(applicantsData);

        // Fetch job openings
        const jobsResponse = await fetch('https://boss-turkey-happily.ngrok-free.app/jobs');
        const jobsData = await jobsResponse.json();
        setTotalJobOpenings(jobsData.length);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedJobTitle]); // Add selectedJobTitle as a dependency
  
  return (
    <ScrollView style={styles.container}>
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
        {Array.isArray(applicants) && applicants.length > 0 ? (
          applicants.map((applicant, index) => (
            <View key={applicant._id} style={styles.applicantItem}>
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
          ))
        ) : (
          <Text style={styles.noApplicants}>No applicants available.</Text>
        )}
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
  cardTitle1: {
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
  noApplicants: {
    fontSize: 18,
    color: 'gray',
    textAlign: 'center',
    marginTop: 20,
    fontFamily: 'Poppins-Bold', // Use your chosen font family
    padding: 10,
    backgroundColor: '#f8f8f8', // Light background color for contrast
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    elevation: 1, // Shadow effect for depth
  },
});

export default JobAdminDetail;

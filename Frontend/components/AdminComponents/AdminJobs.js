import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import CreateJob from './CreateJob';
import JobAdminDetail from './JobAdminDetail';

const Stack = createStackNavigator();

const jobData = [
  {
    id: '1',
    title: 'Senior UI / UX Designer',
    location: 'West Beach California',
    salary: '$3000 - $4000 / month',
    type: 'Full Time',
    level: 'Senior',
  },
  {
    id: '2',
    title: 'Product Designer',
    location: 'South Jakarta, Indonesia',
    salary: '$650 - $760 / month',
    type: 'Full Time',
    level: 'Senior',
  },
];

const JobItem = ({ item, navigation }) => (
  <View style={styles.jobCard}>
    <View style={styles.jobDetails}>
      <Text style={styles.jobTitle} numberOfLines={1}>{item.title}</Text>
      <View style={styles.jobInfo}>
        <Icon name="location-outline" size={16} color="#666" />
        <Text style={styles.jobLocation}>{item.location}</Text>
      </View>
      <View style={styles.jobInfo}>
        <Icon name="cash-outline" size={16} color="#666" />
        <Text style={styles.jobSalary}>{item.salary}</Text>
      </View>
      <View style={styles.jobTags}>
        <Text style={styles.jobTag}>{item.type}</Text>
        <Text style={styles.jobTag}>{item.level}</Text>
      </View>
    </View>
    <TouchableOpacity
      style={styles.requirementsButton}
      onPress={() => navigation.navigate('JobDetail', { job: item })}>
      <Text style={styles.ApplyText}>View Details</Text>
      <Icon name="chevron-forward" size={23} color="#e81a07" />
    </TouchableOpacity>
  </View>
);

const JobList = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredJobs = jobData.filter(job =>
    job.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchBar}
          placeholder="Search for jobs..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <Icon name="search" size={20} color="#6B7280" style={styles.searchIcon} />
      </View>
      <FlatList
        data={filteredJobs}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <JobItem item={item} navigation={navigation} />}
      />
      <TouchableOpacity style={styles.createJobButton} onPress={() => navigation.navigate('CreateJob')}>
        <Text style={styles.createJobText}>Create Job</Text>
        <Icon name="add" size={24} color="#FFF" />
      </TouchableOpacity>
    </View>
  );
};

const JobDetail = ({ route }) => {
  const { job } = route.params;

  return (
    <View style={styles.detailContainer}>
      <Text style={styles.title}>{job.title}</Text>
      <Text style={styles.location}>{job.location}</Text>
      <Text style={styles.salary}>{job.salary}</Text>
      <Text style={styles.type}>{job.type}</Text>
      <Text style={styles.level}>{job.level}</Text>
    </View>
  );
};

const AdminJobs = () => {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator>
        <Stack.Screen name="JobList" component={JobList} options={{ headerShown: false }} />
        <Stack.Screen name="JobDetail" component={JobAdminDetail} options={{ title: '' }} />
        <Stack.Screen name="CreateJob" component={CreateJob} options={{ title: '' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};


const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#F5F5F5',
    flex: 1,
  },
  headerContainer: {
    marginBottom: 25,
    marginLeft: 20,
  },
  findYour: {
    fontSize: 20,
    color: '#333',
    fontFamily: 'Poppins-Normal',
  },
  perfectJob: {
    fontSize: 28,
    color: '#333',
    fontFamily: 'Poppins-Bold',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  searchBar: {
    flex: 1,
    backgroundColor: '#FFF',
    borderRadius: 25,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  searchIcon: {
    position: 'absolute',
    right: 20,
  },
  jobCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 8,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  jobDetails: {
    flex: 1,
    marginRight: 10,
  },
  jobTitle: {
    fontSize: 19,
    fontFamily: 'Poppins-Bold',
    color: '#333',
  },
  jobInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8, // Corrected marginBottom to a number
  },
  jobLocation: {
    fontSize: 13,
    color: '#666',
    marginLeft: 8,
    marginTop: 5,
    fontFamily: 'Poppins-Normal',
  },
  jobSalary: {
    fontSize: 13,
    color: '#333',
    marginLeft: 8,
    fontFamily: 'Poppins-Normal',
  },
  jobTags: {
    flexDirection: 'row',
    marginBottom: 10, // Corrected marginBottom to a number
  },
  jobTag: {
    fontSize: 12,
    color: '#FFF',
    backgroundColor: '#385396',
    borderRadius: 4, // Corrected borderRadius to a number
    paddingVertical: 4,
    paddingHorizontal: 8,
    marginRight: 8,
    fontFamily: 'Poppins-Normal',
  },
  requirementsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 80, // Corrected marginTop to a number
  },
  ApplyText: {
    fontSize: 16,
    color: '#e81a07',
    marginRight: 3, // Corrected marginRight to a number
     // Corrected marginTop to a number
    fontFamily: 'Poppins-LightBold',
  },
  detailContainer: {
    flex: 1,
    padding: 16, // Corrected padding to a number
    backgroundColor: '#FFF',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8, // Corrected marginBottom to a number
  },
  location: {
    fontSize: 18,
    color: '#666',
    marginBottom: 8, // Corrected marginBottom to a number
  },
  salary: {
    fontSize: 18,
    color: '#666',
    marginBottom: 8, // Corrected marginBottom to a number
  },
  type: {
    fontSize: 18,
    color: '#666',
    marginBottom: 8, // Corrected marginBottom to a number
  },
  level: {
    fontSize: 18,
    color: '#666',
    marginBottom: 8, // Corrected marginBottom to a number
  },
  createJobButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#E81A07',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
  },
  createJobText: {
    color: '#FFF',
    fontSize: 16,
    marginRight: 7,
    marginTop:2,
    fontFamily:'Poppins-Bold',
    },
  createJobContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AdminJobs;

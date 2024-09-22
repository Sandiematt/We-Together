import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput ,ActivityIndicator} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import JobDetail from './JobsDetail';

const Stack = createStackNavigator();

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
      onPress={() => navigation.navigate('JobDetail', { job: item })}
    >
      <Text style={styles.ApplyText}>Apply Now</Text>
      <Icon name="chevron-forward" size={23} color="#e81a07" />
    </TouchableOpacity>
  </View>
);

const JobList = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://boss-turkey-happily.ngrok-free.app/jobs') // Replace with your server URL if needed
      .then((response) => response.json())
      .then((data) => {
        setJobs(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching jobs:', error);
        setLoading(false);
      });
  }, []);

  const filteredJobs = jobs.filter((job) =>
    job.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#007BFF" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.findYour}>Find Your</Text>
        <Text style={styles.perfectJob}>Perfect Job!</Text>
      </View>
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
        keyExtractor={(item) => item._id} // MongoDB generates _id field
        renderItem={({ item }) => <JobItem item={item} navigation={navigation} />}
      />
    </View>
  );
};

const JobApp = () => {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator>
        <Stack.Screen name="JobList" component={JobList} options={{ headerShown: false }} />
        <Stack.Screen 
          name="JobDetail" 
          component={JobDetail} 
          options={({ route }) => ({ title: '' })}
        />
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
    marginRight: 60,
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
    marginBottom: 8,
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
    marginBottom: 10,
  },
  jobTag: {
    fontSize: 12,
    color: '#FFF',
    backgroundColor: '#385396',
    borderRadius: 4,
    paddingVertical: 4,
    paddingHorizontal: 8,
    marginRight: 8,
    fontFamily: 'Poppins-Normal',
  },
  requirementsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 80,
  },
  ApplyText: {
    fontSize: 16,
    color: '#e81a07',
    marginRight: 3,
    marginTop: 2,
    fontFamily: 'Poppins-LightBold',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default JobApp;

import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const JobList = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Recent Job List</Text>
        <TouchableOpacity>
          <Text style={styles.seeAllText}>See all</Text>
        </TouchableOpacity>
      </View>
      <ScrollView>
        <View style={styles.jobCard}>
          <Image source={{ uri: 'amazon_logo_url' }} style={styles.logo} />
          <View style={styles.jobInfo}>
            <Text style={styles.companyName}>Amazon</Text>
            <Text style={styles.jobTitle}>Data Analyst</Text>
            <Text style={styles.salary}>8.000.000 - 12.000.000</Text>
            <View style={styles.tagsContainer}>
              <Text style={styles.tag}>Remote</Text>
              <Text style={styles.tag}>Intermediate</Text>
              <Text style={styles.tag}>Full Time</Text>
            </View>
          </View>
          <FontAwesome name="bookmark-o" size={24} color="black" style={styles.bookmarkIcon} />
        </View>

        <View style={styles.jobCard}>
          <Image source={{ uri: 'webflow_logo_url' }} style={styles.logo} />
          <View style={styles.jobInfo}>
            <Text style={styles.companyName}>Webflow</Text>
            <Text style={styles.jobTitle}>Web Developer</Text>
            <Text style={styles.salary}>8.000.000 - 12.000.000</Text>
            <View style={styles.tagsContainer}>
              <Text style={styles.tag}>Remote</Text>
              <Text style={styles.tag}>Intermediate</Text>
              <Text style={styles.tag}>Full Time</Text>
            </View>
          </View>
          <FontAwesome name="bookmark-o" size={24} color="black" style={styles.bookmarkIcon} />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  seeAllText: {
    color: '#f2994a',
  },
  jobCard: {
    backgroundColor: '#fff',
    padding: 16,
    margin: 16,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 16,
  },
  jobInfo: {
    flex: 1,
  },
  companyName: {
    color: '#f2994a',
  },
  jobTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  salary: {
    color: '#828282',
  },
  tagsContainer: {
    flexDirection: 'row',
    marginTop: 8,
  },
  tag: {
    backgroundColor: '#e0e0e0',
    borderRadius: 12,
    paddingVertical: 4,
    paddingHorizontal: 8,
    marginRight: 8,
  },
  bookmarkIcon: {
    marginLeft: 16,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 16,
    backgroundColor: '#fff',
  },
});

export default JobList;

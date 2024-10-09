import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Dimensions, BackHandler, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

export default function LoanStatus() {
    const [loanDetails, setLoanDetails] = useState(null); // To hold the loan details
    const [applicantDetails, setApplicantDetails] = useState(null); // To hold the applicant details
    const [loading, setLoading] = useState(true);
    const [username, setUsername] = useState('');
    const navigation = useNavigation();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const storedUsername = await AsyncStorage.getItem('username'); 
                if (storedUsername) {
                    // Fetch user data from API using the stored username
                    const response = await axios.get(`https://boss-turkey-happily.ngrok-free.app/users/${storedUsername}`);
                    setUsername(response.data.username); // Set username from API response
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, []);

    useEffect(() => {
        const fetchLoanData = async () => {
            if (!username) return; // Don't fetch data until username is available
    
            try {
                // Fetching the applicant details based on the username
                const applicantResponse = await axios.get(`https://boss-turkey-happily.ngrok-free.app/loanapplicants?name=${encodeURIComponent(username)}`);
                const applicants = applicantResponse.data;
    
               
                if (applicants.length > 0) {
                    setApplicantDetails(applicants[0]); // Assuming you want the first applicant
    
                    // Fetching the loan details based on the loan title of the applicant
                    const loanResponse = await axios.get(`https://boss-turkey-happily.ngrok-free.app/loanss?title=${encodeURIComponent(applicants[0].loantitle)}`);
                    const loans = loanResponse.data.loans; // Access the loans array from the response
    
                  
                    if (loans && loans.length > 0) {
                        setLoanDetails(loans[0]); // Set the first loan in the list
                    }
                }
            } catch (error) {
                console.error('Error fetching loan status:', error);
            } finally {
                setLoading(false); // Set loading to false after fetching
            }
        };
    
        fetchLoanData();
    }, [username]); // Run this effect when the username changes

    const handleBackPress = () => {
        navigation.goBack();
        return true;
    };

    useEffect(() => {
        const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackPress);
        return () => backHandler.remove();
    }, []);

    if (loading) {
        return (
            <View style={styles.container}>
                <Text>Loading...</Text>
            </View>
        );
    }

    if (applicantDetails && loanDetails) {
        return (
            <View style={styles.container}>
                <TouchableOpacity style={styles.loanContainer} disabled>
                    <View style={styles.headingContainer}>
                        <Text style={styles.loanTitle}>{loanDetails.title}</Text>
                        <Text style={styles.loanDescription}>
                            {loanDetails.description}
                        </Text>
                    </View>
                    <View style={styles.separator} />
                    <View style={styles.amountContainer}>
                        <View style={styles.amountDetails}>
                            <Text style={styles.amountLabel}>Loan Amount</Text>
                            <Text style={styles.amountValue}>₹ {loanDetails.amount}</Text>
                        </View>
                        <View style={styles.interestContainer}>
                            <Text style={styles.interestLabel}>Interest Rate</Text>
                            <Text style={styles.interestValue}>{loanDetails.interest}</Text>
                        </View>
                    </View>
                    <View style={styles.statusContainer}>
                        <Text style={styles.statusLabel}>Status: </Text>
                        {applicantDetails.status === 'Approved' ? (
                            <Text style={styles.loanPaid}>Approved</Text>
                        ) : (
                            <Text style={styles.loanNotPaid}>Rejected</Text>
                        )}
                    </View>
                </TouchableOpacity>
            </View>
        );
    } else {
        return (
            <View style={styles.noLoansContainer}>
                <Text style={styles.noLoansText}>No Loan Details Found</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        paddingBottom: 2,
    },
    statusContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    statusLabel: {
        fontFamily: 'Poppins-Bold',
        fontSize: 20,
        color: '#1A1110',
    },
    loanPaid: {
        fontFamily: 'Poppins-Normal',
        fontSize: 20,
        color: '#38E038',
        marginLeft: 10,
    },
    loanNotPaid: {
        fontFamily: 'Poppins-Normal',
        fontSize: 20,
        color: 'red',
        marginLeft: 10,
    },
    loanContainer: {
        elevation: 10,
        shadowOffset: { width: 0, height: 3 },
        backgroundColor: 'white',
        borderRadius: 20,
        marginLeft: 20,
        marginTop: 30,
        width: width - 40,
        height: height - 440,
    },
    headingContainer: {
        flexDirection: 'column',
    },
    loanTitle: {
        fontSize: 24,
        fontFamily: 'Poppins-Bold',
        marginTop: 20,
        marginLeft: 20,
        color: '#1A1110',
    },
    loanDescription: {
        fontSize: 14,
        fontFamily: 'Poppins-Normal',
        marginTop: 5,
        marginLeft: 20,
        color: '#808080',
    },
    separator: {
        height: 1.2,
        width: width - 40,
        backgroundColor: '#d3d3d3',
        marginTop: 20,
        borderRadius: 20,
    },
    amountContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 20,
    },
    amountDetails: {
        flexDirection: 'column',
        marginLeft: 20,
    },
    amountLabel: {
        fontSize: 15,
        fontFamily: 'Poppins-Normal',
        color: 'grey',
    },
    amountValue: {
        fontSize: 25,
        fontFamily: 'Poppins-Bold',
        color: 'black',
    },
    interestContainer: {
        flexDirection: 'column',
        marginRight: 20,
        alignItems: 'flex-end',
    },
    interestLabel: {
        fontSize: 15,
        fontFamily: 'Poppins-Normal',
        color: 'grey',
    },
    interestValue: {
        fontSize: 25,
        fontFamily: 'Poppins-Bold',
        color: 'black',
        marginRight: 15,
    },
    noLoansContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    noLoansText: {
        fontFamily: 'Poppins-Normal',
        fontSize: 20,
        color: 'black',
    },
});

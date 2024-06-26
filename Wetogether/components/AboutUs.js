import React, { useEffect } from 'react';
import { View, Text, ScrollView,  Dimensions, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default function AboutUs() {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>About Us</Text>
                <Image  style={styles.icon} /> 
            </View>

            <View style={styles.developersSection}>
                <Text style={styles.developersTitle}> Developers</Text>
                <View style={styles.developersList}>
                    <View style={styles.developerContainer}>
                        <Image style={styles.dev} />
                        <Text style={styles.devName}>Sandeep Mathew</Text>
                    </View>
                    <View style={styles.developerContainer}>
                        <Image style={styles.dev} />
                        <Text style={styles.devName}>Greeshma Girish C</Text>
                    </View>
                    <View style={styles.developerContainer}>
                        <Image  style={styles.dev} />
                        <Text style={styles.devName}>Abraham Richard</Text>
                    </View>
                </View>
            </View>

            <View style={styles.box}>
                <ScrollView contentContainerStyle={{ height: height }} showsVerticalScrollIndicator={false}>
                    <Text style={styles.aboutText}>
                        */here goes the about
                    </Text>
                </ScrollView>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        backgroundColor: 'white',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        marginTop: 20,
        width: width,
    },
    backButton: {
        marginLeft: 20,
        marginTop: 15,
        justifyContent: 'center',
        alignContent: 'center',
        elevation: 8,
        width: 45,
        height: 45,
        borderRadius: 50,
        backgroundColor: 'white',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
    },
    backButtonImage: {
        height: 20,
        width: 20,
        alignSelf: 'center',
    },
    title: {
      
        fontSize: 30,
        color: 'black',
        marginTop: 0,
        marginBottom:80,
        marginLeft: 130,
    },
    icon: {
        height: 100,
        width: 100,
        marginTop: 10,
    },
    developersSection: {
        height: 150,
        width: width,
        alignSelf: 'center',
    },
    developersTitle: {
        
        fontSize: 20,
        marginLeft: 20,
        color: "black",
    },
    developersList: {
        flexDirection: 'row',
        marginLeft: "2.3%",
    },
    developerContainer: {
        flexDirection: 'column',
    },
    dev: {
        height: 100,
        width: 100,
        marginTop: 10,
        marginLeft: 20,
        borderRadius: 50,
    },
    devName: {
        fontSize: 15,
        alignSelf: 'center',
        marginLeft: 20,
        marginTop: 5,
        color: "black",
    },
    box: {
        width: '90%',
        height: '60%',
        borderRadius: 10,
        backgroundColor: '#FFFFFF',
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        elevation: 4,
        padding: 20,
        marginTop: 25,
        alignSelf: 'center',
    },
    aboutText: {
        fontSize: 15,
        lineHeight: 23,
        color: '#000',
        
    },
});

import React from 'react';
import { View, Text, ScrollView, Dimensions, Image, StyleSheet } from 'react-native';


const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default function AboutUs() {
   
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>About Us</Text>
                <Image style={styles.icon} />
            </View>

            <View style={styles.developersSection}>
                <Text style={styles.developersTitle}>Developers</Text>
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
                        <Image style={styles.dev} />
                        <Text style={styles.devName}>Abraham Richard</Text>
                    </View>
                </View>
            </View>
            <View style={styles.box}>
                <ScrollView contentContainerStyle={styles.scrollView} showsVerticalScrollIndicator={false}>
                    <Text style={styles.aboutText}>
                        Here goes the about text.
                    </Text>
                </ScrollView>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
    title: {
        fontSize: 30,
        color: 'black',
        left:110,
        fontFamily: 'Poppins-Bold',
    },
    icon: {
        height: 100,
        width: 100,
        marginRight: 20,
    },
    developersSection: {
        width: width,
        alignSelf: 'center',
        marginTop: 20,
    },
    developersTitle: {
        fontSize: 20,
        marginLeft: 20,
        color: 'black',
        fontFamily: 'Poppins-Bold',
    },
    developersList: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 10,
    },
    developerContainer: {
        alignItems: 'center',
    },
    dev: {
        height: 100,
        width: 100,
        borderRadius: 50,
    },
    devName: {
        fontSize: 15,
        marginTop: 5,
        color: 'black',
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
    scrollView: {
        flexGrow: 1,
    },
    aboutText: {
        fontSize: 15,
        lineHeight: 23,
        color: '#000',
    },
});

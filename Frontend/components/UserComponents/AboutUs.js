import React, { useState } from 'react';
import { View, Text, ScrollView, Dimensions, Image, StyleSheet, Modal, TouchableOpacity } from 'react-native';

// Import the images
import SandeepImage from '../../assets/sandeep.jpg';
import GreeshmaImage from '../../assets/greeshma.jpg';
import AbrahamImage from '../../assets/abraham.jpg';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default function AboutUs() {
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    const handleImagePress = (image) => {
        setSelectedImage(image);
        setModalVisible(true);
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>About Us</Text>
                <Image style={styles.icon} />
            </View>

            <View style={styles.developersSection}>
                <Text style={styles.developersTitle}>Developers</Text>
                <View style={styles.developersList}>
                    <TouchableOpacity onPress={() => handleImagePress(SandeepImage)}>
                        <View style={styles.developerContainer}>
                            <Image style={styles.dev} source={SandeepImage} />
                            <Text style={styles.devName}>Sandeep Mathew</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleImagePress(GreeshmaImage)}>
                        <View style={styles.developerContainer}>
                            <Image style={styles.dev} source={GreeshmaImage} />
                            <Text style={styles.devName}>Greeshma Girish</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleImagePress(AbrahamImage)}>
                        <View style={styles.developerContainer}>
                            <Image style={styles.dev} source={AbrahamImage} />
                            <Text style={styles.devName}>Abraham Richard</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.box}>
                <ScrollView >
                    <Text style={styles.aboutText}>
                    We Together aims to address these challenges by establishing a robust self-help group
(SHG) platform that prioritizes women's empowerment while including men. The
initiative seeks to provide a supportive ecosystem where women can develop
entrepreneurial skills, access financial resources, and participate actively in decisionmaking processes. By leveraging the collective strength of SHGs, 'We Together' aims to
foster economic independence and social cohesion among participants.
                    </Text>
                </ScrollView>
            </View>
            {selectedImage && (
                <Modal
                    visible={modalVisible}
                    transparent={true}
                    onRequestClose={() => setModalVisible(false)}
                >
                    <View style={styles.modalContainer}>
                        <TouchableOpacity
                            style={styles.modalBackground}
                            onPress={() => setModalVisible(false)}
                        >
                            <Image style={styles.fullScreenImage} source={selectedImage} />
                        </TouchableOpacity>
                    </View>
                </Modal>
            )}
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
        left: 110,
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
        fontSize: 13,
        marginTop: 5,
        color: 'black',
        fontFamily:'Poppins-Normal',
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
    scrollViewContent: {
        flexGrow: 1,
    },
    aboutText: {
        fontSize: 15,
        lineHeight: 23,
        color: '#000',
        fontFamily:'Poppins-Normal',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
    },
    modalBackground: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    fullScreenImage: {
        width: '90%',
        height: '90%',
        resizeMode: 'contain',
    },
});

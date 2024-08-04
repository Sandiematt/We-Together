import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, TextInput, FlatList, StyleSheet, Platform, PermissionsAndroid } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Icon from 'react-native-vector-icons/Ionicons';

const Forum = () => {
  const [newPost, setNewPost] = useState('');
  const [newImage, setNewImage] = useState(null);
  const [posts, setPosts] = useState([
    {
      id: '1',
      user: 'Jessica Wang',
      content: 'Just had my annual checkup, and my cholesterol levels are higher than I expected. Any tips on lowering it?',
      image: 'https://www.sportico.com/wp-content/uploads/2020/09/0911_IMG.jpg',
      likes: [], 
    },
    {
      id: '2',
      user: 'Wade Warren',
      content: 'Good morning everyone! Starting my day with a nutritious breakfast and a quick jog. Remember, small steps lead to big changes! #HealthyLiving',
      image: 'https://www.sportico.com/wp-content/uploads/2020/09/0911_IMG.jpg',
      likes: [], 
    },
  ]);

  const requestPermission = async () => {
    if (Platform.OS === 'android') {
      return await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      );
    }
  };

  const handleSelectImage = async () => {
    if (Platform.OS === 'android') {
      const permission = await requestPermission();
      if (permission !== PermissionsAndroid.RESULTS.GRANTED) {
        alert("Permission denied");
        return;
      }
    }
    
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!pickerResult.canceled) {
      setNewImage(pickerResult.assets[0].uri);
    }
  };

  const handlePost = () => {
    if (newPost.trim() || newImage) {
      const newPostData = {
        id: (posts.length + 1).toString(),
        user: 'Current User', 
        content: newPost,
        image: newImage,
        likes: [], // Initialize likes array for new post
      };
      setPosts([newPostData, ...posts]);
      setNewPost('');
      setNewImage(null);
    }
  };

  const handleLike = (postId) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, likes: [...post.likes, 'Current User'] } // Add user to likes array
        : post
    ));
  };

  const renderPost = ({ item }) => (
    <View style={styles.postContainer}>
      <View style={styles.header}>
        <Text style={styles.username}>{item.user}</Text>
      </View>
      <Text style={styles.content}>{item.content}</Text>
      {item.image && <Image source={{ uri: item.image }} style={styles.image} />}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.likeButton} onPress={() => handleLike(item.id)}>
          <Icon name="heart" size={24} color="red" />
          <Text style={styles.likesCount}>{item.likes.length}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.headerContainer}>
        
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="What do you think right now?"
            value={newPost}
            onChangeText={setNewPost}
          />
          <TouchableOpacity style={styles.iconButton} onPress={handleSelectImage}>
            <Icon name="camera" size={30} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.postButton, (newPost.trim() || newImage) ]}
            onPress={handlePost}
            disabled={!newPost.trim() && !newImage}
          >
            <Text style={styles.postButtonText}>Post</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Text style={styles.postMessage}></Text>
      <Text style={styles.postMessage}>   New Posts </Text>
      {newImage && <Image source={{ uri: newImage }} style={styles.selectedImage} />}
      {/* Posts Section */}
      <FlatList
        data={posts}
        renderItem={renderPost}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  headerContainer: {
    backgroundColor: '#024578',
    padding: 20,
    paddingTop: 50,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  greeting: {
    fontSize: 26,
    color: 'white',
    fontWeight: 'bold',
    fontFamily:'Poppins-Bold',
  },
  welcomeMessage: {
    fontSize: 16,
    color: 'white',
    fontFamily:'Poppins-Normal',
    marginBottom: 10,
  },
  postMessage: {
    fontSize:22,
    color: 'black',
    fontFamily:'Poppins-Bold',
    marginBottom: 10,
    marginRight: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  searchInput: {
    flex: 1,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    marginRight: 10,
  },
  postButton: {
    backgroundColor: '#E53E3E',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  postButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  iconButton: {
    marginRight: 10,
  },
  postContainer: {
    padding: 10,
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  username: {
    fontWeight: 'bold',
  },
  content: {
    marginVertical: 10,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginVertical: 10,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  likeButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  likesCount: {
    marginLeft: 5,
  },
  selectedImage: {
    width: 100,
    height: 100,
    marginBottom: 10,
    alignSelf: 'center',
  },
});

export default Forum;

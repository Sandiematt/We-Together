import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, TextInput, FlatList, StyleSheet, Platform, PermissionsAndroid } from 'react-native';
import * as ImagePicker from 'expo-image-picker'; // For Expo projects
import { FontAwesome } from '@expo/vector-icons';

const Forum = () => {
  const [newPost, setNewPost] = useState('');
  const [newImage, setNewImage] = useState(null);
  const [posts, setPosts] = useState([
    {
      id: '1',
      user: 'Jessica Wang',
      time: '28 minutes ago',
      content: 'Just had my annual checkup, and my cholesterol levels are higher than I expected. Any tips on lowering it?',
      image: null,
      likes: 12023,
    },
    {
      id: '2',
      user: 'Wade Warren',
      time: '58 minutes ago',
      content: 'Good morning everyone! Starting my day with a nutritious breakfast and a quick jog. Remember, small steps lead to big changes! #HealthyLiving',
      image: 'https://example.com/breakfast.jpg',
      likes: 19028,
    },
    // Add more posts as needed
  ]);

  // Request permission to access the media library
  const requestPermission = async () => {
    if (Platform.OS === 'android') {
      return await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: "Permission Explanation",
          message: "App needs to access your photos",
        }
      );
    }
  };

  // Handle image selection from the gallery
  const handleSelectImage = async () => {
    const permission = await requestPermission();
    if (permission === PermissionsAndroid.RESULTS.GRANTED || Platform.OS === 'ios') {
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

      if (!pickerResult.cancelled) {
        setNewImage(pickerResult.uri);
      }
    } else {
      alert("Permission denied");
    }
  };

  // Handle posting new content
  const handlePost = () => {
    if (newPost.trim() || newImage) {
      const newPostData = {
        id: (posts.length + 1).toString(),
        user: 'Current User', // Replace with actual user data
        time: 'Just now',
        content: newPost,
        image: newImage,
        likes: 0,
      };
      setPosts([newPostData, ...posts]);
      setNewPost('');
      setNewImage(null);
    }
  };

  // Render individual post
  const renderPost = ({ item }) => (
    <View style={styles.postContainer}>
      <View style={styles.header}>
        <Text style={styles.username}>{item.user}</Text>
        <Text style={styles.time}>{item.time}</Text>
      </View>
      <Text style={styles.content}>{item.content}</Text>
      {item.image && <Image source={{ uri: item.image }} style={styles.image} />}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.likeButton}>
          <FontAwesome name="thumbs-up" size={24} color="blue" />
          <Text style={styles.likesCount}>{item.likes}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.postInputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="What do you think right now?"
          value={newPost}
          onChangeText={setNewPost}
        />
        <TouchableOpacity style={styles.iconButton} onPress={handleSelectImage}>
          <FontAwesome name="camera" size={24} color="blue" />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.postButton, newPost.trim() || newImage ? styles.postButtonActive : styles.postButtonInactive]}
          onPress={handlePost}
          disabled={!newPost.trim() && !newImage}
        >
          <Text style={styles.postButtonText}>Post</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={posts}
        renderItem={renderPost}
        keyExtractor={item => item.id}
        ListHeaderComponent={
          <View style={styles.trendingContainer}>
            <Text style={styles.trendingText}>Trending Thread</Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  postInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
  },
  textInput: {
    flex: 1,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
  },
  iconButton: {
    marginRight: 10,
  },
  postButton: {
    borderRadius: 5,
    padding: 10,
  },
  postButtonActive: {
    backgroundColor: '#007bff',
  },
  postButtonInactive: {
    backgroundColor: '#b0c4de',
  },
  postButtonText: {
    color: '#fff',
  },
  trendingContainer: {
    padding: 10,
    backgroundColor: '#d3e3ff',
  },
  trendingText: {
    fontWeight: 'bold',
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
  time: {
    color: '#777',
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
});

export default Forum;

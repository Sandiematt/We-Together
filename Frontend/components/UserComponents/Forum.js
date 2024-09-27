import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, TextInput, FlatList, StyleSheet, Platform, PermissionsAndroid } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Icon from 'react-native-vector-icons/Ionicons';

const Forum = () => {
  const [newPost, setNewPost] = useState('');
  const [newImage, setNewImage] = useState(null);
  const [posts, setPosts] = useState([]);
  const [currentUser, setCurrentUser] = useState(''); // State for the current user's name

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch('https://boss-turkey-happily.ngrok-free.app/posts');
      if (!response.ok) throw new Error(`Error fetching posts: ${response.status}`);
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error('fetchPosts Error:', error.message);
    }
  };

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

  const handlePost = async () => {
    if (newPost.trim() || newImage) {
      const newPostData = {
        user: 'Sanjay ', 
        content: newPost,
        image: newImage,
      };

      try {
        const response = await fetch('https://boss-turkey-happily.ngrok-free.app/posts', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newPostData),
        });

        if (!response.ok) throw new Error(`Error posting: ${response.status}`);

        const data = await response.json();
        setPosts([data, ...posts]);
        setNewPost('');
        setNewImage(null);
      } catch (error) {
        console.error('handlePost Error:', error.message);
      }
    }
  };

  const handleLike = async (postId) => {
    try {
      // Send like request to the server
      const response = await fetch(`https://boss-turkey-happily.ngrok-free.app/posts/${postId}/like`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user: currentUser }), // Pass the current user's name
      });

      if (!response.ok) throw new Error(`Error liking post: ${response.status}`);
      
      // Update the local state with the new likes
      const updatedPosts = posts.map(post => {
        if (post._id === postId) {
          const likes = Array.isArray(post.likes) ? post.likes : [];
          const isLiked = likes.includes(currentUser);
          return {
            ...post,
            likes: isLiked ? likes.filter(user => user !== currentUser) : [...likes, currentUser],
          };
        }
        return post;
      });
      setPosts(updatedPosts);
    } catch (error) {
      console.error('handleLike Error:', error.message);
    }
  };

  const renderPost = ({ item }) => (
    <View style={styles.postContainer}>
      <View style={styles.header}>
        <Text style={styles.username}>{item.user}</Text>
      </View>
      <Text style={styles.content}>{item.content}</Text>
      {item.image && <Image source={{ uri: item.image }} style={styles.image} />}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.likeButton} onPress={() => handleLike(item._id)}>
          <Icon name="heart" size={24} color="red" />
          <Text style={styles.likesCount}>{item.likes ? item.likes.length : 0}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}> 
      <View style={styles.headerContainer}>
      <Text style={styles.headerText}>Share your thoughts</Text>
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
            style={[styles.postButton, { opacity: (newPost.trim() || newImage) ? 1 : 0.5 }]}
            onPress={handlePost}
            disabled={!newPost.trim() && !newImage}
          >
            <Text style={styles.postButtonText}>Post</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Text style={styles.postMessage}>New Posts</Text>
      {newImage && <Image source={{ uri: newImage }} style={styles.selectedImage} />}
      <FlatList
        data={posts}
        renderItem={renderPost}
        keyExtractor={item => item._id} // Ensure each item has a unique key
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0,
    backgroundColor: '#f5f5f5',
    marginTop:0,
    padding:0,
  },
  postContainer: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  username: {
    fontWeight: 'bold',
  },
  content: {
    marginVertical: 5,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginTop: 10,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  likeButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  likesCount: {
    marginLeft: 5,
  },
  headerContainer: {
    backgroundColor: '#024578',
    padding: 20,
    paddingTop: 50,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'left',
    marginBottom: 10,
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
  iconButton: {
    marginRight: 10,
  },
  postButton: {
    backgroundColor: '#E53E3E',
    padding: 13,
    borderRadius: 10,
    alignItems: 'center',
  },
  postButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  postMessage: {
    fontSize: 20,
    fontWeight: 'bold',
    padding: 10,
  },
  selectedImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginVertical: 10,
  },
});

export default Forum;  
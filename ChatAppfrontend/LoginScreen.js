import React, { useState } from 'react';
import { ImageBackground } from 'react-native';
import { Dimensions } from 'react-native';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (username.trim() && password.trim()) {
        navigation.navigate('Chat'); // Navigate to ChatScreen
    } else {
        alert('Please enter valid username and password');
    }
};
    
const { width, height } = Dimensions.get('window');


  return (
    

    <ImageBackground source={require('./assets/background.jpg')} style={styles.container} resizeMode='cover'>
        <Text style={styles.header}>Login</Text>
        <TextInput
            style={styles.input}
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
        />
        <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true}
        />
        <Button title="Login" onPress={handleLogin} style={styles.button} />
    </ImageBackground>
);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  header: {
    fontSize: 28,
    marginBottom: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  input: {
    width: '100%',
    height: 45,
    borderColor: '#4caf50',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: '#fff',
    elevation:2,
    color: '#000',
   },
   button: {
    width: '100%',
    borderRadius:10,
   },
  });
  

export default LoginScreen;

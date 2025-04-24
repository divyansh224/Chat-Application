import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, FlatList, Text, StyleSheet } from 'react-native';
import { io } from 'socket.io-client';

const ChatScreen = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const socket = io('http://localhost:3000'); // Replace localhost with your backend server URL

  useEffect(() => {
    // Listen for incoming messages from the backend
    socket.on('chat message', (msg) => {
      const currentTimestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      setMessages((prevMessages) => [...prevMessages, { text: msg, time: currentTimestamp }]);
    });

    return () => {
      // Disconnect socket when component unmounts
      socket.disconnect();
    };
  }, []);

  const sendMessage = () => {
    if (input.trim()) {
      const currentTimestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const messageData = { text: input, time: currentTimestamp };

      // Emit message to the server
      socket.emit('chat message', messageData.text);

      // Add message locally with timestamp
      setMessages((prevMessages) => [...prevMessages, messageData]);
      setInput('');
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.messageContainer}>
            <Text style={styles.message}>{item.text}</Text>
            <Text style={styles.timestamp}>{item.time}</Text>
          </View>
        )}
      />
      <TextInput
        style={styles.input}
        value={input}
        onChangeText={setInput}
        placeholder="Type your message"
      />
      <Button title="Send" onPress={sendMessage} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f8f8f8',
  },
  messageContainer: {
    marginVertical: 5,
    padding: 10,
    backgroundColor: '#dcdcdc',
    borderRadius: 5,
  },
  message: {
    fontSize: 16,
    color: '#333',
  },
  timestamp: {
    fontSize: 12,
    color: '#666',
    textAlign: 'right',
    marginTop: 5,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
});

export default ChatScreen;
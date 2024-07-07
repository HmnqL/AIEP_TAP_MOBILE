import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, TextInput, Button, Alert } from 'react-native';
import { router } from 'expo-router';


const ThemedInputText: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleSignIn = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password');
      return;
    }

    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);

    try {
      const response = await fetch('http://192.168.56.1:3000/api/auth/signin', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        Alert.alert('Success', 'Signed in successfull NATIVE');
        console.log(JSON.stringify(data))
        router.navigate("/dashboard/interface")
      } else {
        Alert.alert('Error', data.message || 'Failed to sign in');
      }
    } catch (error) {
      console.error('Sign-in error:', error);
      Alert.alert('Error', 'Failed to sign in');
    }
  };

  return (
    <SafeAreaView>
      <TextInput
        style={styles.input}
        onChangeText={setEmail}
        value={email}
        placeholder="Username or Email"
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        onChangeText={setPassword}
        value={password}
        placeholder="Password"
        keyboardType="default"
        secureTextEntry
      />
      <Button title="Sign In" onPress={handleSignIn} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export default ThemedInputText;

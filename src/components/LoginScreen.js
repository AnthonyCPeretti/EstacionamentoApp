import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import RNFS from 'react-native-fs';

const LoginScreen = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    const path = RNFS.DocumentDirectoryPath + '/users.json';
    const fileContent = await RNFS.readFile(path, 'utf8');
    const userData = JSON.parse(fileContent);

    const user = userData.users.find((user) => user.username === username && user.password === password);

    if (user) {
      navigation.navigate('Home');
    } else {
      alert('Usuário ou senha inválidos');
    }
  };

  useEffect(() => {
    const createUsersJsonFile = async () => {
      const path = RNFS.DocumentDirectoryPath + '/users.json';
      const fileExists = await RNFS.exists(path);

      if (!fileExists) {
        const initialData = {
          users: [
            {
              username: 'Anthony',
              password: '123456',
            },
            {
              username: 'user2',
              password: 'password2',
            },
            {
              username: 'user3',
              password: 'password3',
            },
          ],
        };

        await RNFS.writeFile(path, JSON.stringify(initialData), 'utf8');
      }
    };

    createUsersJsonFile();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Bem Vindo</Text>
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Estacionamento</Text>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Usuário"
        value={username}
        onChangeText={text => setUsername(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry={true}
        value={password}
        onChangeText={text => setPassword(text)}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f2f2f2',
  },
  titleContainer: {
    backgroundColor: '#00bfa5',
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  input: {
    width: '80%',
    height: 40,
    backgroundColor: 'white',
    marginBottom: 10,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  button: {
    width: '80%',
    height: 40,
    backgroundColor: '#00bfa5',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default LoginScreen;

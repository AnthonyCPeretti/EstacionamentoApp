import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';

const HomePage = () => {
  const [entrada, setEntrada] = useState('');
  const [saida, setSaida] = useState('');

  const handleEntradaChange = (text) => {
    setEntrada(text);
  };

  const handleSaidaChange = (text) => {
    setSaida(text);
  };

  const handleAdicionarPlaca = () => {
    // Lógica para adicionar a placa
    console.log('Adicionar placa:', entrada);
    setEntrada('');
  };

  const handleRemoverPlaca = () => {
    // Lógica para remover a placa
    console.log('Remover placa:', saida);
    setSaida('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Entrada</Text>
      <TextInput
        style={styles.input}
        placeholder="Placa de entrada"
        value={entrada}
        onChangeText={handleEntradaChange}
      />
      <TouchableOpacity style={styles.button} onPress={handleAdicionarPlaca}>
        <Text style={styles.buttonText}>Adicionar</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Saída</Text>
      <TextInput
        style={styles.input}
        placeholder="Placa de saída"
        value={saida}
        onChangeText={handleSaidaChange}
      />
      <TouchableOpacity style={styles.button} onPress={handleRemoverPlaca}>
        <Text style={styles.buttonText}>Remover</Text>
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
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
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default HomePage;

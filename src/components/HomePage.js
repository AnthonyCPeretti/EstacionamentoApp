import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, FlatList } from 'react-native';

const HomePage = () => {
  const [entrada, setEntrada] = useState('');
  const [placas, setPlacas] = useState([]);
  const [horaAtual, setHoraAtual] = useState('');
  const [dataAtual, setDataAtual] = useState('');
  const resetData = () => {
    setPlacas([]);
  };

  useEffect(() => {
    const now = new Date();
    const nextResetTime = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0);
    const timeUntilReset = nextResetTime - now;

    const resetTimeout = setTimeout(resetData, timeUntilReset);
    
    return () => {
      clearTimeout(resetTimeout);
    };
  }, []);
  

useEffect(() => {
  const intervalId = setInterval(() => {
    const data = new Date();
    const dia = data.getDate().toString().padStart(2, '0');
    const mes = (data.getMonth() + 1).toString().padStart(2, '0');
    const ano = data.getFullYear();
    const hora = data.getHours().toString().padStart(2, '0');
    const minutos = data.getMinutes().toString().padStart(2, '0');
    setDataAtual(`${dia}/${mes}/${ano} ${hora}:${minutos}`);
  }, 1000);

  return () => {
    clearInterval(intervalId);
  };
}, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const dataAtual = new Date();
      const hora = dataAtual.getHours().toString().padStart(2, '0');
      const minutos = dataAtual.getMinutes().toString().padStart(2, '0');
      setHoraAtual(`${hora}:${minutos}`);
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const handleEntradaChange = (text) => {
    setEntrada(text);
  };

  const handleAdicionarPlaca = () => {
    const novaPlaca = { id: Date.now().toString(), placa: entrada, entrada: getHoraAtual(), saida: '' };
    setPlacas([...placas, novaPlaca]);
    setEntrada('');
  };

  const handleSairPlaca = (id) => {
    const placasAtualizadas = placas.map((placa) => {
      if (placa.id === id) {
        return { ...placa, saida: getHoraAtual() };
      }
      return placa;
    });
    setPlacas(placasAtualizadas);
  };

  const getHoraAtual = () => {
    const dataAtual = new Date();
    const hora = dataAtual.getHours().toString().padStart(2, '0');
    const minutos = dataAtual.getMinutes().toString().padStart(2, '0');
    return `${hora}:${minutos}`;
  };

  const renderPlaca = ({ item }) => {
    return (
      <View style={styles.placaContainer}>
        <Text style={styles.placaText}>{item.placa}</Text>
        <Text style={styles.horaText}>{item.entrada}</Text>
        <TouchableOpacity style={styles.sairButton} onPress={() => handleSairPlaca(item.id)}>
          {item.saida ? (
            <Text style={styles.buttonText}>{item.saida}</Text>
          ) : (
            <Text style={styles.buttonText}>Sair</Text>
          )}
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.dataAtual}>{dataAtual}</Text>
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

      <Text style={styles.title}>Placas de Entrada</Text>
      <View style={styles.table}>
        <View style={styles.tableRow}>
          <Text style={styles.tableHeader}>Placa</Text>
          <Text style={styles.tableHeader}>Hora Entrada</Text>
          <Text style={styles.tableHeader}>Hora Saída</Text>
        </View>
        <FlatList
          data={placas}
          renderItem={renderPlaca}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.placasContainer}
          ListEmptyComponent={<Text>Nenhuma placa de entrada</Text>}
        />
      </View>
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
  horaAtual: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
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
  table: {
    width: '80%',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginTop: 10,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 8,
  },
  tableHeader: {
    flex: 2,
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  placasContainer: {
    flexGrow: 1,
    width: '100%',
    padding: 10,
  },
  placaContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  placaText: {
    flex: 2,
    fontSize: 16,
  },
  horaText: {
    flex: 2,
    fontSize: 16,
    marginLeft: 10,
  },
  sairButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#00bfa5',
    borderRadius: 5,
  },
  dataAtual: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  
});

export default HomePage;

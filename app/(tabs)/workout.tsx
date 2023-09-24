import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, CheckBox } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const WorkoutScreen = () => {
  const [isChecked, setIsChecked] = useState(false);

  // Função para desmarcar o checkbox
  const handleFinalizarTreino = () => {
    setIsChecked(false);
  };

  return (
    <View style={{ flex: 1, paddingBottom: 60, backgroundColor: '#380062' }}>
      <View style={styles.header}>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: '4B0082',
            padding: 10,
          }}
        >
          <Ionicons name="arrow-back" size={24} color="white" />
          <Text style={{ color: 'white', marginLeft: 5 }}>Voltar</Text>
        </TouchableOpacity>
      </View>

      {/* Adicionando o retângulo com checkbox e texto */}
      <View style={styles.rectangle}>
        <View style={styles.checkboxContainer}>
          <CheckBox
            value={isChecked}
            onValueChange={() => setIsChecked(!isChecked)}
          />
        </View>

        <View style={{ flexDirection: 'column' }}>
          <Text style={styles.text}>Nome do exercício</Text>
          <Text style={styles.text}>Quantidade de séries e repetições</Text>
          <Text style={styles.text}>Peso:</Text>
        </View>
      </View>

      {/* Botão "Finalizar Treino" */}
      <TouchableOpacity
        style={styles.finalizarButton}
        onPress={handleFinalizarTreino}
      >
        <Text style={styles.text2} >Finalizar Treino</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#4B0082',
    padding: 10,
  },
  rectangle: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    margin: 10,
  },
  checkboxContainer: {
    marginRight: 10,
  },
  text: {
    fontSize: 16,
    color: 'black',
  },
  text2: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
  finalizarButton: {
    backgroundColor: '#4B0082',
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
    marginTop: 20,
  },
});

export default WorkoutScreen;

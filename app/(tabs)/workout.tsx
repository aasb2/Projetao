import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, TextInput, Dimensions, CheckBox } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Importe o ícone desejado da biblioteca de ícones
import { getAchievementsList } from '../../services/functions/achievements/functionAchievements'; // Substitua pelo caminho correto do seu arquivo getAchievementsList
import appTheme from '../../constants/theme';

const WorkoutScreen = () => {
  const [isChecked, setIsChecked] = useState(false);

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
        <Text style={styles.text}>Texto do Checkbox</Text>
      </View>
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
    backgroundColor: '#FFFFFF', // Cor do retângulo
    borderRadius: 10, // Borda arredondada
    margin: 10, // Espaçamento ao redor do retângulo
  },
  checkboxContainer: {
    marginRight: 10, // Espaçamento entre o checkbox e o texto
  },
  text: {
    fontSize: 16,
    color: 'black',
  },
});

export default WorkoutScreen;

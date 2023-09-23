// Importe as dependências necessárias

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Importe o ícone desejado da biblioteca de ícones

import appTheme from '../../constants/theme';

// Defina o tipo de objeto para os achievements
type Achievement = {
  id: string;
  achievementName: string;
  description: string;
  // Outras propriedades, se necessário
};

const AchievementsTestScreen = () => {
  const [achievements, setAchievements] = useState<Achievement[]>([]);

  useEffect(() => {
    // Função assíncrona para buscar a lista de achievements
    async function fetchAchievements() {
      try {
        // Substitua a próxima linha pela lógica de busca real dos achievements
        const achievementsData: Achievement[] = [
          { id: '1', achievementName: 'Conquista 1', description: 'Descrição da conquista 1' },
          { id: '2', achievementName: 'Conquista 2', description: 'Descrição da conquista 2' },
          // Adicione mais conquistas, se necessário
        ];

        setAchievements(achievementsData);
      } catch (error) {
        console.error('Erro ao buscar a lista de achievements:', error);
        // Trate o erro de acordo com a necessidade
      }
    }

    // Chama a função para buscar os achievements
    fetchAchievements();
  }, []);

  function renderItem({ item }: { item: Achievement }) {
    return (
      <View style={styles.achievementItem}>
        <Text>{item.achievementName}</Text>
        <Text style={styles.achievementDescription}>{item.description}</Text>
      </View>
    );
  }

  function renderHeader() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#380062' }}>
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            backgroundColor: '#4B0082',
            paddingVertical: 20,
            paddingHorizontal: 0,
            zIndex: -1,
          }}
        >
          <View style={styles.fixToText}>
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

            <TouchableOpacity style={styles.button}>
              <Text>Press Here</Text>
            </TouchableOpacity>
            
          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, paddingBottom: 60, backgroundColor: '#E7E7E7' }}>
      {renderHeader()}
      <FlatList
        data={achievements}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
  },
  achievementItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#DDDDDD',
  },
  achievementDescription: {
    fontSize: 16,
    color: 'black',
  },
});

export default AchievementsTestScreen;

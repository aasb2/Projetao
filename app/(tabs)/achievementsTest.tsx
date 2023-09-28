import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, TextInput, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Importe o ícone desejado da biblioteca de ícones
import { getAchievementsList } from '../../services/functions/achievements/functionAchievements'; // Substitua pelo caminho correto do seu arquivo getAchievementsList
import appTheme from '../../constants/theme';
import { background } from 'native-base/lib/typescript/theme/styled-system';

// Defina o tipo de objeto para os achievements
type Achievement = {
  id: string;
  achievementName: string;
  description: string;
  // Outras propriedades, se necessário
};

const AchievementsTestScreen = () => {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [searchText, setSearchText] = useState('');
  const [filteredAchievements, setFilteredAchievements] = useState<Achievement[]>([]);

  useEffect(() => {
    // Função assíncrona para buscar a lista de achievements

    async function fetchAchievements() {
      try {
        const achievementsData = await getAchievementsList();
        setAchievements(achievementsData);
      } catch (error) {
        console.error('Erro ao buscar a lista de achievements:', error);
        // Trate o erro de acordo com a necessidade
      }
    }

  // Chama a função para buscar os achievements
  fetchAchievements();
}, []);

  useEffect(() => {

    // Filtra os achievements com base no texto de pesquisa
    const filtered = achievements.filter((achievement) =>
      achievement.achievementName.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredAchievements(filtered);
  }, [searchText, achievements]);

  // Componente: achievement
  function renderItem({item }: { item: Achievement }) {
    return (
      <View style={styles.achievementItem}>
        {/* <Image source={{ uri: item.imageURL }} style={styles.achievementImage} /> */}
        <Text>{item.achievementName}</Text>
        <Text style={styles.achievementDescription}>{item.description}</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, paddingBottom: 60, backgroundColor: '#380062' }}>

      {/* Header */}
      <View style={styles.header}>
        {/* Botão voltar */}
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: '4B0082',
            padding: 10,
          }}>
          <Ionicons name="arrow-back" size={24} color="white" />
          <Text style={{ color: 'white', marginLeft: 5 }}>Voltar</Text>
        </TouchableOpacity>
      </View>

      {/* Barra de pesquisa */}
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <TextInput
            placeholder="Pesquisar desafio..."
            style={styles.searchInput}
            value={searchText}
            onChangeText={(text) => setSearchText(text)}
            onSubmitEditing={() => {}}
          />
          <TouchableOpacity
            style={styles.searchButton}
            onPress={() => {}}
          >
            <Ionicons name="search" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Lista de achievements */}
      <FlatList
        data={filteredAchievements}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};


// Estilização
const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#4B0082',
    padding: 10,
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
    width: 200,
    height: 200,
    backgroundColor: '#4B0082',
  },
  achievementDescription: {
    fontSize: 16,
    color: 'black',
  },

  searchContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20, // Espaçamento entre a barra de pesquisa e a header
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 20,
    paddingHorizontal: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
  },
  searchButton: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 10,
    marginLeft: 10,
  },

});

export default AchievementsTestScreen;

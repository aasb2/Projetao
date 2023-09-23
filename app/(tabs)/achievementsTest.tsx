import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Importe o ícone desejado da biblioteca de ícones
import { getAchievementsList } from '../../services/functions/achievements/functionAchievements'; // Substitua pelo caminho correto do seu arquivo getAchievementsList
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
  const [searchText, setSearchText] = useState('');
  const [filteredAchievements, setFilteredAchievements] = useState<Achievement[]>([]);

  useEffect(() => {
    // Função assíncrona para buscar a lista de achievements
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
    // async function fetchAchievements() {
    //   try {
    //     // Substitua a próxima linha pela lógica de busca real dos achievements
    //     const achievementsData: Achievement[] = [
    //       { id: '1', achievementName: 'Conquista 1', description: 'Descrição da conquista 1' },
    //       { id: '2', achievementName: 'Conquista 2', description: 'Descrição da conquista 2' },
    //       // Adicione mais conquistas, se necessário
    //     ];

    //     setAchievements(achievementsData);
    //     setFilteredAchievements(achievementsData);
    //   } catch (error) {
    //     console.error('Erro ao buscar a lista de achievements:', error);
    //     // Trate o erro de acordo com a necessidade
    //   }
    // }

    // Chama a função para buscar os achievements
  //   fetchAchievements();
  // }, []);

  useEffect(() => {
    // Filtra os achievements com base no texto de pesquisa
    const filtered = achievements.filter((achievement) =>
      achievement.achievementName.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredAchievements(filtered);
  }, [searchText, achievements]);

  function renderItem({ item }: { item: Achievement }) {
    return (
      <View style={styles.achievementItem}>
        <Text>{item.achievementName}</Text>
        <Text style={styles.achievementDescription}>{item.description}</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, paddingBottom: 60, backgroundColor: '#E7E7E7' }}>
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

        <TouchableOpacity style={styles.button}>
          <Text>Press Here</Text>
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

      <FlatList
        data={filteredAchievements}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -130,
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

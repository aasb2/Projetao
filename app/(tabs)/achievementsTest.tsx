import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  TextInput,
  Dimensions,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getAchievementsList } from '../../services/functions/achievements/functionAchievements';

const { width } = Dimensions.get('window');

const maxRectangleWidth = width * 0.45;
const horizontalSpacing = 10;

type Achievement = {
  id: string;
  achievementName: string;
  description: string;
};

const AchievementsTestScreen = () => {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [searchText, setSearchText] = useState('');
  const [filteredAchievements, setFilteredAchievements] = useState<Achievement[]>([]);
  const [showAchievements, setShowAchievements] = useState(true);
  const [showChallenges, setShowChallenges] = useState(false);

  useEffect(() => {
    async function fetchAchievements() {
      try {
        const achievementsData = await getAchievementsList();
        setAchievements(achievementsData);
      } catch (error) {
        console.error('Erro ao buscar a lista de achievements:', error);
      }
    }

    fetchAchievements();
  }, []);

  useEffect(() => {
    const filtered = achievements.filter((achievement) =>
      achievement.achievementName.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredAchievements(filtered);
  }, [searchText, achievements]);

  function renderItem({ item }: { item: Achievement }) {
    return (
      <View style={styles.achievementItem}>
        <Text style={styles.achievementName}>{item.achievementName}</Text>
        <Text style={styles.achievementDescription}>{item.description}</Text>
      </View>
    );
  }

  const rectangleContents = [
    {
      topText: 'Mora na academia',
      bottomText: '100% de frequência durante 6 meses',
      imageURL: 'URL_DA_SUA_IMAGEM_1',
    },
    {
      topText: 'Ombro de aço',
      bottomText: '50kg no desenvolvimento com barra',
      imageURL: 'URL_DA_SUA_IMAGEM_2',
    },
    {
      topText: 'Bíceps real natty',
      bottomText: '10kg na rosca de bíceps',
      imageURL: 'URL_DA_SUA_IMAGEM_3',
    },
    {
      topText: 'Projeto de Monstro',
      bottomText: '40 treinos completados',
      imageURL: 'URL_DA_SUA_IMAGEM_4',
    },
    {
      topText: 'Bíceps do Popeye',
      bottomText: '15kg na rosca de bíceps ',
      imageURL: 'URL_DA_SUA_IMAGEM_5',
    },
    {
      topText: 'Mestre do agachamento',
      bottomText: '300 séries de agachamento realizados',
      imageURL: 'URL_DA_SUA_IMAGEM_6',
    },
  ];

  const rectangles = rectangleContents.map((content, index) => (
    <View style={[styles.rectangle, { maxWidth: maxRectangleWidth }]} key={index}>
      <Text style={styles.topText}>{content.topText}</Text>
      <Image
        source={{ uri: content.imageURL }}
        style={styles.image}
        resizeMode="cover"
      />
      <Text style={styles.bottomText}>{content.bottomText}</Text>
    </View>
  ));

  return (
    <View style={{ flex: 1, paddingBottom: 60, backgroundColor: '#380062' }}>
      <View style={styles.header}>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: '#4B0082',
            padding: 10,
          }}
        >
          <Ionicons name="arrow-back" size={24} color="white" />
          <Text style={{ color: 'white', marginLeft: 5 }}>Voltar</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonSelectionContainer}>
        <TouchableOpacity
          style={showAchievements ? styles.selectedButton : styles.unselectedButton}
          onPress={() => {
            setShowAchievements(true);
            setShowChallenges(false);
          }}
        >
          <Text style={styles.buttonText}>Conquistas</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={showChallenges ? styles.selectedButton : styles.unselectedButton}
          onPress={() => {
            setShowAchievements(false);
            setShowChallenges(true);
          }}
        >
          <Text style={styles.buttonText}>Desafios</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <TextInput
            placeholder="Pesquisar desafio..."
            style={styles.searchInput}
            value={searchText}
            onChangeText={(text) => setSearchText(text)}
            onSubmitEditing={() => {}}
          />
          <TouchableOpacity style={styles.searchButton} onPress={() => {}}>
            <Ionicons name="search" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>

      {showAchievements && (
        <FlatList
          data={filteredAchievements}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      )}

      {showAchievements && (
        <FlatList
          data={rectangles}
          numColumns={2}
          renderItem={({ item }) => (
            <View style={styles.rectangleContainer}>{item}</View>
          )}
          keyExtractor={(_, index) => index.toString()}
          style={{ marginTop: 20 }}
        />
      )}
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
  achievementItem: {
    flexDirection: 'column',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#DDDDDD',
    width: maxRectangleWidth,
    backgroundColor: '#4B0082',
  },
  achievementName: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5, // Adicionado espaço entre o nome e a descrição
  },
  achievementDescription: {
    fontSize: 14,
    color: 'white',
    textAlign: 'center',
  },
  searchContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
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
  buttonSelectionContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  selectedButton: {
    backgroundColor: '#B397C8',
    borderRadius: 5,
    padding: 10,
    marginHorizontal: 5,
  },
  unselectedButton: {
    backgroundColor: '#4B0082',
    borderRadius: 5,
    padding: 10,
    marginHorizontal: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  rectangleContainer: {
    flex: 1,
    paddingHorizontal: horizontalSpacing / 2,
    marginBottom: 20,
  },
  rectangle: {
    width: '100%',
    maxWidth: maxRectangleWidth,
    aspectRatio: 153 / 198,
    backgroundColor: '#4B0082',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    alignSelf: 'center',
  },
  topText: {
    color: 'white',
    fontSize: 16,
    marginTop: 10,
    textAlign: 'center',
  },
  bottomText: {
    color: 'white',
    fontSize: 14, // Ajustado o tamanho da fonte para evitar que os textos ultrapassem
    marginBottom: 10,
    textAlign: 'center',
  },
  image: {
    width: '100%',
    height: '45%', // Ajustado a altura da imagem
  },
});

export default AchievementsTestScreen;

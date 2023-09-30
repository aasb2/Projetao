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
  ScrollView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { retrieveAchievements } from '../../services/functions/achievements/retrieveAchievements';
import { ChallengeCard } from '../../components/challengeCard';
import { checkCondition } from '../../services/functions/achievements/checkCondition';
import { auth } from '../../services/firebaseConfig';

const { width } = Dimensions.get('window');

const maxRectangleWidth = width * 0.45;
const horizontalSpacing = 10;
const userID = '4SyAAkeKRs71KxdhGv12';

const user = auth.currentUser;

type Achievement = {
  id: string;
  achievementName: string;
  description: string;
  imageURL: string;
};

type Challenge = {
  id: string;
  image: string;
  name: string;
  conditions: {
    description: string;
    key: string;
    value: number;
  };
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
        await checkCondition('4SyAAkeKRs71KxdhGv12');
        const achievementsData = await retrieveAchievements(userID);
        console.log(achievementsData);
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
    console.log(user);
  }, [searchText, achievements]);


  function renderItem({ item }: { item: Achievement }) {
    return (
      <View style={styles.rectangleContainer}>
        <Text style={styles.achievementName}>{item.achievementName}</Text>
        <Image
          source={{ uri: item.imageURL }} // Defina a URL da imagem aqui
          style={styles.image} // Defina as dimensões da imagem conforme necessário
        />
        <Text style={styles.achievementDescription}>{item.description}</Text>
      </View>
    );
  }

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
            onSubmitEditing={() => { }}
          />
          <TouchableOpacity style={styles.searchButton} onPress={() => { }}>
            <Ionicons name="search" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>

      {/* {showAchievements && (
        <FlatList
          data={filteredAchievements}
          
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      )} */}

      {showAchievements && (
          <FlatList
            data={filteredAchievements} // Usamos filteredAchievements em vez de rectangles
            numColumns={2}
            renderItem={renderItem} // Passamos a função renderItem diretamente
            keyExtractor={(item) => item.id.toString()} // Certifique-se de usar um identificador único aqui
            style={{ marginTop: 20 }}
          />
      )}

      {/* {showAchievements && (
        <FlatList
          data={rectangles}
          numColumns={2}
          renderItem={({ item }) => (
            <View style={styles.rectangleContainer}>{item}</View>
          )}
          keyExtractor={(_, index) => index.toString()}
          style={{ marginTop: 20 }}
        />
      )} */}

      {showChallenges && (
        <ChallengeCard />
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
    marginTop: 10
  },
  image: {
    width: 120,
    height: 120,
    resizeMode: 'contain'
  },
  achievementDescription: {
    fontSize: 14,
    color: 'white',
    textAlign: 'center',
    marginBottom: 15
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
    marginHorizontal: horizontalSpacing / 2,
    aspectRatio: 153 / 198,
    marginBottom: 20,
    backgroundColor: '#4B0082',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  topText: {
    color: 'white',
    fontSize: 16,
    marginTop: 10,
    textAlign: 'center',
  },
  bottomText: {
    color: 'white',
    fontSize: 14,
    marginBottom: 10,
    textAlign: 'center',
  },
});

export default AchievementsTestScreen;

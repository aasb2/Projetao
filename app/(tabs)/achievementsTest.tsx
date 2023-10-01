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
import { retrieveAchievements } from '../../services/functions/achievements/retrieveAchievements';
import { ChallengeCard } from '../../components/challengeCard';
import { checkCondition } from '../../services/functions/achievements/checkCondition';
import { auth, db } from '../../services/firebaseConfig';
import { collection, getDoc, onSnapshot } from 'firebase/firestore';
import { getUserInfo } from '../../services/functions/login/loginUser';

const { width } = Dimensions.get('window');

const maxRectangleWidth = width * 0.45;
const horizontalSpacing = 10;
const userID = '4SyAAkeKRs71KxdhGv12';

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
  const [userData, setUserData] = useState('');

  useEffect(() => {
    async function fetchAchievements() {
      try {
        await checkCondition();
        const achievementsData = await retrieveAchievements();
        console.log(achievementsData);
        setAchievements(achievementsData);
      } catch (error) {
        console.error('Erro ao buscar a lista de achievements:', error);
      }
    }
    const reload = onSnapshot(
      collection(db, "users"),
      async (snapshot) => {
        await checkCondition();
        const achievementsData = await retrieveAchievements();
        console.log("Mensagem de dentro do snapshot");
        console.log(achievementsData);
        setAchievements(achievementsData);
      })

    fetchAchievements();
    return () => reload();
  }, []);

  useEffect(() => {
    const filtered = achievements.filter((achievement) =>
      achievement.achievementName.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredAchievements(filtered);

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

      {showAchievements && (
        <FlatList
          data={filteredAchievements}
          numColumns={2}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          style={{ marginTop: 20 }}
        />
      )}

      {showChallenges && (
        <ChallengeCard userID={userData} />
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

  buttonSelectionContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 25,
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

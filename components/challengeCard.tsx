import React, { useState, useEffect } from 'react';
import { getChallengesList } from '../services/functions/achievements/functionChallenges';
import { getUserInfo } from '../services/functions/login/loginUser';
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

// Defina o tipo de objeto para os challenges
type ChallengeCondition = {
  description: string;
  key: string;
  value: number;
};

type Challenge = {
  id: string;
  challengeName: string;
  imageURL: string;
  completed: boolean;
  conditions: {
    description: string;
    key: string;
    value: number;
  };
};

const userid = '4SyAAkeKRs71KxdhGv12';

export function ChallengeCard(props: { userID: string }) {
  const userID = props.userID;
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [userDataChallenges, setUserData] = useState('');

  useEffect(() => {
    async function fetchChallenges() {
      try {
        const challengesData = await getChallengesList();
        setChallenges(challengesData);
      } catch (error) {
        console.error('Erro ao buscar a lista de challenges:', error);
      }
    }

    fetchChallenges();
  }, []);

  // Obtenha a largura da tela
  const windowWidth = Dimensions.get('window').width;

  // Ajuste as dimensões com base na largura da tela
  const containerWidth = windowWidth * 0.9;
  const scoreCircleSize = windowWidth * 0.1;

  // Função renderItem para renderizar cada item (card de desafio)
  function renderItem({ item, index }: { item: Challenge; index: number }) {
    let score = 0;

    // Defina as pontuações com base no índice do desafio
    if (index === 0) {
      score = 10;
    } else if (index === 1) {
      score = 20;
    } else if (index === 2) {
      score = 100;
    }

    return (
      <View style={styles.Align}>
        <View style={[styles.Container, { width: containerWidth }]}>
          <View style={styles.containerFlexCol}>
            <View style={styles.containerFlex}>
              <Image
                source={{ uri: item.imageURL }}
                style={styles.image}
              />
              <Text style={styles.challengeName}>{item.challengeName}</Text>
            </View>

            {/* Círculo no canto superior direito */}
            <View style={[styles.scoreCircle, { width: scoreCircleSize, height: scoreCircleSize }]}>
              <Text style={styles.scoreText}>{score}</Text>
            </View>
          </View>

          <View style={styles.containerDescription}>
            <Text style={styles.challengeDescription}>
              {item.conditions['description']}
            </Text>
          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={challenges}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        style={{ marginTop: 20, height: '80%' }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  Container: {
    backgroundColor: '#C7B0D8',
    flexDirection: 'column',
    justifyContent: 'space-between',
    borderRadius: 19.705,
    paddingHorizontal: 15,
    marginVertical: 10,
  },
  
  Align: {
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 5,
  },
  containerFlex: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  containerFlexCol: {
    flexDirection: 'column',
  },
  challengeName: {
    fontSize: 23,
    color: 'black',
    fontWeight: 'bold',
    marginTop: 10,
  },
  challengeDescription: {
    fontSize: 18,
    color: 'black',
    fontWeight: 'bold',
    marginLeft: 88,
  },
  containerDescription: {
    marginBottom: 10,
  },
  image: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
    marginBottom: 5,
    marginTop: 20,
    marginRight: 15,
    marginLeft: 15,
  },
  scoreCircle: {
    position: 'absolute',
    top: 10,
    right: 10,
    borderRadius: 50, // Use borderRadius para torná-lo circular
    borderColor: 'black',
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scoreText: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

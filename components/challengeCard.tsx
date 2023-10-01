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
      <View  style={styles.Align}>

        <View style={styles.Container}>

        <View style={styles.containerFlexCol }> 

          <View style={styles.containerFlex }>  
            <Image
              source={{ uri: item.imageURL }} 
              style={ styles.image }
              />
          
            <Text style={styles.challengeName}>{item.challengeName}</Text>

              {/* Círculo no canto superior direito */}
              <View style={styles.scoreCircle}>
                <Text style={styles.scoreText}>{score}</Text>
              </View>
            </View>
          </View>

          <View style={styles.containerDescription }>
              <Text style={styles.challengeDescription}>
                {item.conditions['description']}
              </Text>
          </View>
        </View>
          



          {/* <View>
  {Array.isArray(item.conditions) ? (
    item.conditions.map((condition, index) => (
      <Text key={index} style={styles.challengeName}>
        {condition.description}
      </Text>
    ))
  ) : (
    <Text style={styles.challengeName}>Condições não disponíveis</Text>
  )}
</View> */}


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
    width: '90%', 
    height: 100, 
    backgroundColor: '#C7B0D8',
    flexDirection: 'column',
    justifyContent: 'space-between',
    // alignItems: 'center',
    borderRadius: 19.705,
  },
  
  Align: {
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 5,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  containerFlex :{
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',

  },
  containerFlexCol:{
    flex: 2,
    flexDirection: 'column',
  },
  challengeName: {
    fontSize: 23,
    color: 'black',
    fontWeight: 'bold',
    // textAlign: 'center',
    marginTop: 10
  },
  challengeDescription: {
    fontSize: 18,
    color: 'black',
    fontWeight: 'bold',
    // marginBottom: 20,
    marginLeft: 88
  },
  containerDescription :{
    marginBottom: 10,
  },
  image: {
    width: 60,
    height: 60, 
    resizeMode: 'contain',
    marginBottom: 5,
    marginTop: 20,
    marginRight: 15,
    marginLeft: 15
  },
  scoreCircle: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 40,
    height: 40,
    borderRadius: 20,
    borderColor: 'black',
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scoreText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',    marginTop: 20,
    marginRight: 15,
    marginLeft: 15

  },
});

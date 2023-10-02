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
type Challenge = {
  id: string;
  challengeName: string;
  imageURL: string;
  completed: boolean;
  points: number;
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
        // const auxUserDataChallenges = await getUserInfo();
        // setUserData(auxUserDataChallenges.id._key.path.segments.slice(-1)[0]);
        // console.log(userDataChallenges);
        const challengesData = await getChallengesList();
        setChallenges(challengesData);
      } catch (error) {
        console.error('Erro ao buscar a lista de challenges:', error);
      }
    }

    fetchChallenges();
  }, []);
  const windowWidth = Dimensions.get('window').width;

  // Ajuste as dimensões com base na largura da tela
  const scoreCircleSize = windowWidth * 0.1;

  // Função renderItem para renderizar cada item (card de desafio)
  function renderItem({ item }: { item: Challenge }) {
    return (
      <View style={styles.Align}>
        <View style={styles.Container}>
          <View style={styles.containerFlexCol}>
            <View style={styles.containerFlex}>
                <Image
                    source={{ uri: item.imageURL }} 
                    style={ styles.image }
                  />
                <View style={{ flex: 1 }}>
                  <Text style={styles.challengeName}>{item.challengeName}</Text>
                </View>
              <View style={{}}>
                {/* Círculo no canto superior direito */}
                <View style={{ 
                  ...styles.scoreCircle,
                  width: 45, 
                  height: 45, 
                  backgroundColor: 
                    item.points === 100 ? '#990000' :
                    item.points >= 91 && item.points <= 99 ? '#de2323' :
                    item.points >= 71 && item.points <= 90 ? '#d9d907' :
                    item.points >= 41 && item.points <= 70 ? '#658C48' :
                    item.points >= 10 && item.points <= 40 ? '#c1d8b0' :
                    '#31C61D'
                  }}>
                  <Text style={styles.scoreText}>{item.points}</Text>
                </View>
              </View>
            </View>

            <View style={styles.containerDescription}>
              <Text style={styles.challengeDescription}>
                {item.conditions['description']}
              </Text>
            </View>
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
    width: '90%', 
    height: 100, 
    backgroundColor: '#C7B0D8',
    justifyContent: 'space-between',
    // alignItems: 'center',
    borderRadius: 8,
  },
  Align :{
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 5
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
    fontSize: 21,
    color: 'black',
    fontWeight: 'bold',
    // textAlign: 'left',
    // textAlign: 'center',
    marginTop: 10,
    // marginBottom: 5
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
    marginTop: 10,
    width: 30,
    height: 30,
    borderRadius: 50, // Use borderRadius para torná-lo circular
    
    borderWidth: 1.70,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 20,
    shadowColor: 'black', // Cor da sombra
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.4, // Opacidade da sombra
    shadowRadius: 3.84, // Raio da sombra
  },
  scoreText: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
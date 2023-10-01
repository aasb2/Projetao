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
  // conditions: { [key: string]: ChallengeCondition };
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

  // Função renderItem para renderizar cada item (card de desafio)
  function renderItem({ item }: { item: Challenge }) {
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
});

import React, { useState, useEffect } from 'react';
import { getChallengesList } from '../services/functions/achievements/functionChallenges';
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
  conditions: {
    completed: boolean;
    condition: string;
    description: string;
    field: string;
    key: string;
    value: number;
  }[];
};


export function ChallengeCard() {
  const [challenges, setChallenges] = useState<Challenge[]>([]);

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
  function renderItem({ item }: { item: Challenge }) {
    return (
      <View  style={styles.Align}>
      <View style={styles.Container}>
        <Text style={styles.challengeName}>{item.challengeName}</Text>
        <Image
        source={{ uri: item.imageURL }} 
        style={ styles.image }
        />
        {/* <Text style={styles.challengeName}>{item.completed}</Text> */}
        
        {/* aqui era pra ser a condição, mas nao aparece */}
        {/* <View>
          {item.conditions.map((condition, index) => (
            <Text key={index} style={styles.challengeName}>
              {condition.description}
            </Text>
          ))}
        </View> */}

      </View>
      </View>
    );
  }

  return (
    <View >
      <FlatList
        data={challenges}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        style={{ marginTop: 20 }}
      />
    </View>
  );
}


const styles = StyleSheet.create({
  Container: {
    width: '90%', 
    height: 200, 
    backgroundColor: '#C7B0D8',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  Align :{
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 10
  },
  challengeName: {
    fontSize: 28,
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
});

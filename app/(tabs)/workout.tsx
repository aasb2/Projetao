import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, TextInput, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Importe o ícone desejado da biblioteca de ícones
import { getAchievementsList } from '../../services/functions/achievements/functionAchievements'; // Substitua pelo caminho correto do seu arquivo getAchievementsList
import appTheme from '../../constants/theme';
import { background } from 'native-base/lib/typescript/theme/styled-system';


const WorkoutScreen = () => {

    return (
        <View style={{ flex: 1, paddingBottom: 60, backgroundColor: '#380062' }}>
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
    
          </View>
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

export default WorkoutScreen;

// import { Button } from 'native-base';
import React from 'react';
import { View, Text, Alert, Button, StyleSheet,  TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Importe o ícone desejado da biblioteca de ícones

import appTheme from '../../constants/theme';
const AchievementsTestScreen = () => {
    function renderHeader() {
        return (
          <View
          style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#380062'}}
          >
            <View
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    backgroundColor: '#4B0082',
                    paddingVertical: 20,
                    paddingHorizontal: 0,
                    // borderBottomLeftRadius: 20,
                    // borderBottomRightRadius: 20,
                    zIndex: -1,
                }}
            >

          {/* Botões aqui */}
          <View style={styles.fixToText}>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: '4B0082', // Cor roxa
                padding: 10,
              }}
            >
              <Ionicons name="arrow-back" size={24} color="white" /> {/* Ícone de seta */}
              <Text style={{ color: 'white', marginLeft: 5 }}>Voltar</Text>
            </TouchableOpacity>

            {/* TouchableOpacity */}
            <TouchableOpacity style={styles.button} >
                    <Text>Press Here</Text>
            </TouchableOpacity>

        {/* TouchableOpacity com imagem - testar*/}
        {/* <TouchableOpacity style={styles.button}>
          <Image
            source={require('./caminho/para/sua/imagem.png')}
            style={{ width: 30, height: 30 }} // Defina o tamanho da imagem conforme necessário
          />
          <Text>Pressione Aqui</Text>
        </TouchableOpacity> */}

        </View>

        </View>
        </View>
        )
    }
    return (
      <View style={{ flex: 1, paddingBottom: 60, backgroundColor: '#E7E7E7' }}>
        { renderHeader() } 
      </View>
    )
};
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      marginHorizontal: 16,
    },
    title: {
      textAlign: 'center',
      marginVertical: 8,
    },
    fixToText: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    button: {
        alignItems: 'center',
        backgroundColor: '#DDDDDD',
        padding: 10,
      },

  });

export default AchievementsTestScreen;

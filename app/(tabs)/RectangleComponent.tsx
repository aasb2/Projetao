import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const RectangleComponent = () => {
  return (
    <View style={styles.rectangle}>
      <Text style={styles.topText}>Texto Superior</Text>
      <Image
        source={{ uri: 'URL_DA_SUA_IMAGEM' }}
        style={styles.image}
        resizeMode="cover"
      />
      <Text style={styles.bottomText}>Texto Inferior</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  rectangle: {
    width: '80%', // Use a porcentagem desejada para a largura
    aspectRatio: 153 / 198, // Mantém a proporção de 153x198
    backgroundColor: '#4B0082',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  topText: {
    color: 'white',
    fontSize: 16,
    marginTop: 10,
  },
  bottomText: {
    color: 'white',
    fontSize: 16,
    marginBottom: 10,
  },
  image: {
    width: '100%',
    height: '60%', // Use a porcentagem desejada para a altura da imagem
  },
});

export default RectangleComponent;
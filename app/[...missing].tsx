import { Link, Stack } from 'expo-router';
import { StyleSheet } from 'react-native';

import { Text, View } from '../components/Themed';
import appTheme from '../constants/theme';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{headerShown: false}} />
      <View style={styles.container}>
        <Text style={styles.title}>Aguarde um momento</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: appTheme.COLORS.primary
  },
  title: {
    fontSize: 20,
    fontFamily: 'Roboto_700Bold',
    color: 'white'
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});

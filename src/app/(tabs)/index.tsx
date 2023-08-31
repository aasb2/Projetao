// Funciona como a rota de start, rota inicial da aplicação
import Colors from '../../../constants/Colors';
import { View, Text, Image } from 'react-native';
import { useFonts, Roboto_400Regular, Roboto_700Bold, Roboto_100Thin} from '@expo-google-fonts/roboto'
import { Link } from 'expo-router';
// import { Center } from 'native-base';

export default function Login() {
  const [ fontLoaded ] = useFonts({
    Roboto_100Thin,
    Roboto_400Regular,
    Roboto_700Bold
  })

  if (!fontLoaded) {
    return null
  }

  return (
    <View
      style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.primaryColor}}
    >
        <Image
        source={require('../../../assets/images/logo.png')}
        style={{ width: 120, height: 120 }}
      />
      <Text style={{ paddingTop: 10, fontSize: 32, color: Colors.backgroundColor, fontWeight: 'bold', fontFamily: 'Roboto_400Regular'}}>
          Unity FIT
      </Text>


      <Text style={{ marginTop: 35, fontSize: 16, color: Colors.transparentTextColor, fontWeight: 'bold', fontFamily: 'Roboto_100Thin'}}>
        Acesse com:
      </Text>

      <View style={{marginTop: 20}}>
        <View 
          style={{flex:1, flexDirection: 'row', gap: 10, justifyContent: 'center', alignItems: 'center'}}
        >
          <Link href={'/'}>
            <Image 
              source={require('../../../assets/images/facebook.png')}
              style={{ width: 36, height: 36 }}
            />
          </Link>
          
          <Link href={'/'}>
            <Image 
              source={require('../../../assets/images/google.png')}
              style={{ width: 36, height: 36 }}
            />
          </Link>
        </View>
      </View>
      
    </View>
  );
}
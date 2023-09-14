import appTheme from '../../constants/theme';
import { View, Text, Image } from 'react-native';
import { Link } from 'expo-router';
// import { Center } from 'native-base';

export function Login() {

  return (
    <View
      style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: appTheme.COLORS.primary}}
    >
      <Image
        source={require('../../assets/images/logo.png')}
        style={{ width: 120, height: 120 }}
      />
      <Text style={{ paddingTop: 10, fontSize: 32, color: appTheme.COLORS.white, fontWeight: 'bold', fontFamily: 'Roboto_700Bold'}}>
          Unity FIT
      </Text>

      <Text style={{ marginTop: 35, fontSize: 16, color: appTheme.COLORS.secondary, fontWeight: 'bold', fontFamily: 'Roboto_400Regular'}}>
        Acesse com:
      </Text>

      <View style={{marginTop: 20}}>
        <View 
          style={{flex:1, flexDirection: 'row', gap: 10, justifyContent: 'center', alignItems: 'center'}}
        >
          <Link href={'/'}>
            <Image 
              source={require('../../assets/images/google.png')}
              style={{ width: 36, height: 36 }}
            />
          </Link>
          
          <Link href={'/'}>
            <Image 
              source={require('../../assets/images/facebook.png')}
              style={{ width: 36, height: 36 }}
            />
          </Link>
        </View>
      </View>
      
    </View>
  );
}
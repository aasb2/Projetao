import { useState } from 'react';
import appTheme from '../../constants/theme';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'; // Importar a função de navegação
import { auth } from "../../services/firebaseConfig";
import {
    GoogleAuthProvider,
    User,
    signInWithPopup,
} from "firebase/auth"
import { createNewUserDocument } from '../../services/functions/login/loginUser';


export function Login() {
  const navegate = useNavigation();
  const [user, setUser] = useState<User>({} as User);

  function handleGoogleSigIn() {
        const provider = new GoogleAuthProvider();

        signInWithPopup(auth, provider)
            .then((result) => {
              setUser(result.user);
              //navegate('feed');
              createNewUserDocument(result.user); // Chama a função para criar o documento de usuário
            })
            .catch((error) => {
                console.log(error);
            });
  }

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
          <TouchableOpacity
              onPress={() => handleGoogleSigIn()} // Chame uma função quando o botão for pressionado
              style={{
                width: 36,
                height: 36,
              }}
          >
              <AntDesign
                  name="google"
                  size={30}
                  color="white" // Altere a cor do ícone com base no estado de "isLiked" do post
              />
          </TouchableOpacity>
          
          
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
import React from "react";
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { COLORS } from '../../constants'

export default class PostScreen extends React.Component {

  //TESTE PARA ADD IMG AO COMENTÁRIO
  state = {
    text: "",
    image: null,
  };

  pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
    })

    if (!result.canceled) {
      this.setState({image: result.uri})
    }
  }

  render() {
    return (
      <SafeAreaView style={ styles.container }>
          <View style={ styles.header } >
            < TouchableOpacity>
              <Ionicons name="md-arrow-back" size={24} color={COLORS.tabSecondary}></Ionicons>
            </TouchableOpacity>
                
            < TouchableOpacity style={{
              backgroundColor:  COLORS.tabSecondary,
              paddingHorizontal: 16,
              paddingVertical: 8,
              borderRadius: 8,
            }}>
              <Text style={ { fontWeight: "500", color: '#fff' } }>Post</Text>
            </TouchableOpacity>
          </View>
                
              {/* CONTAINER COMMENT */}
          <View style={{paddingHorizontal: 20}}>
          < View style = {{
            backgroundColor: '#fff',
            flexDirection: 'column',
            width: '100%',
            borderRadius: 30,
            borderWidth: 1,
            borderColor: '#fff',
            marginVertical: 12,
          }}>
            <View
              style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginTop: 10,
              }}
            >
              <View
                  style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginHorizontal: 10,
                  }}
              >
                  <Image
                      source={ require("../../assets/images/user1.jpg") }
                      style={{
                          height: 52,
                          width: 52,
                          borderRadius: 20,
                      }}
                  />
              </View>

            </View>
            
                    {/* INPUT COMMENT */}
            <View style={styles.inputContainer} >
              <TextInput
                placeholderTextColor = '#AF9EBC'
                autoFocus = {true}
                multiline = {true}
                numberOfLines = {4}
                style = {{ flex: 1 }}
                placeholder="O que você quer compartilhar?"
              ></TextInput>
            </View>
  
          </View>
          </View>
      
                    {/* ADD IMG */}
        <TouchableOpacity style={styles.photo} onPress={this.pickImage}>
          <Ionicons name="md-camera" size = {32} color = {COLORS.tabSecondary} ></Ionicons>
        </TouchableOpacity>
        
        < View style = {{ marginHorizontal: 32, marginTop: 32, height: 150 }}>
          <Image source={{uri: this.state.image}} style={{borderRadius: 10, width: "100%", height: "100%"}}></Image>
        </View> 

      </SafeAreaView>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E7E7E7',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#D8D9DB',
  },
  inputContainer: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginVertical: 8,
  },
  photo: {
    alignItems: "center",
    marginHorizontal: 32,
  }
});




// import { StyleSheet } from 'react-native';

// import EditScreenInfo from '../../components/EditScreenInfo';
// import { Text, View } from '../../components/Themed';

// export default function TabTwoScreen() {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Tab Two</Text>
//       <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
//       <EditScreenInfo path="app/(tabs)/two.tsx" />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: 'bold',
//   },
//   separator: {
//     marginVertical: 30,
//     height: 1,
//     width: '80%',
//   },
// });

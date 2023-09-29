import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image, TextInput } from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons"; // Importe o ícone de localização
import * as ImagePicker from "expo-image-picker";
import { COLORS } from '../../constants'
import { createNewPost } from '../../services/functions/community/postCreate';
import { getUserInfo } from '../../services/functions/login/loginUser';

const PostScreen = () => {
  const [postText, setPostText] = useState("");
  const [postImage, setPostImage] = useState(null);
  const [location, setLocation] = useState("");
  const [userImage, setUserImage] = useState("");

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
    });

    if (!result.cancelled) {
      setPostImage(result.assets[0].uri);
      console.log(result);
    }
  }

  // Quando o usuário criar um novo post
  const handleCreatePost = async () => {
    const content = postText;
    const image = postImage;
    const postLocation = location; 
    console.log("handleCreatePost", content)

    try {
      const newPostId = await createNewPost(content, image, postLocation);
      console.log('ID do novo post:', newPostId);

      setPostText("");
      setPostImage(null);
      setLocation("");

    } catch (error) {
      console.error('Erro ao criar o post:', error);
    }
  }

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const userInfo = await getUserInfo();
        setUserImage(userInfo.image);
      } catch (error) {
        console.error('Erro ao buscar informações do usuário:', error);
      }
    };

    fetchUserInfo();
  }, []);


  return (
    <SafeAreaView style={styles.container}>
      {/* Cabeçalho */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Ionicons name="md-arrow-back" size={24} color={COLORS.tabSecondary}></Ionicons>
        </TouchableOpacity>

        <TouchableOpacity style={styles.postButton}
          onPress={() => handleCreatePost()}
        >
          <Text style={styles.postButtonText}>Post</Text>
        </TouchableOpacity>
      </View>

      {/* Container de Comentário */}
      <View style={{ paddingHorizontal: 15 }}>
        <View style={styles.commentContainer}>
          {/* Seção do usuário */}
          <View style={styles.userSection}>
            <Image
              source={{ uri: userImage }}
              style={styles.userImage}
            />
            <View style={styles.locationContainer}>
              <MaterialCommunityIcons
                name="map-marker"
                size={20}
                color={COLORS.primary} // Cor do ícone de localização
              />
              <TextInput
                placeholder="Onde você está treinando?"
                placeholderTextColor="#AF9EBC"
                style={[styles.locationInput, { color: COLORS.primary }]}
                value={location}
                onChangeText={(text) => setLocation(text)}
              />
            </View>
          </View>

          {/* Entrada de Comentário */}
          <View style={styles.inputContainer}>
            <TextInput
              placeholderTextColor="#AF9EBC"
              autoFocus={true}
              multiline={true}
              numberOfLines={3}
              style={[styles.commentInput, { color: COLORS.primary }]}
              placeholder="O que você quer compartilhar?"
              value={postText}
              onChangeText={text => setPostText(text)}
            />
          </View>
        </View>
      </View>

      {/* Adicionar Imagem */}
      <TouchableOpacity style={styles.photo} onPress={pickImage}>
        <Ionicons name="md-camera" size={32} color={COLORS.tabSecondary}></Ionicons>
      </TouchableOpacity>

      {/* Visualização da Imagem */}
      {postImage && (
        <View style={styles.imagePreview}>
          <Image source={{ uri: postImage }} style={styles.image}></Image>
        </View>
      )}
    </SafeAreaView>
  );
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
  postButton: {
    backgroundColor: COLORS.tabSecondary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  postButtonText: {
    fontWeight: "500",
    color: '#fff',
  },
  commentContainer: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    flexDirection: 'column',
    width: '100%',
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#fff',
    marginVertical: 12,
  },
  userSection: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 10,
    marginHorizontal: 10,
  },
  userImage: {
    height: 52,
    width: 52,
    borderRadius: 20,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
    flex: 1,
  },
  locationInput: {
    marginLeft: 3,
    flex: 1,
  },
  inputContainer: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginVertical: 8,
  },
  commentInput: {
    flex: 1,
  },
  photo: {
    alignItems: "center",
    marginHorizontal: 32,
  },
  imagePreview: {
    marginHorizontal: 32,
    marginTop: 32,
    height: 150,
  },
  image: {
    borderRadius: 10,
    width: "100%",
    height: "100%",
  },
});

export default PostScreen;





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

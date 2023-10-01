import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Image,
  TextInput,
  StyleSheet,
} from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, FONTS, SIZES, images } from "../constants";
import {
  AntDesign,
  MaterialIcons,
  Ionicons,
  Feather,
  Foundation,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { friends } from "../constants/data";
import FeedPost from "../components/FeedPost";
import {
  getComments,
  getFriendsList,
  getPostsList,
} from "../services/functions/community/feedCommunity";
import { getUserInfo } from "../services/functions/login/loginUser";
import {
  DocumentData,
  updateDoc,
  doc,
  onSnapshot,
  collection,
} from "firebase/firestore";
import { db } from "../services/firebaseConfig";
import {
  NavigationProp,
  useNavigation,
  useRoute,
} from "@react-navigation/native";

const Comments = () => {
  const route = useRoute();
  const [comments, setComments] = useState<DocumentData[]>([]);

  const postId = route.params ? (route.params as any).postId : null;

  useEffect(() => {
    const getAllComments = async (postId: string | null) => {
      try {
        if (postId) {
          const allComments = await getComments(postId);
          setComments(allComments);
        }
      } catch (error) {
        console.error("Erro ao obter comentários:", error);
      }
    };

    getAllComments(postId);
  }, [postId]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.commentContainer}>
        <FlatList
          data={comments}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View>
              <Image
                style={styles.logoUser}
                source={{ uri: item.user.image }}
              />
              <View style={{ marginVertical: 12 }}>
                <Text>{item.user.name}</Text>
                <Text>{item.content}</Text>
              </View>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E7E7E7",
  },
  commentContainer: {
    backgroundColor: "#fff",
    flexDirection: "column",
    width: "100%",
    borderRadius: 26,
    borderWidth: 1,
    borderColor: "#fff",
    marginVertical: 12,
  },
  logoUser: {
    width: 37,
    height: 37,
    borderRadius: 20,
    marginRight: 8,
  },
});

export default Comments;

// import React, { useEffect, useState } from 'react'
// import { View, Text } from 'react-native'
// import { useRoute } from '@react-navigation/native';
// import { getComments } from '../services/functions/community/feedCommunity';
// import { combineContextAndProps } from 'native-base';

// const Comments = () => {
//     const router = useRoute();
//     const [comments, setComments] = useState<any>();

//     const postId = router.params;
//     useEffect(() => {
//         const getAllComments = async (postId: any)  => {
//             const allComments = await getComments(postId);
//             setComments(allComments);
//             console.log(comments)
//         }
//         getAllComments(postId)

//         // return () => unsubscribe();
//     }, []);

//     return (
//         <View
//             style={{
//                 backgroundColor: '#fff',
//                 flexDirection: 'column',
//                 width: '100%',
//                 borderRadius: 26,
//                 borderWidth: 1,
//                 borderColor: '#fff',
//                 marginVertical: 12,
//             }}
//         >
//         </View>
//     )
// }

// export default Comments

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Image,
  TextInput,
  Animated,
  Easing,
} from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, FONTS, SIZES, images } from "../../constants";
import {
  AntDesign,
  MaterialIcons,
  Ionicons,
  Feather,
  Foundation,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { friends } from "../../constants/data";
import FeedPost from "../../components/FeedPost";
import {
  getFriendsList,
  getPostsList,
} from "../../services/functions/community/feedCommunity";
import { getUserInfo } from "../../services/functions/login/loginUser";
import {
  DocumentData,
  updateDoc,
  doc,
  onSnapshot,
  collection,
  getDoc,
  getDocs,
} from "firebase/firestore";
import { db } from "../../services/firebaseConfig";
import Colors from "../../constants/Colors";

const RankingTestScreen = () => {
  const [friendsData, setFriendsData] = useState<DocumentData[]>([]);

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const dataFriends = await getFriendsList();
        setFriendsData(dataFriends);
      } catch (error) {
        console.error("Erro ao buscar a lista de amigos:", error);
      }
    };
    const unsubscribe = onSnapshot(
      collection(db, "users"),
      async (snapshot) => {
        const updatedFriends = await getFriendsList();
        setFriendsData(updatedFriends);
      }
    );

    fetchFriends();

    return () => unsubscribe();
  }, []);

  function renderPodium() {
    const PodiumItem = ({ user, position }) => (
      <View style={[styles.podiumItem, position === 1 && styles.firstPlace]}>
        <Image source={{ uri: user.imageURL }} style={styles.podiumImage} />
        <Text style={styles.podiumUserName}>{user.firstName}</Text>
        {position !== 1 && <View style={styles.podiumRectangle} />}{" "}
        {/* Evitar retângulo no primeiro colocado */}
      </View>
    );

    // Supondo que você tenha uma lista de 3 melhores amigos (podiumUsers)
    const podiumUsers = friendsData.slice(0, 3);

    return (
      <View style={styles.podiumContainer}>
        {podiumUsers.map((user, index) => (
          <PodiumItem key={user.id} user={user} position={index + 1} />
        ))}
      </View>
    );
  }

  function renderRanking() {
    const usersRaking = friendsData.slice(3);
    return (
      <ScrollView
        style={styles.headerContainer}
        contentContainerStyle={styles.headerContentContainer}
      >
        <FlatList
          data={friendsData}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => (
            <View style={styles.rowContainer}>
              <View style={styles.rankContainer}>
                <Text style={styles.rankText}>{index + 1}</Text>
              </View>
              <Image source={{ uri: item.imageURL }} style={styles.userImage} />
              <Text style={styles.userName}>{item.name}</Text>
              <Text style={styles.scoreText}>{item.score}</Text>
            </View>
          )}
        />
      </ScrollView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.primary }}>
      <View style={{ flex: 1 }}>
        {renderPodium()}
        {renderRanking()}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  podiumContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 130,
  },
  podiumItem: {
    flex: 1,
    alignItems: "center",
    marginBottom: 16,
  },
  firstPlace: {
    width: 170,
    height: 195,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    borderLeftWidth: 50,
    borderRightWidth: 50,
    borderBottomWidth: 90,
    borderColor: "transparent",
    borderTopColor: "orange",
    borderBottomColor: "orange",
    position: "absolute",
    top: 100,
  },
  podiumImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 4,
  },
  podiumRectangle: {
    width: 100,
    height: 60,
    backgroundColor: "orange",
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    marginBottom: 8,
  },
  podiumUserName: {
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
  }, ////////////////////////////
  headerContainer: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    position: "absolute",
    bottom: 40,
    left: 0,
    right: 0,
    //height: 30,
    maxHeight: "50%",
    flex: 1,
  },
  headerContentContainer: {
    paddingBottom: 30,
    paddingTop: "5%",
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F3F3",
  },
  rankContainer: {
    backgroundColor: COLORS.primary,
    borderRadius: 5,
    paddingHorizontal: 5,
    paddingVertical: 2,
    marginRight: 10,
  },
  rankText: {
    fontSize: 14,
    color: "#fff",
  },
  userImage: {
    width: 37,
    height: 37,
    borderRadius: 20,
    marginRight: 8,
  },
  userName: {
    flex: 3,
    fontSize: 16,
  },
  scoreText: {
    flex: 1,
    fontSize: 16,
    textAlign: "right",
  },
});

export default RankingTestScreen;

// import {
//     View,
//     Text,
//     StyleSheet,
//     TouchableOpacity,
//     ScrollView,
//     FlatList,
//     Image,
//     TextInput,
//     Animated,
//     Easing
// } from 'react-native'
// import React, { useState, useEffect } from 'react'
// import { SafeAreaView } from 'react-native-safe-area-context'
// import { COLORS, FONTS, SIZES, images } from '../../constants'
// import {
//     AntDesign,
//     MaterialIcons,
//     Ionicons,
//     Feather,
//     Foundation,
//     MaterialCommunityIcons,
// } from '@expo/vector-icons'
// import { LinearGradient } from 'expo-linear-gradient'
// import { friends } from '../../constants/data'
// import FeedPost from '../../components/FeedPost';
// import { getFriendsList, getPostsList } from '../../services/functions/community/feedCommunity';
// import { getUserInfo } from '../../services/functions/login/loginUser';
// import { DocumentData, updateDoc, doc, onSnapshot, collection, getDoc, getDocs } from 'firebase/firestore';
// import { db } from '../../services/firebaseConfig';
// import Colors from '../../constants/Colors';

// const RankingTestScreen = () => {
//     const [friendsData, setFriendsData] = useState<DocumentData[]>([]);

//     useEffect(() => {
//     const fetchFriends = async () => {
//         try {
//         const dataFriends = await getFriendsList();
//         setFriendsData(dataFriends);
//         } catch (error) {
//         console.error('Erro ao buscar a lista de amigos:', error);
//         }
//     };
//     const unsubscribe = onSnapshot(collection(db, 'users'), async (snapshot) => {
//         const updatedFriends = await getFriendsList();
//         setFriendsData(updatedFriends);
//     });

//     fetchFriends();

//     return () => unsubscribe();
//     }, []);

//     function renderPodium() {

//         const PodiumItem = ({ user }) => (
//             <View style={styles.podiumItem}>
//             <Image source={{ uri: user.imageURL }} style = { styles.podiumImage } />
//                 <Text style={styles.podiumUserName}>{user.firstName}</Text>
//                 <View style={styles.podiumRectangle}></View> {/* Retângulo laranja */}
//             </View>
//         );

//         // Supondo que você tenha uma lista de 3 melhores amigos (podiumUsers)
//         const podiumUsers = friendsData.slice(0, 3);

//         return (
//         <View style={styles.podiumContainer}>
//             {podiumUsers.map((user, index) => (
//             <PodiumItem key={user.id} user={user} />
//             ))}
//         </View>
//         );
//     }

// // ...

//     function renderHeader() {
//     return (
//         <ScrollView
//         style={{
//             position: 'absolute',
//             bottom: 0,
//             left: 0,
//             right: 0,
//             backgroundColor: '#fff',
//             paddingBottom: 75,
//             paddingTop: 10,
//             maxHeight: '60%',
//             borderTopLeftRadius: 20,
//             borderTopRightRadius: 20,

//         }}
//         >
//         <FlatList
//             data={friendsData}
//             keyExtractor={(item) => item.id}
//             renderItem={({ item, index }) => (
//             <View style={styles.rowContainer}>
//                 <View style={styles.rankContainer}>
//                 <Text style={styles.rankText}>{index + 1}</Text>
//                 </View>
//                 <Image source={{ uri: item.imageURL }} style={styles.userImage} />
//                 <Text style={styles.userName}>{item.name}</Text>
//                 <Text style={styles.scoreText}>{item.score}</Text>
//             </View>
//             )}
//         />
//         </ScrollView>
//     );
//     }

//     return (
//         <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.primary }}>
//             { renderPodium() }
//             { renderHeader() }
//         </SafeAreaView>
//     );
// };

// const styles = StyleSheet.create({
//   // Estilos para o PodiumItem
//   podiumItem: {
//     flex: 1,
//     alignItems: 'center',
//     marginBottom: 16,
//   },
//   podiumImage: {
//     width: 80,
//     height: 80,
//     borderRadius: 40,
//     marginBottom: 4,
//   },
//   podiumRectangle: {
//     width: 80, // Largura igual à imagem
//     height: 75, // Altura do retângulo laranja
//     backgroundColor: 'orange',
//     borderTopLeftRadius: 12,
//     borderTopRightRadius: 12,
//     marginBottom: 8,
//   },
//   podiumUserName: {
//     fontSize: 16,
//     color: "#fff",
//     textAlign: 'center',
//   },

//   // Estilos para o container do pódio
//   podiumContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     paddingVertical: 115, // Reduzindo o espaço vertical
//     paddingHorizontal: 18, // Adicionando espaço horizontal
//     backgroundColor: COLORS.primary, // Adicionando uma cor de fundo
//   },//////////////////////////////////////////
//   rowContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingHorizontal: 16,
//     paddingVertical: 8,
//     borderBottomWidth: 1,
//     borderBottomColor: '#F3F3F3',
//   },
//   rankContainer: {
//     backgroundColor: COLORS.primary,
//     borderRadius: 5,
//     paddingHorizontal: 5,
//     paddingVertical: 2,
//     marginRight: 10,
//   },
//   rankText: {
//     fontSize: 14,
//     color: '#fff'
//   },
//   userImage: {
//     width: 37,
//     height: 37,
//     borderRadius: 20,
//     marginRight: 8,
//   },
//   userName: {
//     flex: 3,
//     fontSize: 16,
//   },
//   scoreText: {
//     flex: 1,
//     fontSize: 16,
//     textAlign: 'right',
//   },
// });

// export default RankingTestScreen;

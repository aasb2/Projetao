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
import { TouchableHighlight } from "react-native-gesture-handler";

const RankingScreen = () => {
  const [friendsData, setFriendsData] = useState<DocumentData[]>([]);
  const [isMonthScore, setIsMonthScore] = useState(true);

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

  const handleUpdateScore = () => {
    // Atualize o score para 10% do seu valor atual
    const updatedFriendsData = friendsData.map((friend) => ({
      ...friend,
      score: isMonthScore ? Math.round(friend.score * 0.1) : friend.score * 10,
    }));
    setFriendsData(updatedFriendsData);
    setIsMonthScore(!isMonthScore);
  };

  // const handleResetScore = async () => {
  //   // Atualize o score para 10% do seu valor atual
  //   if (resetButtonPressed == false) {
  //     const originalData = await getFriendsList();
  //     setFriendsData(originalData);
  //     setUpdateButtonPressed(false);
  //     setResetButtonPressed(true);
  //   }
  // };

  const score = [
    200, 185, 178, 164, 140, 138, 125, 112, 105, 90, 82, 70, 68, 60,
  ];
  const sortFriendsData = [...friendsData].sort((a, b) => b.score - a.score);
  const insertText = {
    id: "zone-desconto",
  };
  sortFriendsData.splice(3, 0, insertText);

  function renderHeader() {
    return (
      <View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          backgroundColor: "#AF9EBC",
          paddingVertical: 80,
          paddingHorizontal: 0,
          borderBottomLeftRadius: 150,
          borderBottomRightRadius: 150,
          zIndex: -1,
        }}
      ></View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {renderHeader()}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleUpdateScore}>
          <Text style={styles.buttonText}>
            {isMonthScore ? "Geral" : "Mês"}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{ alignItems: "center" }}>
        <Image
          style={styles.image}
          source={{ uri: "../../assets/images/ranking.png" }}
        />
      </View>
      <View
        style={{
          borderRadius: 20,
          backgroundColor: "#fff",
          flex: 1,
          paddingBottom: 70,
        }}
      >
        <FlatList
          data={sortFriendsData}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => (
            <View style={styles.listItem}>
              {item.id === "zone-desconto" ? (
                <Text style={styles.zoneText}>⬆ ZONA DE PROMOÇÂO ⬆</Text>
              ) : (
                <>
                  <View style={styles.rankContainer}>
                    <Text style={styles.rankText}>
                      {index >= 4 ? index : index + 1}
                    </Text>
                  </View>
                  <Image
                    style={styles.logoUser}
                    source={{ uri: item.imageURL }}
                  />
                  <Text style={styles.nameText}>{item.name}</Text>
                  <Text style={styles.scoreText}>{item.score}</Text>
                </>
              )}
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
    justifyContent: "flex-start",
    backgroundColor: COLORS.primary,
  },
  image: {
    height: 180,
    width: 180,
    marginTop: -10,
  },
  listItem: {
    flexDirection: "row",
    width: "100%",
    paddingHorizontal: 16,
    paddingVertical: 16,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#F3F3F3",
  },
  logoUser: {
    width: 37,
    height: 37,
    borderRadius: 20,
    marginRight: 8,
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
  nameText: {
    flex: 3,
    fontSize: 16,
  },
  scoreText: {
    flex: 1,
    fontSize: 16,
    textAlign: "right",
    fontWeight: "bold",
    color: COLORS.primary,
  },
  zoneText: {
    flex: 1,
    fontSize: 14,
    fontWeight: "bold",
    color: COLORS.primary,
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    paddingVertical: 30,
  },

  button: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 16,
    paddingVertical: 4,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 3,
  },

  buttonText: {
    color: COLORS.white,
    fontSize: 13,
    fontWeight: "500",
  },
});

export default RankingScreen;

// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   ScrollView,
//   FlatList,
//   Image,
//   TextInput,
//   Animated,
//   Easing,
// } from "react-native";
// import React, { useState, useEffect } from "react";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { COLORS, FONTS, SIZES, images } from "../../constants";
// import {
//   AntDesign,
//   MaterialIcons,
//   Ionicons,
//   Feather,
//   Foundation,
//   MaterialCommunityIcons,
// } from "@expo/vector-icons";
// import { LinearGradient } from "expo-linear-gradient";
// import { friends } from "../../constants/data";
// import FeedPost from "../../components/FeedPost";
// import {
//   getFriendsList,
//   getPostsList,
// } from "../../services/functions/community/feedCommunity";
// import { getUserInfo } from "../../services/functions/login/loginUser";
// import {
//   DocumentData,
//   updateDoc,
//   doc,
//   onSnapshot,
//   collection,
//   getDoc,
//   getDocs,
// } from "firebase/firestore";
// import { db } from "../../services/firebaseConfig";
// import Colors from "../../constants/Colors";

// const RankingTestScreen = () => {
//   const [friendsData, setFriendsData] = useState<DocumentData[]>([]);

//   useEffect(() => {
//     const fetchFriends = async () => {
//       try {
//         const dataFriends = await getFriendsList();
//         setFriendsData(dataFriends);
//       } catch (error) {
//         console.error("Erro ao buscar a lista de amigos:", error);
//       }
//     };
//     const unsubscribe = onSnapshot(
//       collection(db, "users"),
//       async (snapshot) => {
//         const updatedFriends = await getFriendsList();
//         setFriendsData(updatedFriends);
//       }
//     );

//     fetchFriends();

//     return () => unsubscribe();
//   }, []);

//   function renderPodium() {
//     const PodiumItem = ({ user, position }) => (
//       <View style={[styles.podiumItem, position === 1 && styles.firstPlace]}>
//         <Image source={{ uri: user.imageURL }} style={styles.podiumImage} />
//         <Text style={styles.podiumUserName}>{user.firstName}</Text>
//         {position !== 1 && <View style={styles.podiumRectangle} />}
//       </View>
//     );

//     // Supondo que você tenha uma lista de 3 melhores amigos (podiumUsers)
//     const podiumUsers = friendsData.slice(0, 3);

//     return (
//       <View style={styles.podiumContainer}>
//         {podiumUsers.map((user, index) => (
//           <PodiumItem key={user.id} user={user} position={index + 1} />
//         ))}
//       </View>
//     );
//   }

//   function renderRanking() {
//     const usersRaking = friendsData.slice(3);
//     return (
//       <View
//         style={styles.headerContainer}
//       >
//         <FlatList
//           data={friendsData}
//           keyExtractor={(item) => item.id}
//           renderItem={({ item, index }) => (
//             <View style={styles.rowContainer}>
//               <View style={styles.rankContainer}>
//                 <Text style={styles.rankText}>{index + 1}</Text>
//               </View>
//               <Image source={{ uri: item.imageURL }} style={styles.userImage} />
//               <Text style={styles.userName}>{item.name}</Text>
//               <Text style={styles.scoreText}>{item.score}</Text>
//             </View>
//           )}
//         />
//       </View>
//     );
//   }

//   return (
//     <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.primary }}>
//       <View style={{ flex: 1 }}>
//         {renderPodium()}
//         {renderRanking()}
//       </View>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   podiumContainer: {
//     flexDirection: "row",
//     justifyContent: "space-around",
//     paddingVertical: 130,
//   },
//   podiumItem: {
//     flex: 1,
//     alignItems: "center",
//     marginBottom: 16,
//   },
//   firstPlace: {
//     width: 170,
//     height: 195,
//     borderTopLeftRadius: 12,
//     borderTopRightRadius: 12,
//     borderLeftWidth: 50,
//     borderRightWidth: 50,
//     borderBottomWidth: 90,
//     borderColor: "transparent",
//     borderTopColor: "orange",
//     borderBottomColor: "orange",
//     position: "absolute",
//     top: 100,
//   },
//   podiumImage: {
//     width: 80,
//     height: 80,
//     borderRadius: 40,
//     marginBottom: 4,
//   },
//   podiumRectangle: {
//     width: 100,
//     height: 60,
//     backgroundColor: "orange",
//     borderTopLeftRadius: 4,
//     borderTopRightRadius: 4,
//     marginBottom: 8,
//   },
//   podiumUserName: {
//     fontSize: 16,
//     color: "#fff",
//     textAlign: "center",
//   }, ////////////////////////////
//   headerContainer: {
//     backgroundColor: "#fff",
//     borderTopLeftRadius: 20,
//     borderTopRightRadius: 20,
//     position: "absolute",
//     bottom: 40,
//     left: 0,
//     right: 0,
//     //height: 30,
//     maxHeight: "50%",
//     flex: 1,
//     paddingBottom: 35,
//   },
//   headerContentContainer: {
//     paddingBottom: 30,
//     paddingTop: "5%",
//   },
//   rowContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     paddingHorizontal: 18,
//     paddingVertical: 8,
//     borderBottomWidth: 1,
//     borderBottomColor: "#F3F3F3",
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
//     color: "#fff",
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
//     textAlign: "right",
//   },
// });

// export default RankingTestScreen;

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
//         <View
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
//         </View>
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

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
  getFriendsList,
  getPostsList,
} from "../services/functions/community/feedCommunity";
import { getProfileInfo } from "../services/functions/profile/profile";
import {
  DocumentData,
  updateDoc,
  doc,
  onSnapshot,
  collection,
} from "firebase/firestore";
import { db } from "../services/firebaseConfig";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";

const ProfileScreen = () => {
  const route = useRoute();
  const [profile, setProfile] = useState<DocumentData[]>([]);

  const userId = route.params ? (route.params as any).userId : null;

  useEffect(() => {
    // Obtém as informações do usuário logado
    const fetchProfileInfo = async (userId: string | null) => {
      try {
        const userData = await getProfileInfo(userId);
        if (userData) {
          setProfile(userData);
        }
      } catch (error) {
        console.error("Erro ao buscar informações de usuário:", error);
      }
    };
    if (userId) {
      fetchProfileInfo(userId);
    }
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
        <Image style={styles.image} source={{ uri: profile.image }} />
        <View style={styles.textContainer}>
          <Text style={styles.boldText}>Você está quase lá!</Text>
          <Text style={styles.smallText}>Pontos para o objetivo</Text>
          <Text style={styles.pointText}>950 pts</Text>
        </View>
      </View>
      {/* Barra de progresso */}
      <View style={{ alignItems: "center" }}>
        <Image
          style={styles.imageBar}
          source={require("../assets/images/Bar.png")}
        />
      </View>
      <View style={styles.whiteContainer}>
        {/* Linha preta */}
        <View style={styles.blackLine}></View>
        {/* Texto "Média" e número "100" */}
        <View style={styles.averageMaxContainer}>
          <View style={styles.textWithNumber}>
            <Text style={styles.averageText}>Média</Text>
            <Text style={styles.averageNumber}>25 pts</Text>
          </View>
          {/* Linha vertical entre "Média" e "Max" */}
          <View style={styles.verticalLine}></View>
          {/* Texto "Max" e número "250" */}
          <View style={styles.textWithNumber}>
            <Text style={styles.maxText}>Max</Text>
            <Text style={styles.maxNumber}>230 pts</Text>
          </View>
        </View>
        <View style={{ alignItems: "center" }}>
          <Image
            style={styles.imageGraph}
            source={require("../assets/images/Graph.png")}
          />
        </View>
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
  contentContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    height: 120,
    width: 120,
    borderRadius: 50,
    marginTop: 30,
    marginBottom: 30,
    marginLeft: 25,
  },
  whiteContainer: {
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
    backgroundColor: "#fff",
    flex: 1,
    paddingBottom: 70,
  },
  textContainer: {
    marginLeft: 20,
    marginBottom: 15,
  },
  boldText: {
    fontSize: 20,
    fontWeight: "500",
    marginTop: 10,
    color: "#FFFFFF",
  },
  smallText: {
    fontSize: 12,
    marginTop: 5,
    color: "#fff",
  },
  pointText: {
    fontSize: 20,
    fontWeight: "500",
    marginTop: 5,
    color: "#fff",
  },
  imageBar: {
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 25,
    marginTop: -20,
  },
  blackLine: {
    height: 3.5,
    width: 70,
    borderRadius: 70,
    backgroundColor: COLORS.primary,
    alignSelf: "center",
    marginTop: 10,
    marginBottom: 10,
  },
  averageMaxContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    paddingHorizontal: 20,
    marginTop: 60,
  },
  textWithNumber: {
    flexDirection: "column",
    alignItems: "center",
    marginTop: 10,
  },
  averageNumber: {
    fontSize: 25,
    fontWeight: "bold",
    color: COLORS.primary,
  },
  maxNumber: {
    fontSize: 25,
    fontWeight: "bold",
    color: COLORS.primary,
  },

  averageText: {
    fontSize: 15,
    fontWeight: "bold",
    color: COLORS.tabSecondary,
  },
  maxText: {
    fontSize: 15,
    fontWeight: "700",
    color: COLORS.tabSecondary,
  },
  verticalLine: {
    width: 2,
    height: 50,
    backgroundColor: COLORS.tabSecondary,
    marginHorizontal: 15,
  },
  imageGraph: {
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 20,
    marginTop: 70,
  },
});

export default ProfileScreen;

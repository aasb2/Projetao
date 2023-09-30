import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Image,
  TextInput,
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
import { getUserInfo } from "../services/functions/login/loginUser";
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
  const router = useRoute();
  const userId = router.params;
  console.log(userId);
};

export default ProfileScreen;

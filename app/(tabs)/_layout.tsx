import { View, Platform, StyleSheet } from 'react-native'
import React from 'react'
import {
    Feather,
    MaterialCommunityIcons,
    Entypo,
    FontAwesome5,
} from '@expo/vector-icons'
import { Tabs } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '../../constants';


const styles = StyleSheet.create({
    tabBarStyle: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        left: 0,
        elevation: 0,
        height: 60,
        backgroundColor: COLORS.primary,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
});

const screenOptions = {
    tabBarShowLabel: false,
    headerShown: false,
    tabBarHideOnKeyboard: true,
    tabBarStyle: styles.tabBarStyle
};


export default function TabLayout() {
    console.log('?????????????')


    return  (
        <Tabs screenOptions={screenOptions}>
            <Tabs.Screen
                name="feed"
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <FontAwesome5
                                name="users"
                                size={24}
                                color={focused ? COLORS.white : COLORS.tabSecondary}
                            />
                        )
                    },
                }}
            />
            <Tabs.Screen
                name="rankingTest"
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <MaterialCommunityIcons
                                name="podium"
                                size={25}
                                color={focused ? COLORS.white : COLORS.tabSecondary}
                            />
                        )
                    },
                }}
            />

            <Tabs.Screen
                name="two"
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <LinearGradient
                                colors={['#4B0082', '#6D458B']}
                                style={{
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    transform: [{ rotate: '-45deg' }],
                                    width: Platform.OS == 'ios' ? 50 : 60,
                                    height: Platform.OS == 'ios' ? 50 : 60,
                                    top: Platform.OS == 'ios' ? -10 : -20,
                                    borderRadius: 23,
                                }}
                            >
                              <View style={{ transform: [{ rotate: '45deg' }] }}>
                                  <Feather
                                      name="plus-circle"
                                      size={24}
                                      color={COLORS.white}
                                  />
                              </View>
                            </LinearGradient>
                        )
                    },
                }}
            />

            <Tabs.Screen
                name="trainingTest"
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <MaterialCommunityIcons
                                name="weight-lifter"
                                size={25}
                                color={focused ? COLORS.white : COLORS.tabSecondary}
                            />
                        )
                    },
                }}
            />

            <Tabs.Screen
                name="achievementsTest"
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <MaterialCommunityIcons
                                name="trophy"
                                size={24}
                                color={focused ? COLORS.white : COLORS.tabSecondary}
                            />
                        )
                    },
                }}
            />
        </Tabs>
    )
}

// export default function Navigation() {
//     WebBrowser.maybeCompleteAuthSession();

//     const [userInfo, setUserInfo] = React.useState<User | null>();
//     const [request, response, promptAsync] = Google.useAuthRequest({
//         androidClientId: "100988905326-mslpnvg22mbk52vuee73q9updl5k8vm0.apps.googleusercontent.com",
//         webClientId: "100988905326-q1b6e6imq9ei9ae76via0fk9h862f83u.apps.googleusercontent.com"
//     })

//     const checkLocalUser = async () => {
//         try {
//             const userJSON = await AsyncStorage.getItem("@user");
//             const userData = userJSON ? JSON.parse(userJSON) : null;
//             setUserInfo(userData);
//         } catch (error) {
//             alert(error);
//         }
//     }

//     useEffect(() => {
//         checkLocalUser();
//         const unsub = onAuthStateChanged(auth, async (user) => {
//             if (user) {
//                 console.log(JSON.stringify(user, null, 2));
//                 await AsyncStorage.setItem("@user", JSON.stringify(user));
//                 setUserInfo(user);
//                 createNewUserDocument(user);
//             } else {
//                 setUserInfo(null);
//             }
//         });
//         return () => unsub();
//     }, []);

//     useEffect(() => {
//         if (response?.type == "success") {
//             const { id_token } = response.params;
//             const credential = GoogleAuthProvider.credential(id_token);
//             signInWithCredential(auth, credential)
//                 .then((result) => {
//                     console.log('entrei aq?')
//                     createNewUserDocument(result.user);
//                     setUserInfo(result.user);
//                 })
//                 .catch((error) => {
//                     console.log(error);
//                 });
//         }
//     }, [response]);

//     return userInfo ? <Login promptAsync={ promptAsync }/> : <BottomTabNavigation/>;
// }

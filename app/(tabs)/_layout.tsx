import { View, Text, Platform, StyleSheet } from 'react-native'
import React from 'react'
import {
    Feather,
    Ionicons,
    MaterialCommunityIcons,
    Entypo,
    FontAwesome,
    FontAwesome5,
} from '@expo/vector-icons'
import { Link, Tabs } from 'expo-router';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { COLORS } from '../../constants'
import { LinearGradient } from 'expo-linear-gradient'

const Tab = createBottomTabNavigator()

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

const BottomTabNavigation = () => {
    return (
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
                            <Entypo
                                name="bar-graph"
                                size={24}
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
                                size={24}
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

export default BottomTabNavigation




// import FontAwesome from '@expo/vector-icons/FontAwesome5';
// import { Link, Tabs } from 'expo-router';
// import { Pressable, useColorScheme } from 'react-native';

// import Colors from '../../constants/Colors';

// /**
//  * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
//  */
// function TabBarIcon(props: {
//   name: React.ComponentProps<typeof FontAwesome>['name'];
//   color: string;
// }) {
//   return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
// }

// export default function TabLayout() {
//   const colorScheme = useColorScheme();

//   return (
//     <Tabs
//       screenOptions={{
//         tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
//       }}>
//       <Tabs.Screen
//         name="index"
//         options={{
//           title: 'Tab One',
//           tabBarIcon: ({ color }) => <TabBarIcon name="users" color={color} />,
//           headerRight: () => (
//             <Link href="/modal" asChild>
//               <Pressable>
//                 {({ pressed }) => (
//                   <FontAwesome
//                     name="info-circle"
//                     size={25}
//                     color={Colors[colorScheme ?? 'light'].text}
//                     style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
//                   />
//                 )}
//               </Pressable>
//             </Link>
//           ),
//         }}
//       />
//       <Tabs.Screen
//         name="two"
//         options={{
//           title: 'Tab Two',
//           tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
//         }}
//       />
//     </Tabs>
//   );
// }

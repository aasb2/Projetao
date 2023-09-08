import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    FlatList,
    Image,
    TextInput,
} from 'react-native'
import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { COLORS, FONTS, SIZES, images } from '../../constants'
import {
    MaterialIcons,
    Ionicons,
    Feather,
    Foundation,
    MaterialCommunityIcons,
} from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import { friends } from '../../constants/data'
import { getFriendsList } from '../../services/functions/community/feedCommunity';
import { DocumentData } from 'firebase/firestore';


const users = [images.user1, images.user2, images.user3, images.user4]

const Feed = () => {

    const [friendsData, setFriendsData] = useState<DocumentData[]>(friends);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchFriends = async () => {
            try {
            const dataFriends = await getFriendsList();
            setFriendsData(dataFriends);
            setIsLoading(false);
            } catch (error) {
            console.error('Erro ao buscar a lista de amigos:', error);
            }
        };

        fetchFriends(); // Chama a função de busca ao montar o componente
    }, []);


    function renderHeader() {
        return (
            <View
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    backgroundColor: '#AF9EBC',
                    paddingVertical: 145,
                    paddingHorizontal: 0,
                    borderBottomLeftRadius: 20,
                    borderBottomRightRadius: 20,
                    zIndex: -1,
                }}
            >
            </View>
        )
    }


    function renderContainer() {
        
        // if (isLoading) {
        //     return <Text>Carregando...</Text>;
        // }
        return (
            <View>
                <View style={{ marginVertical: 8 }}>
                    <Text style={{ ...FONTS.h3 }}>Couro e Osso</Text>
                    <View style={{ marginVertical: 4, flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ ...FONTS.body3, marginLeft: 8 }}>Amigos</Text>
                        <TouchableOpacity onPress={() => console.log('Ver Todos Pressed')}>
                            <Text style={{ ...FONTS.body3, marginLeft: 8, color: 'blue' }}>Ver todos</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                
                                
                <FlatList
                    horizontal={true}
                    data={friendsData}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item, index }) => (
                        <View
                            key={item.id}
                            style={{
                                flexDirection: 'column',
                                flex: 1,
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <TouchableOpacity
                                onPress={() => console.log('Pressed')}
                                style={{
                                    paddingVertical: 4,
                                    marginRight: 10,
                                }}
                            >
                                <Image
                                    source={{ uri: item.imageURL }} // Usar a URL da imagem
                                    resizeMode="contain"
                                    style={{
                                        width: 96,
                                        height: 110,
                                        borderRadius: 80,
                                        borderWidth: 4,
                                        borderColor: '#fff',
                                    }}
                                />
                            </TouchableOpacity>
                            <Text
                                style={{ ...FONTS.body3, fontWeight: 'bold' }}
                            >
                                {item.name}
                            </Text>
                        </View>
                    )}
                />
            </View>
        )
    }



    function renderFeedPost() {
        return (
            <View
                style={{
                    backgroundColor: '#fff',
                    flexDirection: 'column',
                    width: '100%',
                    borderRadius: 26,
                    borderWidth: 1,
                    borderColor: '#fff',
                    marginVertical: 12,
                }}
            >
                {/* Post header */}
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginTop: 8,
                    }}
                >
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginHorizontal: 8,
                        }}
                    >
                        <Image
                            source={images.user1}
                            style={{
                                height: 52,
                                width: 52,
                                borderRadius: 20,
                            }}
                        />

                        <View style={{ marginLeft: 12 }}>
                            <Text
                                style={{ ...FONTS.body4, fontWeight: 'bold' }}
                            >
                                Ankita Shrama
                            </Text>
                        </View>
                    </View>

                    <MaterialCommunityIcons
                        name="dots-vertical"
                        size={24}
                        color={COLORS.black}
                    />
                </View>

                {/* Post content */}

                <View
                    style={{
                        marginHorizontal: 8,
                        marginVertical: 8,
                    }}
                >
                    <Text style={{ ...FONTS.body4 }}>
                      djksajdklasjdkasjdkjskl djsakdjaskjdaksj dksjdkjas
                      jdlaskjdklas jdkjasdkjak
                    </Text>
                </View>

                <View
                    style={{
                        marginHorizontal: 8,
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}
                >
                    <Ionicons
                        name="location-outline"
                        size={21}
                        color={COLORS.primary}
                    />
                    <Text
                        style={{
                            fontSize: 12,
                            fontFamily: 'regular',
                            color: COLORS.primary,
                            marginLeft: 4,
                        }}
                    >
                        Academia Couro e Osso | 10 mins atrás
                    </Text>
                </View>

                {/* Posts likes and comments */}

                <View
                    style={{
                        marginHorizontal: 8,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        paddingBottom: 6,
                    }}
                >
                    <View
                        style={{
                            flexDirection: 'row',
                        }}
                    >
                        <View
                            style={{
                                flexDirection: 'row',

                                alignItems: 'center',
                                marginRight: SIZES.padding2,
                            }}
                        >
                            <Feather
                                name="heart"
                                size={20}
                                color={COLORS.black}
                            />
                            <Text style={{ ...FONTS.body4, marginLeft: 2 }}>
                                22
                            </Text>
                        </View>

                        <View
                            style={{
                                flexDirection: 'row',

                                alignItems: 'center',
                            }}
                        >
                            <MaterialCommunityIcons
                                name="message-text-outline"
                                size={20}
                                color={COLORS.black}
                            />
                            <Text style={{ ...FONTS.body4, marginLeft: 2 }}>
                                22
                            </Text>
                        </View>
                    </View>

                    <View style={{ flexDirection: 'row' }}>
                        <View>
                            <Text
                                style={{ ...FONTS.body4, fontWeight: 'bold' }}
                            >
                                X
                            </Text>
                        </View>
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginLeft: 10,
                            }}
                        >
                            {users.map((user, index) => (
                                <Image
                                    source={user}
                                    key={index}
                                    style={{
                                        width: 25,
                                        height: 25,
                                        borderRadius: 999,
                                        borderWidth: 1,
                                        borderColor: '#fff',
                                        marginLeft: -5,
                                    }}
                                />
                            ))}
                        </View>
                    </View>
                </View>

                {/* comment section */}

                <View
                    style={{
                        flexDirection: 'row',
                        marginHorizontal: 8,
                        paddingVertical: 18,
                        borderTopWidth: 1,
                        borderTopColor: '#FDF6ED',
                    }}
                >
                    <Image
                        source={images.user4}
                        resizeMode="contain"
                        style={{
                            height: 52,
                            width: 52,
                            borderRadius: 26,
                        }}
                    />

                    <View
                        style={{
                            flex: 1,
                            height: 52,
                            borderRadius: 26,
                            borderWidth: 1,
                            borderColor: '#CCC',
                            marginLeft: 12,
                            paddingLeft: 12,
                            justifyContent: 'center',
                        }}
                    >
                        <TextInput
                            placeholder="Add comentário"
                            placeholderTextColor="#CCC"
                        />
                    </View>
                </View>
            </View>
        )
    }


    return (
        <SafeAreaView style= {{ flex: 1, backgroundColor: '#AF9EBC' }}>
            
            <View style={{ flex: 1, paddingBottom: 60, backgroundColor: '#E7E7E7' }}>
                <ScrollView>
                    { renderHeader() }
                    <View style={{ paddingHorizontal: 15 }}>
                        {renderContainer()}
                        {renderFeedPost()}
                        {renderFeedPost()}
                        {renderFeedPost()}
                    </View>
                </ScrollView>
                
            </View>
        </SafeAreaView>
    )
}

export default Feed





// // import { StyleSheet } from 'react-native';

// // import EditScreenInfo from '../../components/EditScreenInfo';
// // import { Text, View } from '../../components/Themed';

// // export default function TabOneScreen() {
// //   return (
// //     <View style={styles.container}>
// //       <Text style={styles.title}>Tab One</Text>
// //       <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
// //       <EditScreenInfo path="app/(tabs)/index.tsx" />
// //     </View>
// //   );
// // }

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     alignItems: 'center',
// //     justifyContent: 'center',
// //   },
// //   title: {
// //     fontSize: 20,
// //     fontWeight: 'bold',
// //   },
// //   separator: {
// //     marginVertical: 30,
// //     height: 1,
// //     width: '80%',
// //   },
// // });

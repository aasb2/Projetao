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
import FeedPost from '../../components/FeedPost';
import { getFriendsList, getPostsList } from '../../services/functions/community/feedCommunity';
import { DocumentData } from 'firebase/firestore';


const users = [images.user1, images.user2, images.user3, images.user4]

const Feed = () => {

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

// ...

    function renderContainer() {
        
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

// ...

    function renderFeedPost() {
        const [postsData, setPostsData] = useState<DocumentData[]>([]);
        const [isLoading, setIsLoading] = useState(true);

        // Função para manipular a curtida de um post
        const handleLikePost = (postId) => {
            // Encontre o post com o ID correspondente na lista de postsData
            const updatedPostsData = postsData.map((post) => {
                if (post.id === postId) {
                    // Verifique o estado atual de "isLiked" e altere-o para o oposto
                    post.isLiked = !post.isLiked;
                    // Incrementa ou decrementa o número de curtidas com base no estado de "isLiked"
                    post.numLike += post.isLiked ? 1 : -1;
                }
                return post;
            });
        
            // Atualize o estado dos posts com a nova lista
            setPostsData(updatedPostsData);
        };

        useEffect(() => {
            const fetchPosts = async () => {
            try {
                const dataPosts = await getPostsList();
                setPostsData(dataPosts);
                setIsLoading(false);
            } catch (error) {
                console.error('Erro ao buscar a lista de posts:', error);
            }
            };

            fetchPosts();
        }, []);

        if (isLoading) {
            return <Text>Carregando...</Text>;
        }

        return <FeedPost postsData={postsData} handleLikePost={handleLikePost} />;

    }



    return (
        <SafeAreaView style= {{ flex: 1, backgroundColor: '#AF9EBC' }}>
            
            <View style={{ flex: 1, paddingBottom: 60, backgroundColor: '#E7E7E7' }}>
                <ScrollView>
                    { renderHeader() }
                    <View style={{ paddingHorizontal: 15 }}>
                        {renderContainer()}
                        {renderFeedPost()}                        
                    </View>
                </ScrollView>
                
            </View>
        </SafeAreaView>
    )
}

export default Feed

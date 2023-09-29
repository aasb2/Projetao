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
    AntDesign,
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
import { getUserInfo } from '../../services/functions/login/loginUser';
import { DocumentData, updateDoc, doc, onSnapshot, collection } from 'firebase/firestore';
import { db } from '../../services/firebaseConfig';


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
        const [userCommunity, setUserCommunity] = useState < DocumentData | undefined > (undefined);
        const [userIcons, setUserIcons] = useState<{ [key: string]: string }>({});

        useEffect(() => {
            const fetchFriends = async () => {
                try {
                    const dataFriends = await getFriendsList();
                    const communityUser = await getUserInfo();

                    setUserCommunity(communityUser);
                    setFriendsData(dataFriends);
                } catch (error) {
                    console.error('Erro ao buscar a lista de amigos:', error);
                }
            };

            // Inicia o ouvinte em tempo real para a coleção de posts
            const unsubscribe = onSnapshot(collection(db, 'users'), async (snapshot) => {
                const updatedFriends = await getFriendsList();
                setFriendsData(updatedFriends);
            });

            // Chama as funções para buscar dados iniciais
            fetchFriends();

            // Retorna uma função de limpeza para interromper o ouvinte quando o componente for desmontado
            return () => unsubscribe();
        }, []);

        async function handleStartTraining() {
            try {
                const user = await getUserInfo(); // Obtenha as informações do usuário logado

                if (user) {
                    const newIsTrainingValue = !user.isTraining;
                    const id = user.id._key.path.segments.slice(-1)[0];
                    const userDocRef = doc(db, 'users', id);
                    console.log("userDocRef", userDocRef);
                    updateDoc(userDocRef, {
                        isTraining: newIsTrainingValue,
                    });

                    console.log('Campo isTraining atualizado para', newIsTrainingValue);
                } else {
                    console.log('O documento não existe.');
                }
            } catch (error) {
                console.error('Erro ao atualizar o campo isTraining:', error);
            }
        }

        const toggleUserIcon = (userId: any) => {
            setUserIcons((prevIcons) => ({
                ...prevIcons,
                [userId]: prevIcons[userId] === 'weight-lifter' ? 'arm-flex' : 'weight-lifter',
            }));

            setTimeout(() => {
                setUserIcons((prevIcons) => ({
                ...prevIcons,
                [userId]: 'weight-lifter',
                }));
            }, 2000);
        };


        const communityName = userCommunity?.communityInfo?.name || '';
        const filteredFriendsData = friendsData.filter(item => item.isTraining);


        return (
            <View>
                <View
                    style={{
                    marginVertical: 8,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    }}
                >
                    <View>
                        <Text style={{ fontSize: 20, fontWeight: '400' }}>{communityName}</Text>
                        <View
                            style={{
                            marginVertical: 4,
                            flexDirection: 'row',
                            alignItems: 'center',
                            }}
                        >
                            <Text style={{ fontSize: 14, marginLeft: 8 }}>Companheiros</Text>
                            <TouchableOpacity onPress={() => console.log('Ver Todos Pressed')}>
                                <Text style={{ fontSize: 14, marginLeft: 8, color: '#4B0082' }}>
                                    Ver todos
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                                        
                    < TouchableOpacity onPress = {() => handleStartTraining()}>
                        <LinearGradient
                        colors={['#4B0082', '#6D458B']}
                        style={{
                            height: 40,
                            width: 40,
                            alignItems: 'center',
                            justifyContent: 'center',
                            shadowColor: '#18274B',
                            shadowOffset: {
                            width: 0,
                            height: 4.5,
                            },
                            shadowOpacity: 0.12,
                            shadowRadius: 6.5,
                            elevation: 2,
                            borderRadius: 16,
                        }}
                        >
                        <MaterialCommunityIcons  name="weight-lifter" size={20} color={COLORS.white} />
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
                
                                
                <FlatList
                    horizontal={true}
                    data={filteredFriendsData}
                    keyExtractor={(item) => item.id} //keyExtractor={(item) => item.id}
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
                                
                                <LinearGradient
                                    colors={['#4B0082', '#6D458B']}
                                    style={{
                                        height: 30,
                                        width: 30,
                                        borderRadius: 15,
                                        position: 'absolute',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        zIndex: 1,
                                        bottom: -3,
                                        right: 32,
                                    }}
                                >
                                    <TouchableOpacity onPress={() => toggleUserIcon(item.id._key.path.segments.slice(-1)[0])}>
                                        <MaterialCommunityIcons
                                            name={userIcons[item.id._key.path.segments.slice(-1)[0]] || 'weight-lifter'} // Use o ícone do estado ou 'weight-lifter' por padrão
                                            size={20}
                                            color={COLORS.white}
                                        />
                                    </TouchableOpacity>
                                </LinearGradient>
                              

                                <Image
                                    source={{ uri: item.imageURL }}
                                    resizeMode="contain"
                                    style={{
                                        width: 100,
                                        height: 100,
                                        borderRadius: 80,
                                        borderWidth: 4,
                                        borderColor: item.isTraining ? '#6D458B' : '#fff',
                                    }}
                                />
                            </TouchableOpacity>
                            <Text
                                style={{ fontSize: 14, fontWeight: '500' }}
                            >
                                {item.firstName}
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
        const [userImg, setUserImg] = useState();
        const [isLoading, setIsLoading] = useState(true);

        // Função para manipular a curtida de um post
        // TODO: VER O TIPO DO postId, eu tipei como qualquer coisa mas tipem certo
        // ass: severino <3
        const handleLikePost = (postId: any) => {
            // Encontre o post com o ID correspondente na lista de postsData
            const updatedPostsData = postsData.map(post => {
                if (post.id === postId) {
                    // Verifique o estado atual de "isLiked" e altere-o para o oposto
                    post.isLiked = !post.isLiked;
                    // Incrementa ou decrementa o número de curtidas com base no estado de "isLiked"
                    post.numLike += post.isLiked ? 1 : -1;

                    const id = postId._key.path.segments.slice(-1)[0];

                    const postDocRef = doc(db, 'posts', id);
                    updateDoc(postDocRef, {
                      isLiked: post.isLiked,
                      numLike: post.numLike,
                    });
                }
                return post;
            });
        
            // Atualize o estado dos posts com a nova lista
            setPostsData(updatedPostsData);
        };

        useEffect(() => {
            // Obtém as informações do usuário logado
            const fetchUserInfo = async () => {
                try {
                    const userData = await getUserInfo() as DocumentData | undefined;;
                    if (userData) {
                        setUserImg(userData.image);
                    }
                } catch (error) {
                console.error('Erro ao buscar informações de usuário:', error);
                }
            };

            // Obtém a lista de posts
            const fetchPosts = async () => {
                try {
                const postsData = await getPostsList();
                setPostsData(postsData);
                setIsLoading(false);
                } catch (error) {
                console.error('Erro ao buscar a lista de posts:', error);
                }
            };

            // Inicia o ouvinte em tempo real para a coleção de posts
            const unsubscribe = onSnapshot(collection(db, 'posts'), async (snapshot) => {
                const updatedPosts = await getPostsList();
                setPostsData(updatedPosts);
            });

            // Chama as funções para buscar dados iniciais
            fetchUserInfo();
            fetchPosts();

            // Retorna uma função de limpeza para interromper o ouvinte quando o componente for desmontado
            return () => unsubscribe();
        }, []);

        if (isLoading) {
            return <Text>Carregando...</Text>;
        }

        return <FeedPost postsData={postsData} handleLikePost={handleLikePost} userImage={userImg} />;
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

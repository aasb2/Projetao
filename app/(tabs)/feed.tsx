import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    FlatList,
    Image,
    RefreshControl,
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
import { DocumentData, updateDoc, doc } from 'firebase/firestore';
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
        const [userCommunity, setUserCommunity] = useState<DocumentData | undefined>(undefined);
        const [isLoading, setIsLoading] = useState(true);

        useEffect(() => {
            const fetchFriends = async () => {
                try {
                    const dataFriends = await getFriendsList();
                    const communityUser = await getUserInfo();

                    setUserCommunity(communityUser);
                    setFriendsData(dataFriends);
                    setIsLoading(false);
                } catch (error) {
                console.error('Erro ao buscar a lista de amigos:', error);
                }
            };

            fetchFriends(); // Chama a função de busca ao montar o componente
        }, []);
        const communityName = userCommunity?.communityInfo?.name || '';

        // async function handleStartTraining() {
        //     try {
        //         const user = await getUserInfo();               
                
        //         if (user) {
        //             const userRef = doc(db, 'users', user.uid);

        //             // Se o campo isTraining for true, defina como false, e vice-versa
        //             const newIsTrainingValue = !user.isTraining;
        //             console.log(newIsTrainingValue)
        //             // Atualiza o campo isTraining com o novo valor no Firestore
        //             await updateDoc(userRef, {
        //                 isTraining: newIsTrainingValue,
        //             });

        //             // Atualize o campo isTraining no estado local friendsData
        //             const updatedFriendsData = friendsData.map((friend) => {
        //                 if (friend.uid === user.uid) {
        //                     console.log("LOCAL",friend)
        //                 // Atualize o valor apenas para o usuário logado
        //                     return {
        //                         ...friend,
        //                         isTraining: newIsTrainingValue,
        //                     };
        //                 }
        //                 return friend;
        //             });

        //             // Atualize o estado friendsData com os novos dados
        //             setFriendsData(updatedFriendsData);

        //             console.log('Campo isTraining atualizado para', newIsTrainingValue);
        //         } else {
        //         console.log('Nenhum usuário autenticado.');
        //         }
        //     } catch (error) {
        //         console.error('Erro ao atualizar o campo isTraining:', error);
        //     }
        // }
        const filteredFriendsData = friendsData.filter(item => item.isTraining);


        return (
            <View>
                <View
                    style={{
                    marginVertical: 8,
                    flexDirection: 'row',
                    justifyContent: 'space-between', // Isso coloca o ícone à direita
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
                                        
                    < TouchableOpacity onPress = {() => console.log('chamar => handleStartTraining()')}>
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
                                {item.isTraining && (
                                    <LinearGradient
                                        colors={['#4B0082', '#6D458B']}
                                        style={{
                                            height: 28,
                                            width: 28,
                                            borderRadius: 15,
                                            position: 'absolute',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            zIndex: 1,
                                            bottom: -3,
                                            right: 32,
                                        }}
                                    >
                                        <MaterialCommunityIcons
                                            name="weight-lifter"
                                            size={20}
                                            color={COLORS.white}
                                        />
                                    </LinearGradient>
                                )}

                                <Image
                                    source={{ uri: item.imageURL }} // Usar a URL da imagem
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
            const fetchPosts = async () => {
            try {
                const dataPosts = await getPostsList();
                const dataUser = await getUserInfo() as DocumentData;

                setUserImg(dataUser.image);
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

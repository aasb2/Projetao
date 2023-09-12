// components/FeedPost.tsx
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
import { COLORS, FONTS, SIZES, images } from '../constants'
import {
    MaterialIcons,
    Ionicons,
    Feather,
    Foundation,
    MaterialCommunityIcons,
} from '@expo/vector-icons'


const users = [images.user1, images.user2, images.user3, images.user4]


const FeedPost = ({ postsData, handleLikePost }) => {
    return (
        <View>
            {postsData.map((post) => (
                <View
                    key={post.id}
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
                                source={{ uri: post.user.imageURL }}
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
                                    {post.user.name}
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
                            {post.content}
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
                        <TouchableOpacity
                            onPress={() => handleLikePost(post.id)} // Chame uma função quando o botão for pressionado
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                marginRight: SIZES.padding2,
                            }}
                        >
                            <Ionicons
                                name="heart"
                                size={20}
                                color={post.isLiked ? COLORS.red : COLORS.black} // Altere a cor do ícone com base no estado de "isLiked" do post
                            />
                            <Text style={{ ...FONTS.body4, marginLeft: 2 }}>
                                {post.numLike}
                            </Text>
                        </TouchableOpacity>

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
                                    {post.numComment}
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
            ))}
        </View>
    );
};

export default FeedPost;

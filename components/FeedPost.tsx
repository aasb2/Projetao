// components/FeedPost.tsx
import { View, Text, TouchableOpacity, Image, TextInput } from "react-native";
import React, { useState } from "react";
import { COLORS, SIZES, images } from "../constants";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import { NavigationProp } from "@react-navigation/native";

const users = [images.user1, images.user2, images.user3, images.user4];

const FeedPost = ({ postsData, handleLikePost, userImage }: any) => {
  const [comments, setComments] = useState(postsData.map(() => ""));
  const navigation = useNavigation<NavigationProp<any>>();

  const handleCommentChange = (text: String, index: number) => {
    const newComments = [...comments];
    newComments[index] = text;
    setComments(newComments);
  };

  const openComments = (postId: any) => {
    // mandar p outra tela com o id do post
    navigation.navigate("Comments", { postId });
  };

  return (
    <View>
      {postsData.map((post: any, index: number) => (
        <View
          key={post.id}
          style={{
            backgroundColor: "#fff",
            flexDirection: "column",
            width: "100%",
            borderRadius: 26,
            borderWidth: 1,
            borderColor: "#fff",
            marginVertical: 12,
          }}
        >
          {/* Post header */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: 8,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
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
                <Text style={{ fontSize: 14, fontWeight: "bold" }}>
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
            <Text style={{ fontSize: 14 }}>{post.content}</Text>
          </View>

          <View
            style={{
              marginHorizontal: 8,
              flexDirection: "row",
              alignItems: "center",
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
                fontFamily: "regular",
                color: COLORS.primary,
                marginLeft: 4,
              }}
            >
              {post.location} | 10 mins atrás
            </Text>
          </View>

          {/* Posts likes and comments */}

          <View
            style={{
              marginHorizontal: 8,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              paddingBottom: 6,
            }}
          >
            <View
              style={{
                flexDirection: "row",
              }}
            >
              <TouchableOpacity
                onPress={() => handleLikePost(post.id)} // Chame uma função quando o botão for pressionado
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginRight: SIZES.padding2,
                }}
              >
                <MaterialCommunityIcons
                  name="arm-flex"
                  size={20}
                  color={post.isLiked ? "#A64EFF" : COLORS.black} // Altere a cor do ícone com base no estado de "isLiked" do post
                />
                <Text style={{ fontSize: 14, marginLeft: 2 }}>
                  {post.numLike}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => openComments(post.id)}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <MaterialCommunityIcons
                  name="message-text-outline"
                  size={20}
                  color={COLORS.black}
                />
                <Text style={{ fontSize: 14, marginLeft: 2 }}>
                  {post.numComment}
                </Text>
              </TouchableOpacity>
            </View>

            <View style={{ flexDirection: "row" }}>
              <View>
                <Text style={{ fontSize: 14, fontWeight: "bold" }}></Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
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
                      borderColor: "#fff",
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
              flexDirection: "row",
              marginHorizontal: 8,
              paddingVertical: 18,
              borderTopWidth: 1,
              borderTopColor: "#FDF6ED",
            }}
          >
            <Image
              source={{ uri: userImage }}
              resizeMode="contain"
              style={{
                height: 48,
                width: 48,
                borderRadius: 26,
              }}
            />

            <View
              style={{
                flex: 1,
                height: 52,
                borderRadius: 26,
                borderWidth: 1,
                borderColor: "#CCC",
                marginLeft: 12,
                paddingLeft: 12,
                justifyContent: "center",
              }}
            >
              <TextInput
                placeholder="Add comentário"
                placeholderTextColor="#CCC"
                value={comments[index]}
                onChangeText={(text) => handleCommentChange(text, index)}
              />
            </View>
            <TouchableOpacity
              onPress={() => {
                console.log("Comentário enviado");
                const newComments = [...comments];
                newComments[index] = "";
                setComments(newComments);
              }}
              style={{
                paddingHorizontal: 8,
                alignItems: "center",
                flexDirection: "row",
              }}
            >
              <Text
                style={{
                  color: COLORS.primary,
                  fontWeight: "bold",
                  alignItems: "center",
                }}
              >
                Add
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </View>
  );
};

export default FeedPost;

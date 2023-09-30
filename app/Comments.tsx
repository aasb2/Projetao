import React from 'react'
import { View, Text } from 'react-native'
import { useRoute } from '@react-navigation/native';
import { getComments } from '../services/functions/community/feedCommunity';

export default async function Comments() {
    const router = useRoute();
    const postId = router.params;


    const commentCard = (postId: any) => {
        // const comments = await getComments(postId);
                
        return (
            <View>
                {/* {comments.map((comment: any, index: any) => (
                    
                ))} */}
            </View>
        )
    }


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
            { commentCard(postId) }

            <Text>TO aq</Text>
        </View>
    )
}
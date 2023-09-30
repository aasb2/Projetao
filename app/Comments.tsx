import React, { useEffect, useState } from 'react'
import { View, Text } from 'react-native'
import { useRoute } from '@react-navigation/native';
import { getComments } from '../services/functions/community/feedCommunity';
import { combineContextAndProps } from 'native-base';

const Comments = () => {
    const router = useRoute();
    const [comments, setComments] = useState<any>();

    const postId = router.params;
    useEffect(() => {
        const getAllComments = async (postId: any)  => {
            const allComments = await getComments(postId);
            setComments(allComments);
            console.log(comments)
        }
        getAllComments(postId)
        
        // return () => unsubscribe();
    }, []);


    
    

    


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
        </View>
    )
}

export default Comments
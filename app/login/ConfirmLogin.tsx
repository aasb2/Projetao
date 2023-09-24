import React from 'react';
import appTheme from '../../constants/theme';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';


export function ConfirmLogin() {
    return (
        <View
            style={styles.container}
        >
            <Text>To aq</Text>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: appTheme.COLORS.primary,
        paddingTop: 100
    },
    containerLogo: {
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'center',
    },
    containerForm: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 30
    },
    title: {
        marginTop: 10,
        fontSize: 35,
        color: 'white',
        fontFamily: 'Roboto_700Bold'
    },
    description: {
        fontFamily: 'Roboto_400Regular',
        color: appTheme.COLORS.secondary,
        fontSize: 16,
    },
    icons: {
        paddingTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    }
});
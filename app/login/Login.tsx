import React from 'react';
import appTheme from '../../constants/theme';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';


export function Login({ promptAsync }: any) {
    return (
        <View
            style={styles.container}
        >
            <View
                style={styles.containerLogo}
            >
                <Image
                    source={require('../../assets/images/logo.png')}
                    style={{ width: 120, height: 120, marginTop: 100 }}
                />

                <Text
                    style={styles.title}
                >
                    Unity FIT
                </Text>
            </View>


            <View style={styles.containerForm}>
                <Text style={styles.description}>
                    Acesse com:
                </Text>

                <View style={styles.icons}>
                    <TouchableOpacity
                        onPress={() => promptAsync()}
                        style={{
                            width: 36,
                            height: 36,
                        }}
                    >
                        <AntDesign
                            name="google"
                            size={30}
                            color="white"
                        />
                    </TouchableOpacity>
                </View>
            </View>
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
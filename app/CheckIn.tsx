import React, { useState } from "react";
import { Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import appTheme from "../constants/theme";
import { linkToPersonal } from "../services/functions/login/loginUser";
import { useNavigation } from "expo-router";


export default function CheckIn() {
    const [inputValue, setInputValue] = useState<string | undefined>(undefined);
    const navigation = useNavigation();

    const handleInputChange = (text: string) => {
        setInputValue(text);
    };

    const handleSubmit = async () => {
        if (inputValue) {
            await linkToPersonal(inputValue);
            navigation.navigate('(tabs)')
        } else {
            alert("Digite uma referência válida");
        }
    };

    return (
        <View style={styles.container}>

            <View style={styles.inputContainer}>
                <Text style={styles.personalTitle}>
                    Digite o código do seu Personal Trainer
                </Text>

                <Text style={styles.subTitle}>
                    Todo Personal Trainer possue um código de 6 digitos
                </Text>

                <TextInput
                    placeholder="Digite o número do aluno"
                    style={styles.input}
                    value={inputValue}
                    onChangeText={handleInputChange}
                    keyboardType="numeric"
                />

            </View>
            <TouchableOpacity
                onPress={handleSubmit}
                style={styles.button}
            >
                <Text style={styles.optionText}>Continuar</Text>
            </TouchableOpacity>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        gap: 10
    },
    headerText: {
        fontSize: 18,
        marginRight: 10,
    },
    optionButton: {
        padding: 8,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: appTheme.COLORS.primary,
    },
    optionText: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center'
    },
    selectedOption: {
        color: 'white',
        backgroundColor: appTheme.COLORS.primary,
        borderColor: appTheme.COLORS.primary,
    },
    inputContainer: {
        marginTop: 20,
    },
    input: {
        marginTop: 50,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
    personalTitle: {
        fontWeight: 'bold',
        fontSize: 20
    },
    subTitle: {
        marginTop: 10,
        fontSize: 15,
    },
    button: {
        backgroundColor: appTheme.COLORS.primary,
        borderRadius: 10, // Raio das bordas do contêiner
        paddingVertical: 10, // Espaçamento vertical do contêiner
        paddingHorizontal: 20, // Espaçamento horizontal do contêiner
    }
});
import * as React from "react";
import { Text, StyleSheet, View, Image, ScrollView, Touchable, TouchableOpacity, Pressable } from "react-native";
import { useFonts, Roboto_400Regular, Roboto_700Bold, Roboto_100Thin } from '@expo-google-fonts/roboto'
import { TextInput } from "react-native-gesture-handler";
import Color from '../../constants/Colors';

const Prescricao = () => {
    const [inputText, setText] = React.useState<string>('');
    const [checkboxes, setCheckboxes] = React.useState([
        { exercise: 'Remada Baixa', exerciseType: 'Dorsal - Remada', checked: false },
        { exercise: ' Remada Alta', exerciseType: 'Dorsal - Remada', checked: false },
        { exercise: 'Remada Curvada', exerciseType: 'Dorsal - Remada', checked: false },
        { exercise: 'Remada Invertida', exerciseType: 'Dorsal - Remada', checked: false },
    ]);
    const [selectedButton, setSelectedButton] = React.useState(0);


    const [fontLoaded] = useFonts({
        Roboto_100Thin,
        Roboto_400Regular,
        Roboto_700Bold
    })


    if (!fontLoaded) {
        return null;
    }

    const options = [
        { value: 'Costas' },
        { value: 'Pernas' },
        { value: 'Bíceps' },
        { value: 'Ombro' },
        { value: 'Glúteos', },
    ]

    const toggleCheckbox = (index: number) => {
        const updatedCheckboxes = [...checkboxes];
        updatedCheckboxes[index].checked = !updatedCheckboxes[index].checked;
        setCheckboxes(updatedCheckboxes);
    };

    const handleSavePress = () => {

    };

    const handleOptionPress = (index: number) => {
        setSelectedButton(index);
    };

    const handleInputChange = (inputText: string) => {
        setText(inputText);
    };

    const handleSubmit = () => {
        alert('pesquisa por: ' + inputText)
    };

    return (
        <View style={styles.prescricaoTreinos}>
            <View style={styles.headerMobile}>
                <Image
                    style={[styles.icon]}
                    resizeMode="cover"
                    source={require('../../assets/images/west.svg')}
                />
                <Text style={[styles.headerText]}>
                    Treinos
                </Text>
            </View>

            <View style={styles.bodyPartsWrapper}>
                <ScrollView horizontal
                    showsHorizontalScrollIndicator={false}
                    style={styles.bodyParts}>

                    {options.map((option, index) => (
                        <Pressable
                            key={option.value}
                            style={selectedButton === index ? [styles.bodyPart, styles.selected] : styles.bodyPart}
                            onPress={() => handleOptionPress(index)}>
                            <Text
                                style={selectedButton === index ? [styles.bodyPartText, styles.selected] : styles.bodyPartText}
                            >{option.value}</Text>
                        </Pressable>
                    ))}
                </ScrollView>
            </View>

            <View style={styles.body}>
                <View style={styles.searchBar}>
                    <View style={[styles.inputField]}>
                        <TextInput
                            style={styles.searchText}
                            placeholder="Pesquisar"
                            onChangeText={handleInputChange}
                            value={inputText}
                        />
                        <Pressable onPress={handleSubmit}>
                            <Image
                                style={[styles.icon]}
                                resizeMode="cover"
                                source={require('../../assets/images/search.svg')}
                            />
                        </Pressable>
                    </View>
                </View>

                <View style={styles.exercises}>
                    {checkboxes.map((checkbox, index) => (
                        <View key={checkbox.exercise} style={[styles.exercise]}>
                            <TouchableOpacity style={checkbox.checked ? [styles.checkbox, styles.checked] : styles.checkbox}
                                onPress={() => toggleCheckbox(index)}>
                                <Image
                                    style={styles.darkcheckIcon}
                                    resizeMode="cover"
                                    source={require('../../assets/images/darkcheck.svg')}
                                />
                            </TouchableOpacity>
                            <View style={styles.exerciseTexts}>
                                <Text style={[styles.exerciseText]}>
                                    {checkbox.exercise}
                                </Text>
                                <Text style={styles.exerciseTextSmall}> {checkbox.exerciseType}</Text>
                            </View>
                        </View>
                    ))}
                </View>

                <View>
                    <Pressable style={styles.button} onPress={handleSavePress}>
                        <Text style={styles.buttonText}>Salvar e Continuar</Text>
                    </Pressable>
                </View>

            </View>
        </View>

    );
};

const styles = StyleSheet.create({
    prescricaoTreinos: {
        color: Color.prescricao.light_gray,
        height: '100%',
        overflow: "hidden",
        width: "100%",
        maxWidth: 550,
        flex: 1,
        backgroundColor: Color.prescricao.white,
    },
    headerMobile: {
        width: '100%',
        padding: 20,
        alignSelf: "stretch",
        backgroundColor: Color.prescricao.purple,
        flexDirection: "row",
    },
    body: {
        padding: 48,
        paddingTop: 16
    },
    icon: {
        width: 24,
        height: 24,
    },
    headerText: {
        paddingLeft: 12,
        color: Color.prescricao.white,
        fontSize: 20,
        fontFamily: 'Roboto_400Regular',
    },
    bodyParts: {
        display: 'flex',
        flexDirection: 'row',
        columnGap: 12,
        width: '100%',
        padding: 10,
        overflowX: 'hidden',
        marginTop: 10,
    },
    bodyPartText: {
        fontSize: 16,
        textAlign: "center",
        color: "#4b0082",
        fontFamily: 'Roboto_400Regular',
        borderRadius: 20
    },
    bodyPart: {
        borderRadius: 20,
        justifyContent: "center",
        borderWidth: 1,
        borderColor: "#4b0082",
        shadowOpacity: 0.4,
        shadowRadius: 4,
        shadowOffset: {
            width: 0,
            height: 4,
        },
        width: 100,
        height: '100%',
        marginRight: 10,
    },
    bodyPartsWrapper: {
        height: 70
    },
    inputField: {
        borderRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 2,
        width: '100%',
        height: 42,
        borderWidth: 1,
        alignItems: "center",
        flexDirection: "row",
        borderColor: "#4b0082",
        borderStyle: "solid",
        backgroundColor: Color.prescricao.white,
    },
    searchBar: {
        flexDirection: 'row'
    },
    searchText: {
        width: '95%',
        fontSize: 16,
        marginRight: 8,
    },
    exercises: {
        marginTop: 24,
        flexDirection: 'column',
        rowGap: 16,
        width: '100%',
        margin: 'auto',

    },
    exercise: {
        borderWidth: 1.2,
        borderColor: "#4b0082",
        borderStyle: "solid",
        borderRadius: 20,
        height: 70,
        width: 200,
        flexDirection: 'row',
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    checkbox: {
        height: 26,
        width: 26,
        shadowOpacity: 1,
        elevation: 4,
        shadowRadius: 4,
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowColor: "rgba(0, 0, 0, 0.25)",
        borderWidth: 4,
        borderColor: "#4b0082",
        borderStyle: "solid",
        borderRadius: 3,
        marginHorizontal: 16,
        marginTop: 'auto',
        marginBottom: 'auto',
        boxSizing: 'border-box'
    },
    checked: {
        backgroundColor: "#4b0082",
        borderWidth: 0
    },
    exerciseTexts: {
        marginTop: 'auto',
        marginBottom: 'auto',
    },
    exerciseText: {
        textAlign: "center",
        fontSize: 16,
        fontFamily: 'Roboto_400Regular',
    },
    exerciseTextSmall: {
        color: Color.prescricao.gray,
        textAlign: "center",
        fontSize: 14,
        fontFamily: 'Roboto_400Regular',
    },
    darkcheckIcon: {
        height: "45.72%",
        width: "45.72%",
        maxWidth: "100%",
        maxHeight: "100%",
        margin: 'auto'
    },
    button: {
        padding: 12,
        margin: 'auto',
        marginTop: 40,
        borderRadius: 20,
        backgroundColor: Color.prescricao.purple,
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 16,
    },
    selected: {
        backgroundColor: Color.prescricao.purple,
        color: Color.prescricao.white
    }
});

export default Prescricao;

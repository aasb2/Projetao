import * as React from "react";
import { Text, StyleSheet, View, Image, ScrollView, Touchable, TouchableOpacity, Pressable } from "react-native";
import { useFonts, Roboto_400Regular, Roboto_700Bold, Roboto_100Thin } from '@expo-google-fonts/roboto'
import { TextInput } from "react-native-gesture-handler";
import Color from '../../constants/Colors';
import { useRouter } from "expo-router";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { db } from "../../services/firebaseConfig";
import { useEffect } from "react";
import { useId } from 'react';


interface checkboxStruct {
    id: string;
    exercise: string;
    exerciseType: string;
    checked: boolean
}

const Prescricao = () => {
    const router = useRouter();



    const [inputText, setInputText] = React.useState<string>('');
    const [checkboxes, setCheckboxes] = React.useState<checkboxStruct[]>([]);
    const [selectedButton, setSelectedButton] = React.useState<string>('');

    const getPrescriptions = () => {
        const collectionRef = collection(db, "prescriptions")
        let prescriptions = []
        getDocs(collectionRef).then((snapshot)=>{
            // console.log("doc",snapshot.docs)
            snapshot.docs.forEach((doc) => {
            prescriptions.push({...doc.data(), id: doc.id})

         })
         console.log("Pre", prescriptions)
        }).catch(err =>{console.log(err.message)})
        setCheckboxes(prescriptions)
        return prescriptions
    }
    useEffect(() =>{
        const collectionRef = collection(db, "prescriptions")
        let prescriptions = []
        onSnapshot(collectionRef,(snapshot)=>{
            
            snapshot.docs.forEach((doc) => {
                if (doc.id==="uEDYZGRrI5crs3xrcQoY"){
                    let data = doc.data()
                    // prescriptions.push({exercise:data.exerciseName, exerciseType:exerci, checked:false })
                    // data.forEach((prescription) => {
                    prescriptions.push({...data})
                    // })
                } else{
                    console.log("ID",doc.id)
                }
            })
        })
        console.log("pre",prescriptions)
        setCheckboxes(prescriptions)
        
    },[])



    const options = [
        { value: 'Costas' },
        { value: 'Pernas' },
        { value: 'Bíceps' },
        { value: 'Ombros' },
        { value: 'Glúteos' },
    ]

    const [fontLoaded] = useFonts({
        Roboto_100Thin,
        Roboto_400Regular,
        Roboto_700Bold
    })


    if (!fontLoaded) {
        return null;
    }


    const toggleCheckbox = (checkboxToSwitch: checkboxStruct) => {
        checkboxToSwitch.checked = !checkboxToSwitch.checked;

        setCheckboxes([...checkboxes]);
    };

    const handleSavePress = () => {
        const checkedCheckboxes = checkboxes.filter((checkbox) => checkbox.checked);
        const chosenExercises = checkedCheckboxes.map((checkbox) => checkbox.exercise);

        //vai para a pagina de especificaçao enviando os exercicios escolhidos
        router.push({ 'pathname': '/prescricao-especificacao', params: { 'exercises': chosenExercises } });
    };
    const handleOptionPress = (value: string) => {
        if (selectedButton == value) {
            setSelectedButton('');
        }
        else
            setSelectedButton(value);
    };

    const handleInputChange = (text: string) => {
        setInputText(text);
    };

    const handleSubmit = () => {
        alert('pesquisa por: ' + inputText);
    };

    // Filtrar os exercícios com base na opção selecionada
    const filteredExercises = checkboxes.filter((checkbox) => {
        if (!selectedButton) return true; // Se nenhuma opção estiver selecionada, exibir todos os exercícios
        return checkbox.exerciseType === selectedButton;
    });

    return (
        <View style={styles.prescricaoTreinos}>
            <View style={styles.headerMobile}>
                <Image
                    style={[styles.icon]}
                    resizeMode="contain"
                    source={require('../../assets/images/left.png')}
                />
                <Text style={[styles.headerText]}>
                    Treinos
                </Text>
            </View>

            <View style={styles.exerciseTypesWrapper}>
                <ScrollView horizontal
                    showsHorizontalScrollIndicator={false}
                    style={styles.exerciseTypes}>

                    {options.map((option, index) => (
                        <Pressable
                            key={option.value}
                            style={selectedButton === option.value ? [styles.exerciseType, styles.selected] : styles.exerciseType}
                            onPress={() => handleOptionPress(option.value)}>
                            <Text
                                style={selectedButton === option.value ? [styles.exerciseTypeText, styles.selected] : styles.exerciseTypeText}
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
                                resizeMode="contain"
                                source={require('../../assets/images/search.png')}
                            />
                        </Pressable>
                    </View>
                </View>

                <View style={styles.exercisesWrapper}>
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        style={styles.exercises}>
                        {filteredExercises.map((checkbox, index) => (
                            <View key={checkbox.id} style={styles.exercise}>
                                <TouchableOpacity
                                    style={checkbox.checked ? [styles.checkbox, styles.checked] : styles.checkbox}
                                    onPress={() => toggleCheckbox(checkbox)}>
                                    <Image
                                        style={[styles.icon, styles.checkIcon]}
                                        resizeMode='contain'
                                        source={require('../../assets/images/checkmark.png')}
                                    />
                                </TouchableOpacity>
                                <View style={styles.exerciseTexts}>
                                    <Text style={styles.exerciseText}>
                                        {checkbox.exercise}
                                    </Text>
                                    <Text style={styles.exerciseTextSmall}> {checkbox.exerciseType}</Text>
                                </View>
                            </View>
                        ))}
                    </ScrollView>
                </View>


            </View>
            <View style={styles.buttonWrapper}>
                <Pressable style={styles.button} onPress={handleSavePress}>
                    <Text style={styles.buttonText}>Salvar e Continuar</Text>
                </Pressable>
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
        backgroundColor: Color.prescricao.white,
    },
    headerMobile: {
        width: '100%',
        height: '10%',
        padding: 20,
        paddingTop:30,
        alignSelf: "stretch",
        backgroundColor: Color.prescricao.purple,
        flexDirection: "row",
    },
    body: {
        padding: 48,
        paddingTop: 16,
        height: '80%',
        boxSizing: 'border-box',
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
    exerciseTypes: {
        display: 'flex',
        flexDirection: 'row',
        columnGap: 12,
        width: '100%',
        padding: 10,
        overflowX: 'hidden',
        marginTop: 10,
    },
    exerciseTypeText: {
        fontSize: 16,
        textAlign: "center",
        color: "#4b0082",
        fontFamily: 'Roboto_400Regular',
        borderRadius: 20
    },
    exerciseType: {
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
    exerciseTypesWrapper: {
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
        width: '90%',
        fontSize: 16,
        marginRight: 8,
    },
    exercisesWrapper: {
        marginTop: 20,
        width: '100%',
        height: '80%',
    },
    exercises: {
        flexDirection: 'column',
        width: '100%',
        height: '64%',
        margin: 'auto',
    },
    exercise: {
        borderWidth: 1.2,
        borderColor: "#4b0082",
        borderStyle: "solid",
        borderRadius: 20,
        height: 70,
        width: 240,
        flexDirection: 'row',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 8,
        marginBottom: 8
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
        flex: 1,
        marginRight:26
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
    checkIcon: {
        height: "50%",
        width: "50%",
        marginTop: 'auto',
        marginBottom: 'auto',
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    buttonWrapper: {
        position: 'absolute',
        bottom: 20,
        justifyContent: 'center',
        width: '100%',
    },
    button: {
        alignSelf: 'center',
        padding: 12,
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

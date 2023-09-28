import * as React from "react";
import { Text, StyleSheet, View, Image, ScrollView, TextInput, Pressable, Modal } from "react-native";
import { useFonts, Roboto_400Regular, Roboto_700Bold, Roboto_100Thin } from '@expo-google-fonts/roboto'
import Color from '../../constants/Colors';
import { useLocalSearchParams, router } from 'expo-router';
import { db } from "../../services/firebaseConfig";
import { doc, addDoc, collection, updateDoc, arrayUnion } from 'firebase/firestore';
import { useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";
//import { getUserInfo } from '../../services/functions/login/loginUser';

interface ExerciseStruct {
    exercise: string;
    kg: number;
    reps: number;
    sets: number;
}

const PrescricaoEspecificacao = () => {
    const params = useLocalSearchParams<{ exercises: string }>();

    const [exerciseOptions, setExercises] = useState<ExerciseStruct[]>([]);

    const [trainingName, setTrainingName] = useState<String>('');

    const [isModalVisible, setModalVisible] = useState(false);

    const togglePopup = () => {
        setModalVisible(!isModalVisible);
    };

    //atualiza os exercicios quando params muda
    useEffect(() => {
        if (Object.keys(params).length != 0 && params.exercises != "") {
            //console.log(params);

            const exercisesArr = params.exercises.split(',');
            const chosenExercises = exercisesArr.map(ex => ({ exercise: ex, kg: 10, reps: 10, sets: 1 }));

            setExercises(chosenExercises);
        }
        else {
            setExercises([]);
        }
    }, [params]);

    const [fontLoaded] = useFonts({
        Roboto_100Thin,
        Roboto_400Regular,
        Roboto_700Bold
    })

    if (!fontLoaded) {
        return null;
    }

    const updateTrainSets = (sets: string, exIndex: number) => {
        const newExerciseOptions = [...exerciseOptions]
        const numericSets = sets.replace(/[^0-9]/g, '');
        newExerciseOptions[exIndex].sets = (numericSets == "") ? 0 : parseInt(numericSets);
        setExercises(newExerciseOptions);
    };
    const updateTrainRep = (reps: string, exIndex: number) => {
        const newExerciseOptions = [...exerciseOptions]
        const numericReps = reps.replace(/[^0-9]/g, '');
        newExerciseOptions[exIndex].reps = (numericReps == "") ? 0 : parseInt(numericReps);
        setExercises(newExerciseOptions);
    };

    const updateTrainWeight = (weight: string, exIndex: number) => {
        const newExerciseOptions = [...exerciseOptions];
        const numericWeight = weight.replace(/[^0-9]/g, '');
        newExerciseOptions[exIndex].kg = (numericWeight == "") ? 0 : parseInt(numericWeight);
        setExercises(newExerciseOptions);
    };

    const handleSavePress = async () => {
        //id para teste, já que ainda não tem como pegar ele por enquanto
        //eventualmente substituir por
        //const currUser = await getUserInfo();
        const userId = "H0KOddwlI97ank63RKAG";
        const currUser = doc(db, 'users', userId);

        const presCollection = collection(db, 'workouts');

        //cria novo treino
        const addedPresc = await addDoc(presCollection, {
            prescriptions: exerciseOptions,
            treino: trainingName
        });

        //atualiza referencias no usuario
         await updateDoc(currUser,{
            workouts: arrayUnion(addedPresc)
        })

        alert("Adicionado com sucesso em " + addedPresc.id);
        togglePopup();
    };

    return (
        <View style={styles.prescricaoTreinos}>
            <View style={styles.headerMobile}>
                <Image
                    style={[styles.icon]}
                    resizeMode="cover"
                    source={require('../../assets/images/left.png')}
                />
                <Text style={[styles.headerText]}>
                    Treinos - Especificação
                </Text>
            </View>


            <View style={styles.body}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={isModalVisible}
                    onRequestClose={togglePopup}
                >
                    <View style={styles.popup}>
                        <View style={styles.popupBody}>
                            <View style={styles.popupCloseWrapper}>
                                <Pressable
                                    style={styles.popupClose}
                                    onPress={() => togglePopup()}>
                                    <Image
                                        style={[styles.icon]}
                                        resizeMode="contain"
                                        source={require('../../assets/images/close.png')}
                                    />
                                </Pressable>
                            </View>
                            <Text style={styles.popupText}>Dê um nome a seu treino</Text>
                            <View style={styles.popupInputWrapper}>
                                <TextInput
                                    style={styles.popupInput}
                                    placeholder=""
                                    onChangeText={(text) => setTrainingName(text)}
                                    value={trainingName.toString()}
                                    keyboardType="ascii-capable"
                                />
                            </View>
                            <View style={styles.buttonWrapper}>
                                <Pressable style={styles.button} onPress={handleSavePress}>
                                    <Text style={styles.buttonText}>Salvar Treino</Text>
                                </Pressable>
                            </View>
                        </View>
                    </View>

                </Modal>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={styles.exercises}>

                    {exerciseOptions.map((option, exIndex) => (
                        <View key={exIndex} style={styles.exerciseOption}>
                            <View style={styles.exerciseMain}>

                                <View style={styles.exerciseTextWrapper}>
                                    <Text style={styles.exerciseText}>
                                        {option.exercise}
                                    </Text>
                                </View>

                            </View>

                            <View style={styles.trainingProperties}>
                                <View style={styles.trainingProp}>
                                    <Text style={styles.trainingPropText}>
                                        Séries
                                    </Text>
                                    <View style={styles.trainingInputWrapper}>
                                        <TextInput
                                            style={styles.trainingInput}
                                            placeholder="0"
                                            onChangeText={(text) => updateTrainSets(text, exIndex)}
                                            value={option.sets.toString()}
                                            keyboardType="numeric"
                                        />
                                    </View>
                                </View>
                                <View style={styles.trainingProp}>
                                    <Text style={styles.trainingPropText}>
                                        Repetições
                                    </Text>
                                    <View style={styles.trainingInputWrapper}>
                                        <TextInput
                                            style={styles.trainingInput}
                                            placeholder="0"
                                            onChangeText={(text) => updateTrainRep(text, exIndex)}
                                            value={option.reps.toString()}
                                            keyboardType="numeric"
                                        />
                                    </View>
                                </View>

                                <View style={styles.trainingProp}>
                                    <Text style={styles.trainingPropText}>
                                        Peso
                                    </Text>
                                    <View style={styles.trainingInputWrapper}>
                                        <TextInput
                                            style={styles.trainingInput}
                                            placeholder="0"
                                            onChangeText={(text) => updateTrainWeight(text, exIndex)}
                                            value={option.kg.toString()}
                                            keyboardType="numeric"
                                        />
                                    </View>
                                </View>


                            </View>
                        </View>
                    ))}

                </ScrollView>
                <View style={styles.buttonWrapper}>
                    <Pressable style={styles.button} onPress={togglePopup}>
                        <Text style={styles.buttonText}>Continuar</Text>
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
        backgroundColor: Color.prescricao.white,
    },
    headerMobile: {
        width: '100%',
        padding: 20,
        paddingTop: 30,
        alignSelf: "stretch",
        backgroundColor: Color.prescricao.purple,
        flexDirection: "row",
    },
    body: {
        padding: 44,
        paddingTop: 10,
        height: '93%',
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
    exercises: {
        marginTop: 24,
        flexDirection: 'column',
        rowGap: 16,
        width: '100%',
        height: '10%',
    },
    exerciseOption: {
        flexDirection: 'column',
        paddingBottom: 10,
        marginBottom: 10,
        borderWidth: 2,
        borderRadius: 14,
        borderColor: Color.prescricao.purple,
    },
    exerciseMain: {
        height: 48,
        flexDirection: 'row',
    },
    exerciseTextWrapper: {
        borderRadius: 10,
        justifyContent: "center",
        width: '100%',
        height: '100%',
        backgroundColor: Color.prescricao.purple,
    },
    exerciseText: {
        fontFamily: 'Roboto_700Bold',
        fontSize: 18,
        marginLeft: 16,
        color: 'white'
    },
    trainingProperties: {
        width: '100%',
        marginBottom: 12,
        marginRight: 30,
        marginTop: 12,
        columnGap: 10,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    trainingProp: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        rowGap: 10,
        marginLeft: 8,
        width: '27%'
    },
    trainingInputWrapper: {
        borderWidth: 2,
        borderColor: Color.prescricao.purple,
        borderRadius: 10,
        padding: 8,
    },
    trainingPropText: {
        textAlign: 'center',
        width: '100%',
        fontSize: 14,
        fontFamily: 'Roboto_700Bold',
    },
    trainingInput: {
        textAlign: 'center',
        width: 36,
        fontSize: 16,
        fontFamily: 'Roboto_700Bold',
    },
    buttonWrapper: {
        marginTop: 16,
    },
    button: {
        alignSelf: 'center',
        width: 200,
        padding: 12,
        borderRadius: 20,
        backgroundColor: Color.prescricao.purple,
    },
    buttonText: {
        color: Color.prescricao.white,
        textAlign: 'center',
        fontSize: 16,
    },
    popup: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    popupBody: {
        width: '60%',
        backgroundColor: Color.prescricao.white,
        padding: 10,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: Color.prescricao.purple,
    },
    popupCloseWrapper: {
        marginLeft: 'auto'
    },
    popupClose: {
    },
    popupText: {
        width: '100%',
        textAlign: 'center',
        fontSize: 16,
        marginTop: 8,
        marginBottom: 8,
        fontFamily: 'Roboto_700Bold',
    },
    popupInputWrapper: {
        borderRadius: 10,
        borderWidth: 2,
        borderColor: Color.prescricao.purple,
    },
    popupInput: {
        fontSize: 20,
        padding: 4,

    }
});

export default PrescricaoEspecificacao;

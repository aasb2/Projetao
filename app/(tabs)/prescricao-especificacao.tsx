import * as React from "react";
import { Text, StyleSheet, View, Image, ScrollView, TextInput, Pressable } from "react-native";
import { useFonts, Roboto_400Regular, Roboto_700Bold, Roboto_100Thin } from '@expo-google-fonts/roboto'
import Color from '../../constants/Colors';
import { useLocalSearchParams, router } from 'expo-router';
import { db } from "../../services/firebaseConfig";
import { doc, addDoc, collection, updateDoc } from 'firebase/firestore';
import { useEffect } from "react";
import globalState from "../../components/store/prescricaoGlobalState";
import { useIsFocused } from "@react-navigation/native";
//import { getUserInfo } from '../../services/functions/login/loginUser';

interface ExerciseStruct {
    exerciseName: string;
    sets: SetStruct[];
}

interface SetStruct {
    load: number;
    reps: number;
}

const PrescricaoEspecificacao = () => {
    const params = useLocalSearchParams<{ exercises: string }>();

    const [exerciseOptions, setExercises] = React.useState<ExerciseStruct[]>([])

    const isFocused = useIsFocused();

    //atualiza os exercicios quando params muda
    useEffect(() => {
        if (isFocused) {
            if (Object.keys(params).length != 0) {
                //console.log(params);

                const matchGlobalExercise = (exName: string) => {
                    const match = globalState.userExercises.find((globalEx) => {
                        return globalEx.exerciseName === exName;
                    });

                    if (match == undefined)
                        return { exerciseName: exName, sets: [] };
                    else
                        return match;
                };
                const exercisesArr = params.exercises.split(',');
                //const chosenExercises = exercisesArr.map(matchGlobalExercise);
                const chosenExercises = globalState.userExercises.filter((ex) => ex.checked == true);

                globalState.userExercises.find
                setExercises(chosenExercises);
            }
        }
    }, [isFocused]);

    const [fontLoaded] = useFonts({
        Roboto_100Thin,
        Roboto_400Regular,
        Roboto_700Bold
    })

    if (!fontLoaded) {
        return null;
    }
    const addNewExercise = (index: number) => {
        const newExerciseOptions = [...exerciseOptions]
        newExerciseOptions[index].sets.push({ reps: 10, load: 10 })
        setExercises(newExerciseOptions);
    };

    const removeExercise = (exIndex: number, sesIndex: number) => {
        var newExerciseOptions = [...exerciseOptions];
        exerciseOptions[exIndex].sets.splice(sesIndex, 1);
        setExercises(newExerciseOptions);
    };

    const updateSetRep = (reps: string, exIndex: number, sesIndex: number) => {
        const newExerciseOptions = [...exerciseOptions]
        const numericReps = reps.replace(/[^0-9]/g, '');
        newExerciseOptions[exIndex].sets[sesIndex].reps = parseInt(numericReps);
        setExercises(newExerciseOptions);
    };

    const updateSetLoad = (load: string, exIndex: number, sesIndex: number) => {
        const newExerciseOptions = [...exerciseOptions];
        const numericLoad = load.replace(/[^0-9]/g, '');
        newExerciseOptions[exIndex].sets[sesIndex].load = parseInt(numericLoad);
        setExercises(newExerciseOptions);
    };

    const handleSavePress = async () => {
        //id para teste, já que ainda não tem como pegar ele por enquanto
        //eventualmente substituir por
        //const currUser = await getUserInfo();
        const userId = "4SyAAkeKRs71KxdhGv12";
        const currUser = doc(db, 'users', userId);

        const presCollection = collection(db, 'prescriptions');

        if (globalState.prescriptionRef == null) {
            const addedPresc = await addDoc(presCollection, {
                user: currUser,
                prescriptions: exerciseOptions
            });
            alert("Adicionado com sucesso em " + addedPresc.id);
        }
        else{
            await updateDoc(globalState.prescriptionRef, {
                user: currUser,
                prescriptions: exerciseOptions
            });
            alert("Atualizado com sucesso em " + globalState.prescriptionRef.id);
        }

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
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={styles.exercises}>

                    {exerciseOptions.map((option, exIndex) => (
                        <View key={exIndex} style={styles.exerciseOption}>
                            <View style={styles.exerciseMain}>

                                <View style={styles.exerciseTextWrapper}>
                                    <Text style={styles.exerciseText}>
                                        {option.exerciseName}
                                    </Text>
                                </View>

                                <Pressable
                                    onPress={() => addNewExercise(exIndex)}
                                    style={styles.exerciseNewButton}
                                >
                                    <Image
                                        style={[styles.icon]}
                                        resizeMode="cover"
                                        source={require('../../assets/images/plus.png')}
                                    />

                                </Pressable>

                            </View>

                            <View style={styles.sets}>
                                {exerciseOptions[exIndex].sets.length > 0 && (
                                    <View style={styles.setIcons}>
                                        <Image
                                            style={[styles.icon]}
                                            resizeMode="contain"
                                            source={require('../../assets/images/reps.png')}
                                        />
                                        <Image
                                            style={[styles.icon]}
                                            resizeMode='contain'
                                            source={require('../../assets/images/weight.png')}
                                        />

                                    </View>
                                )}

                                {option.sets.map((set, setIndex) => (
                                    <View key={setIndex} style={styles.set}>

                                        <View style={styles.setIndex}>
                                            <Text style={styles.setIndexText}>
                                                {setIndex}
                                            </Text>
                                        </View>

                                        <View style={styles.setRep}>

                                            <TextInput
                                                style={styles.setInput}
                                                placeholder="10"
                                                onChangeText={(text) => updateSetRep(text, exIndex, setIndex)}
                                                value={set.reps.toString()}
                                                keyboardType="numeric"
                                            />

                                        </View>

                                        <View style={styles.setLoad}>

                                            <TextInput
                                                style={styles.setInput}
                                                placeholder="10"
                                                onChangeText={(text) => updateSetLoad(text, exIndex, setIndex)}
                                                value={set.load.toString()}
                                                keyboardType="numeric"
                                            />

                                        </View>

                                        <Pressable
                                            onPress={() => removeExercise(exIndex, setIndex)}
                                            style={styles.setRemoveButton}
                                        >
                                            <Image
                                                style={[styles.icon]}
                                                resizeMode="cover"
                                                source={require('../../assets/images/minus.png')}
                                            />

                                        </Pressable>
                                    </View>
                                ))}
                            </View>
                        </View>
                    ))}

                </ScrollView>
                <View style={styles.buttonWrapper}>
                    <Pressable style={styles.button} onPress={handleSavePress}>
                        <Text style={styles.buttonText}>Salvar Treino</Text>
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
        padding: 48,
        paddingTop: 16,
        height: '90%',
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
    },
    exerciseMain: {
        height: 48,
        flexDirection: 'row',
    },
    exerciseTextWrapper: {
        borderRadius: 40,
        justifyContent: "center",
        borderWidth: 1,
        borderColor: "#4b0082",
        width: '84%',
        height: '100%',
    },
    exerciseText: {
        fontFamily: 'Roboto_400Regular',
        fontSize: 18,
        marginLeft: 16,
    },
    exerciseNewButton: {
        marginLeft: 'auto',
        marginBottom: 'auto',
        marginTop: 'auto'
    },
    sets: {
        rowGap: 10,
        marginRight: 30,
        width: '84%',
        marginBottom: 12,
        marginTop: 12,
    },
    set: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        columnGap: 20
    },
    setIndex: {
        backgroundColor: Color.prescricao.purple,
        height: 32,
        width: 32,
        borderRadius: 6,
        alignItems: 'center',
        justifyContent: 'center',
    },
    setIndexText: {
        color: 'white',
    },
    setRep: {
        borderWidth: 1,
        borderColor: Color.prescricao.purple,
        borderRadius: 40,
        padding: 8,
    },
    setLoad: {
        borderWidth: 1,
        borderColor: Color.prescricao.purple,
        borderRadius: 40,
        padding: 8,
    },
    setRemoveButton: {
    },
    setInput: {
        textAlign: 'center',
        width: 36,
        fontSize: 16
    },
    setIcons: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        columnGap: 50,
        marginLeft: 8
    },
    buttonWrapper: {
        marginTop: 16,
    },
    button: {
        padding: 12,
        borderRadius: 20,
        backgroundColor: Color.prescricao.purple,
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 16,
    },
});

export default PrescricaoEspecificacao;

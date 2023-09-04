import * as React from "react";
import { Text, StyleSheet, View, Image, ScrollView, TextInput, Pressable } from "react-native";
import { useFonts, Roboto_400Regular, Roboto_700Bold, Roboto_100Thin } from '@expo-google-fonts/roboto'
import Color from '../../constants/Colors';

interface ExerciseOption {
    value: string;
    sessions: any[];
}

const PrescricaoEspecificacao = () => {

    const [exerciseOptions, setExercises] = React.useState<ExerciseOption[]>([
        { value: 'Remada Curvada', sessions: [] },
        { value: 'Salto à Corda', sessions: [] },
        { value: 'Remada Alta', sessions: [] },
        { value: 'Ombro', sessions: [] },
        { value: 'Glúteos', sessions: [] },
    ])

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
        newExerciseOptions[index].sessions.push({ repetitions: '10', weight: '10' })
        setExercises(newExerciseOptions);
    };

    const removeExercise = (exIndex: number, sesIndex: number) => {
        var newExerciseOptions = [...exerciseOptions]
        exerciseOptions[exIndex].sessions.splice(sesIndex,1);
        setExercises(newExerciseOptions);
    };

    const updateSessionRep = (reps: string, exIndex: number, sesIndex: number) => {
        const newExerciseOptions = [...exerciseOptions]
        const numericReps = reps.replace(/[^0-9]/g, '');
        newExerciseOptions[exIndex].sessions[sesIndex].repetitions = numericReps
        setExercises(newExerciseOptions);
    };

    const updateSessionWeight = (weight: string, exIndex: number, sesIndex: number) => {
        const newExerciseOptions = [...exerciseOptions]
        const numericWeight = weight.replace(/[^0-9]/g, '');
        newExerciseOptions[exIndex].sessions[sesIndex].weight = numericWeight
        setExercises(newExerciseOptions);
    };

    const handleSavePress = () => {

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
                                        {option.value}
                                    </Text>
                                </View>

                                <Pressable
                                    onPress={() => addNewExercise(exIndex)}
                                    style={styles.exerciseNewButton}
                                >
                                    <Image
                                        style={[styles.icon]}
                                        resizeMode="cover"
                                        source={require('../../assets/images/plus.svg')}
                                    />

                                </Pressable>

                            </View>

                            <View style={styles.sessions}>
                                {exerciseOptions[exIndex].sessions.length > 0 && (
                                    <View style={styles.sessionIcons}>
                                        <Image
                                            style={[styles.icon]}
                                            resizeMode="contain"
                                            source={require('../../assets/images/reps.svg')}
                                        />
                                        <Image
                                            style={[styles.icon]}
                                            resizeMode='contain'
                                            source={require('../../assets/images/weight.svg')}
                                        />

                                    </View>
                                )}

                                {option.sessions.map((rep, sesIndex) => (
                                    <View key={sesIndex} style={styles.session}>

                                        <View style={styles.sessionIndex}>
                                            <Text style={styles.sessionIndexText}>
                                                {sesIndex}
                                            </Text>
                                        </View>

                                        <View style={styles.sessionRep}>

                                            <TextInput
                                                style={styles.sessionInput}
                                                placeholder="10"
                                                onChangeText={(text) => updateSessionRep(text, exIndex, sesIndex)}
                                                value={rep.repetitions}
                                                keyboardType="numeric"
                                            />

                                        </View>

                                        <View style={styles.sessionWeight}>

                                            <TextInput
                                                style={styles.sessionInput}
                                                placeholder="10"
                                                onChangeText={(text) => updateSessionWeight(text, exIndex, sesIndex)}
                                                value={rep.weight}
                                                keyboardType="numeric"
                                            />

                                        </View>

                                        <Pressable
                                            onPress={() => removeExercise(exIndex, sesIndex)}
                                            style={styles.sessionRemoveButton}
                                        >
                                            <Image
                                                style={[styles.icon]}
                                                resizeMode="cover"
                                                source={require('../../assets/images/minus.svg')}
                                            />

                                        </Pressable>
                                    </View>
                                ))}
                            </View>
                        </View>
                    ))}

                <View>
                    <Pressable style={styles.button} onPress={handleSavePress}>
                        <Text style={styles.buttonText}>Salvar e Treino</Text>
                    </Pressable>
                </View>
                </ScrollView>

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
        maxWidth: 500,
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
        paddingTop: 16,
        height:'100%',
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
    sessions: {
        rowGap: 10,
        marginRight: 30,
        width: '84%',
        marginBottom: 12,
        marginTop: 12,
    },
    session: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        columnGap: 20
    },
    sessionIndex: {
        backgroundColor: Color.prescricao.purple,
        height: 32,
        width: 32,
        borderRadius: 6,
        alignItems:'center',
        justifyContent: 'center',
    },
    sessionIndexText: {
        color: 'white',
    },
    sessionRep: {
        borderWidth: 1,
        borderColor: Color.prescricao.purple,
        borderRadius: 40,
        padding: 8,
    },
    sessionWeight: {
        borderWidth: 1,
        borderColor: Color.prescricao.purple,
        borderRadius: 40,
        padding: 8,
    },
    sessionRemoveButton: {
    },
    sessionInput: {
        textAlign: 'center',
        width: 36,
        fontSize: 16
    },
    sessionIcons: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        columnGap: 50,
        marginLeft: 8
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
});

export default PrescricaoEspecificacao;

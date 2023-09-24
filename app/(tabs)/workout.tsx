import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, CheckBox, FlatList, Picker, TextInput  } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getWorkoutsList } from '../../services/functions/workout/functionWorkout';

const WorkoutScreen = () => {
  const [workouts, setWorkouts] = useState([]);
  const [selectedWorkout, setSelectedWorkout] = useState(null);
  const [selectedWorkoutIndex, setSelectedWorkoutIndex] = useState(0);
  const [isCheckedList, setIsCheckedList] = useState(false); // Use um array para rastrear os estados dos checkboxes
  const [pesos, setPesos] = useState([]);

  useEffect(() => {
    async function fetchWorkouts() {
      try {
        const workoutsData = await getWorkoutsList();
        setWorkouts(workoutsData);
      } catch (error) {
        console.error('Erro ao buscar a lista de treinos:', error);
      }
    }

    fetchWorkouts();
  }, []);

    // Função para desmarcar o checkbox
    const handleDesmarcarTodos = () => {
    setIsCheckedList(Array(selectedWorkout.exercises.length).fill(false));
    };

  // Função para marcar ou desmarcar um checkbox específico
  const handleCheckBoxChange = (index) => {
    const newIsCheckedList = [...isCheckedList];
    newIsCheckedList[index] = !newIsCheckedList[index];
    setIsCheckedList(newIsCheckedList);
  };

  // Função para selecionar um treino
  const selectWorkout = (index) => {
    setSelectedWorkout(workouts[index]);
    setSelectedWorkoutIndex(index);
    // Reinicializar os estados dos checkboxes e dos pesos quando um novo treino é selecionado
    setIsCheckedList(Array(workouts[index].exercises.length).fill(false));
    setPesos(Array(workouts[index].exercises.length).fill(''));
  };
  const handlePesoChange = (index, value) => {
    const newPesos = [...pesos];
    newPesos[index] = value;
    setPesos(newPesos);
  };

  return (
    <View style={{ flex: 1, paddingBottom: 60, backgroundColor: '#380062' }}>
      <View style={styles.header}>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: '4B0082',
            padding: 10,
          }}
        >
          <Ionicons name="arrow-back" size={24} color="white" />
          <Text style={{ color: 'white', marginLeft: 5 }}>Voltar</Text>
        </TouchableOpacity>
      </View>

        {/* Caixa de seleção para escolher o treino */}
        <Picker
        selectedValue={selectedWorkoutIndex}
        style={{ backgroundColor: '#FFFFFF', margin: 10, borderRadius: 10 }}
        onValueChange={(index) => selectWorkout(index)}
        >
        {workouts.map((workout, index) => (
            <Picker.Item key={index} label={workout.treino} value={index} />
        ))}
        </Picker>

        {/* Renderização de cartões separados para cada exercício do treino selecionado */}
        {selectedWorkout && (
        <FlatList
            data={selectedWorkout.exercises}
            keyExtractor={(item, index) => index.toString()} // Use o índice como chave única
            renderItem={({ item, index }) => (
            <View style={styles.container}>
            <View style={styles.card}>
                <View style={styles.checkboxContainer}>
                <CheckBox
                    value={isCheckedList[index]}
                    onValueChange={() => handleCheckBoxChange(index)}
                />
                </View>

                {/* Informacoes do card */}
                <View>
                <Text style={styles.exerciseTextTitle}>{item.exercise}</Text>
                {/* Input de kg */}
                <View style={styles.textInputContainer}>
                  <Text style={styles.exerciseText}>Kg: </Text>
                  <TextInput
                    style={styles.textInput}
                    placeholder="Kg"
                    value={pesos[index]}
                    onChangeText={(value) => handlePesoChange(index, value)}
                  />
                </View>
                {/* Reps e sets */}
                <Text style={styles.exerciseText}>Reps: {item.reps}</Text>
                <Text style={styles.exerciseText}>Sets: {item.sets}</Text>
                </View>
            </View>
            </View>
            )}
        />
        )}

        {/* Botão "Finalizar Treino" */}
        <TouchableOpacity
        style={styles.finalizarButton}
        onPress={handleDesmarcarTodos}
        >
        <Text style={styles.text2}>Finalizar treino</Text>
        </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#4B0082',
    padding: 10,
  },
  container: {
    justifyContent: 'center', 
    alignItems: 'center', 
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    margin: 10,
    padding: 16,
    width: 300, 
    flexDirection: 'row', // Isso define a direção do layout como horizontal
    shadowColor: '#FFFFFF', // Cor da sombra
    shadowOffset: {
      width: 4,
      height: 4,
    },
    shadowOpacity: 0.5, // Opacidade da sombra
    shadowRadius: 3.84, // Raio da sombra
  },
  text: {
    fontSize: 16,
    color: 'black',
  },
  text2: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
  exerciseText: {
    fontSize: 17,
    color: 'black',
    fontWeight: 'bold',
    padding: 4
  },
  exerciseTextTitle:{
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
    
  },
  finalizarButton: {
    backgroundColor: '#4B0082',
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
    marginTop: 20,
    marginBottom: 30
  },
  checkboxContainer: {
    marginRight: 10,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 5,
    padding: 8,
    fontSize: 16,
    width: 60, // Defina a largura desejada para o campo de entrada
  },
  textInputContainer: {
    flexDirection: 'row', // Para alinhar o texto e a caixa de entrada lado a lado
    alignItems: 'center', // Para centralizar verticalmente
  },
});

export default WorkoutScreen;

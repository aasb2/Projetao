import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, CheckBox, FlatList, Picker } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getWorkoutsList } from '../../services/functions/workout/functionWorkout';

const WorkoutScreen = () => {
  const [workouts, setWorkouts] = useState([]);
  const [selectedWorkout, setSelectedWorkout] = useState(null);
  const [selectedWorkoutIndex, setSelectedWorkoutIndex] = useState(0);
  const [isCheckedList, setIsCheckedList] = useState(false); // Use um array para rastrear os estados dos checkboxes
  const userid = '4SyAAkeKRs71KxdhGv12'

  useEffect(() => {
    async function fetchWorkouts() {
      try {
        const workoutsData = await getWorkoutsList(userid);
        setWorkouts(workoutsData);

      } catch (error) {
        console.error('Erro ao buscar a lista de treinos:', error);
      }
    }

    fetchWorkouts();
  }, []);

  useEffect(() => {
    // Selecionar automaticamente o primeiro treino quando workouts é atualizado
    if (workouts.length > 0) {
      selectWorkout(0);
    }
  }, [workouts]);



    const handleDesmarcarTodos = () => {
    setIsCheckedList(Array(selectedWorkout.exercises.length).fill(false));
    };

  // Função para desmarcar o checkbox
  const handleFinalizarTreino = () => {
    setIsCheckedList(false);
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
    // Reinicializar os estados dos checkboxes quando um novo treino é selecionado
    setIsCheckedList(Array(workouts[index].exercises.length).fill(false));
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
            <View style={styles.card}>
                <View style={styles.checkboxContainer}>
                <CheckBox
                    value={isCheckedList[index]}
                    onValueChange={() => handleCheckBoxChange(index)}
                />
                </View>
                <Text style={styles.exerciseText}>Nome: {item.exercise}</Text>
                <Text style={styles.exerciseText}>Kg: {item.kg}</Text>
                <Text style={styles.exerciseText}>Reps: {item.reps}</Text>
                <Text style={styles.exerciseText}>Sets: {item.sets}</Text>
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
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    margin: 10,
    padding: 16,
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
    fontSize: 14,
    color: 'black',
  },
  finalizarButton: {
    backgroundColor: '#4B0082',
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
    marginTop: 20,
  },
  checkboxContainer: {
    marginRight: 10,
  },
});

export default WorkoutScreen;

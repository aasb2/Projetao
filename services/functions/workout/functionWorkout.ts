import { db } from '../../firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

async function getWorkoutsList() {
  try {
    // Consulta para buscar os treinos na coleção 'workouts'
    const workoutsCollection = collection(db, 'workouts');
    const workoutsQuerySnapshot = await getDocs(workoutsCollection);

    const workoutsData = [];

    for (const docRef of workoutsQuerySnapshot.docs) {
      const workoutData = docRef.data();

      // Nome do treino
      const nomeTreino = workoutData.treino;
      workoutData.nomeTreino = nomeTreino;

      // Exercícios do treino
      const exercises = workoutData.exercises;
      workoutData.exercises = exercises;

      workoutsData.push(workoutData);
    }
    console.log("aqui");

    return workoutsData;
  } catch (error) {
    console.error('Erro ao buscar a lista de treinos:', error);
    throw error;
  }
}

export { getWorkoutsList };

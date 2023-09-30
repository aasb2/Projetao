import { db } from '../../firebaseConfig';
import { collection, getDoc, query, where, getDocs,doc} from 'firebase/firestore';
import { getUserInfo } from '../login/loginUser';

async function retrieveWorkouts() {
  try {
    const loggedUser = await getUserInfo();
    const userID = loggedUser.id._key.path.segments.slice(-1)[0];
    const userDocRef = doc(db, 'users', userID);
    const userDocSnapshot = await getDoc(userDocRef);

    if (userDocSnapshot.exists()) {
      const userDocData = userDocSnapshot.data();
      const workoutReferences = userDocData.workouts || [];

      const workoutsData = [];

      for (const workoutRef of workoutReferences) {
        const workoutDocSnapshot = await getDoc(workoutRef);
        if (workoutDocSnapshot.exists()) {
          const workoutData = workoutDocSnapshot.data();

          // Nome do treino
          const nomeTreino = workoutData.treino;
          workoutData.nomeTreino = nomeTreino;

          // Exercícios do treino
          const exercises = workoutData.exercises;
          workoutData.exercises = exercises;

          workoutsData.push(workoutData);
        }
      }

      console.log("aqui");
      return workoutsData;
    } else {
      console.error('Documento de usuário não encontrado');
      return [];
    }
  } catch (error) {
    console.error('Erro ao buscar a lista de treinos:', error);
    throw error;
  }
}

export { retrieveWorkouts };

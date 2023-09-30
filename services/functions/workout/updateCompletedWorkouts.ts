import { db } from '../../firebaseConfig';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { getUserInfo } from '../login/loginUser';

async function incrementCompletedWorkouts() {
  try {
    const loggedUser = await getUserInfo();
    const userID = loggedUser.id._key.path.segments.slice(-1)[0];
    const userDocRef = doc(db, 'users', userID);
    const userDocSnapshot = await getDoc(userDocRef);

    if (userDocSnapshot.exists()) {
      const userData = userDocSnapshot.data();
      const completedWorkouts = userData.completed_workouts || 0; // Valor padrão 0 se o campo não existir

      // Incrementa o valor de completed_workouts em 1
      const updatedCompletedWorkouts = completedWorkouts + 1;

      // Atualiza o campo "completed_workouts" no documento do usuário
      await updateDoc(userDocRef, { completed_workouts: updatedCompletedWorkouts });

      console.log('completed_workouts incrementado com sucesso');
    } else {
      console.error('Documento de usuário não encontrado');
    }
  } catch (error) {
    console.error('Erro ao incrementar completed_workouts:', error);
    throw error;
  }
}

export { incrementCompletedWorkouts };

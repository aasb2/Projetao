import { db } from '../../firebaseConfig';
import { collection, getDoc, query, where, getDocs, doc, updateDoc} from 'firebase/firestore';

async function retrieveMaximumWeight (userId: string, exercise: string) {
    try {
      const userDocRef = doc(db, 'users', userId);
      const userDocSnapshot = await getDoc(userDocRef);
  
      if (userDocSnapshot.exists()) {
        const userDocData = userDocSnapshot.data();
        const maximumWeights = userDocData.maximum_weights || {};
        const exerciseName = exercise

        console.log('Peso máximo recuperado')
        return(maximumWeights[exerciseName])
      } else {
        console.error('Documento de usuário não encontrado');
      }
    } catch (error) {
      console.error('Erro ao recuperar o peso máximo:', error);
      throw error;
    }
  }
  
  export { retrieveMaximumWeight  };
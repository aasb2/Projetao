import { db } from '../../firebaseConfig';
import { collection, getDoc, query, where, getDocs, doc, updateDoc} from 'firebase/firestore';
import { getUserInfo } from '../login/loginUser';

async function updateWeights(weights: { [key: string]: number }) {
    try {
      const loggedUser = await getUserInfo();
      const userID = loggedUser.id._key.path.segments.slice(-1)[0];
      const userDocRef = doc(db, 'users', userID);
      const userDocSnapshot = await getDoc(userDocRef);
  
      if (userDocSnapshot.exists()) {
        const userDocData = userDocSnapshot.data();
        const maximumWeights = userDocData.maximum_weights || {};
  
        // Atualize os pesos máximos com base nos valores passados em weights
        for (const exerciseName in weights) {
          if (weights.hasOwnProperty(exerciseName)) {
            const currentMaximumWeight = parseFloat(maximumWeights[exerciseName] || 0);
            const exerciseWeight = weights[exerciseName];
  
            if (exerciseWeight > (currentMaximumWeight || 0)) {
              maximumWeights[exerciseName] = exerciseWeight;
            }
          }
        }
  
        // Atualize o campo "maximum_weights" no documento do usuário
        await updateDoc(userDocRef, { maximum_weights: maximumWeights });
  
      } else {
        console.error('Documento de usuário não encontrado');
      }
    } catch (error) {
      console.error('Erro ao atualizar os pesos:', error);
      throw error;
    }
  }
  
  export { updateWeights };
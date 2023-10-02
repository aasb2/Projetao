import { db, auth } from '../../firebaseConfig';
import { doc, getDoc, updateDoc, collection, getDocs } from 'firebase/firestore';
import { getUserInfo } from '../login/loginUser';

async function checkCondition() {
  try {
    const loggedUser = await getUserInfo();
    const userID = loggedUser.id._key.path.segments.slice(-1)[0];
    // Consulta para obter o documento do usuário
    const userDocRef = doc(db, 'users', userID);
    const userDocSnapshot = await getDoc(userDocRef);
    
    if (!userDocSnapshot.exists()) {
      throw new Error(`Usuário com ID ${userID} não encontrado.`);
    }

    // Consulta para obter o documento do desafio
    const challengesCollection = collection(db, 'challenges');
    const challengesQuerySnapshot = await getDocs(challengesCollection);

    const userData = userDocSnapshot.data();
    for (const challengeDoc of challengesQuerySnapshot.docs){
        const challengeData = challengeDoc.data();
        
        // Obtenha as condições do desafio
        const conditions = challengeData.conditions || {};
        // Verifique as condições
        const challengeKey = conditions.key;
        const challengeValue = conditions.value;


        if (userData.maximum_weights[challengeKey] >= challengeValue) {
            
            // Atualize o valor do desafio para true
            const userChallengesRef = doc(db, 'users', userID);
            await updateDoc(userChallengesRef, {
              [`userChallenges.${challengeDoc.id}`]: true,
            });
          } else {
            // Atualize o valor do desafio para false
            const userChallengesRef = doc(db, 'users', userID);
            await updateDoc(userChallengesRef, {
              [`userChallenges.${challengeDoc.id}`]: false,
            });
          }
    }
    
    return true;
    
  } catch (error) {
    console.error('Erro ao verificar condição:', error);
    throw error;
  }
}

export { checkCondition };

// maximumWeights[exerciseName] = exerciseWeight;

  
// // Atualize o campo "maximum_weights" no documento do usuário
// await updateDoc(userDocRef, { maximum_weights: maximumWeights });
import { db } from '../../firebaseConfig';
import { collection, getDocs, doc, updateDoc, getDoc } from 'firebase/firestore';

async function updateUsersScores() {
  try {
    // Consulte todos os documentos na coleção "users"
    const usersCollection = collection(db, 'users');
    const usersQuerySnapshot = await getDocs(usersCollection);

    // Para cada documento de usuário
    for (const userDoc of usersQuerySnapshot.docs) {
      const userData = userDoc.data();
      const userID = userDoc.id;
      const userChallenges = userData.userChallenges || {};

      let userScore = 0;

      // Para cada chave no campo "userChallenges" que tenha valor "true"
      for (const challengeId in userChallenges) {
        if (userChallenges[challengeId] === true) {
          // Consulte o documento correspondente na coleção "challenges"
          const challengeDocRef = doc(db, 'challenges', challengeId);
          const challengeDocSnapshot = await getDoc(challengeDocRef);

          if (challengeDocSnapshot.exists()) {
            const challengeData = challengeDocSnapshot.data();
            const challengePoints = challengeData.points || 0;

            // Some os pontos do desafio ao score do usuário
            userScore += challengePoints;
          }
        }
      }

      // Atualize o campo "score" do usuário com o novo valor
      await updateDoc(userDoc.ref, { score: userScore });
    }

  } catch (error) {
    console.error('Erro ao atualizar os scores:', error);
    throw error;
  }
}

export { updateUsersScores };

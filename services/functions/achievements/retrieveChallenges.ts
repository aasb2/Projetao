import { db, auth } from '../../firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import { doc, setDoc } from 'firebase/firestore';

async function retrieveChallenges() {
  try {
    // Consulta para buscar os desafios na coleção 'challenges'
    const challengesCollection = collection(db, 'challenges');
    const challengesQuerySnapshot = await getDocs(challengesCollection);

    const challengesData = [];

    for (const docRef of challengesQuerySnapshot.docs) {
      const challengeData = docRef.data();
      // ID do desafio
      const challengeId = docRef.id;
      challengeData.id = challengeId;

      // Nome do desafio
      const challengeName = challengeData.name;
      challengeData.name = challengeName;

      // URL da imagem do desafio
      const imageURL = challengeData.image;
      challengeData.imageURL = imageURL;

      // Condições do desafio
      const conditions = challengeData.conditions;
      challengeData.conditions = conditions;

      challengesData.push(challengeData);
    }

    return challengesData;
  } catch (error) {
    console.error('Erro ao buscar a lista de desafios:', error);
    throw error;
  }
}

export { retrieveChallenges };

import { db } from '../../firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

async function getChallengesList() {
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
      challengeData.challengeName = challengeName;

      // URL da imagem do desafio
      const imageURL = challengeData.image;
      challengeData.imageURL = imageURL;

      // Concluído (true ou false)
      const completed = challengeData.completed;
      challengeData.completed = completed;

      // Array de condições
      const conditions = challengeData.conditions;
      challengeData.conditions = conditions;
      console.log(challengeData);
      challengesData.push(challengeData);
    }

    return challengesData;
  } catch (error) {
    console.error('Erro ao buscar a lista de desafios:', error);
    throw error;
  }
}
export { getChallengesList };
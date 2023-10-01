import { db, auth } from '../../firebaseConfig';
import { collection, getDocs, getDoc } from 'firebase/firestore';
import { doc, setDoc } from 'firebase/firestore';
import { storage } from '../../firebaseConfig';
import { ref, getDownloadURL, FirebaseStorage } from 'firebase/storage';
import { getUserInfo } from '../login/loginUser';

async function getChallengesList() {
  try {
    const loggedUser = await getUserInfo();
    const userID = loggedUser.id._key.path.segments.slice(-1)[0];
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

      // Condicoes do desafio
      const challengeConditions = challengeData.conditions;
      challengeData.challengeConditions = challengeConditions;

      // Condicoes do desafio
      const challengePoints = challengeData.points;
      challengeData.challengePoints = challengePoints;

      console.log(challengeConditions.description);


      // URL da imagem do desafio
      const imageURLRef = ref(storage, challengeData.image);
      const imageURL = await getDownloadURL(imageURLRef); 
      challengeData.imageURL = imageURL;

      // Verificar se o desafio está marcado como concluído para o usuário
      const userDocRef = doc(db, 'users', userID);
      const userDocSnapshot = await getDoc(userDocRef);

      if (userDocSnapshot.exists()) {
        const userData = userDocSnapshot.data();
        const userChallenges = userData.userChallenges || {};

        // Verificar se o desafio está marcado como falso para o usuário
        if (!userChallenges[challengeId]) {
          challengesData.push(challengeData);
        }
      }
    }

    return challengesData;
  } catch (error) {
    console.error('Erro ao buscar a lista de desafios:', error);
    throw error;
  }
}

export { getChallengesList };

import { db, auth } from '../../firebaseConfig';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import { ref, getDownloadURL } from 'firebase/storage';
import { storage } from '../../firebaseConfig';
import { getUserInfo } from '../login/loginUser';

async function retrieveAchievements() {
  try {
    const loggedUser = await getUserInfo();
    const userID = loggedUser.id._key.path.segments.slice(-1)[0];
    // const user = auth.currentUser;

    // if (!user) {
    //     throw new Error('Usuário não autenticado');
    //   }
  
    //   const userId = user.uid;
  
      const userDocRef = doc(db, 'users', userID);
      const userDocSnapshot = await getDoc(userDocRef);
  
      if (!userDocSnapshot.exists()) {
        throw new Error('Documento do usuário não encontrado');
      }
  
      const userData = userDocSnapshot.data();
      const userChallenges = userData?.userChallenges;
  
      if (!userChallenges) {
        throw new Error('Dados de desafios do usuário não encontrados');
      }
  

    const achievementsData = [];

    for (const challengeId in userChallenges) {
      if (userChallenges[challengeId] === true) {
        const challengeDocRef = doc(db, 'challenges', challengeId);
        const challengeDocSnapshot = await getDoc(challengeDocRef);

        if (challengeDocSnapshot.exists()) {
          const achievementReference = challengeDocSnapshot.data().achievement;      
          const achievementDocRef = doc(db, 'achievements', achievementReference);         
          const achievementDocSnapshot = await getDoc(achievementDocRef);
          

          if (achievementDocSnapshot.exists()) {
            const achievementData = achievementDocSnapshot.data();
            const achievementId = achievementDocSnapshot.id;
            achievementData.id = achievementId;
            achievementData.achievementName = achievementData.name;

            const imageURLRef = ref(storage, achievementData.image);
            const imageURL = await getDownloadURL(imageURLRef);
            achievementData.imageURL = imageURL;

            const description = achievementData.description;
            achievementData.description = description;

            achievementsData.push(achievementData);
          }
        }
      }
    }

    return achievementsData;
  } catch (error) {
    console.error('Erro ao buscar a lista de achievements:', error);
    throw error;
  }
}

export { retrieveAchievements };

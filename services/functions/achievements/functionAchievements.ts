import { db } from '../../firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

async function getAchievementsList() {
  try {
    // Consulta para buscar os achievements na coleção 'achievements'
    const achievementsCollection = collection(db, 'achievements');
    const achievementsQuerySnapshot = await getDocs(achievementsCollection);

    const achievementsData = [];

    for (const docRef of achievementsQuerySnapshot.docs) {
      const achievementData = docRef.data();
      // ID do achievement
      const achievementId = docRef.id;
      achievementData.id = achievementId;
      
      // Nome do achievement
      const achievementName = achievementData.name;
      achievementData.achievementName = achievementName;

      //URL da imagem do achievement
      const imageURL = achievementData.image;
      achievementData.imageURL = imageURL;

      // Descrição do achievement
      const description = achievementData.description;
      achievementData.description = description;

      achievementsData.push(achievementData);
    }
    console.log("aqui");

    return achievementsData;
  } catch (error) {
    console.error('Erro ao buscar a lista de achievements:', error);
    throw error;
  }
}

export { getAchievementsList };

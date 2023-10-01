import { db, auth } from '../../firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import { doc, setDoc } from 'firebase/firestore';
import { storage } from '../../firebaseConfig';
import { ref, getDownloadURL, FirebaseStorage } from 'firebase/storage';

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

      // URL da imagem do achievement
      const imageURLRef = ref(storage, achievementData.image);
      const imageURL = await getDownloadURL(imageURLRef); 
      achievementData.imageURL = imageURL;

      // Descrição do achievement
      const description = achievementData.description;
      achievementData.description = description;

      achievementsData.push(achievementData);
    }

    return achievementsData;
  } catch (error) {
    console.error('Erro ao buscar a lista de achievements:', error);
    throw error;
  }
}
export { getAchievementsList };

// Função para realizar uma requisição POST
async function enviarDadosParaUsuario(dados) {
  try {
    // Verifique se o usuário está autenticado (exemplo, você pode usar Firebase Authentication)
    const user = auth.currentUser;

    if (!user) {
      throw new Error('Usuário não autenticado');
    }

    const userId = user.uid; // ID do usuário autenticado

    // Caminho para o documento do usuário no Firestore (substitua pelo caminho correto)
    const userDocRef = doc(db, 'users', userId);

    // Adicione os dados ao array "treinos_realizados" no documento do usuário
    await setDoc(userDocRef, {
      treinos_realizados: arrayUnion(dados),
    }, { merge: true });

    console.log('Dados enviados com sucesso para o usuário:', userId);
  } catch (error) {
    console.error('Erro ao enviar dados para o usuário:', error);
    throw error;
  }
}

export { enviarDadosParaUsuario };

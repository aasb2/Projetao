import { db, auth } from "../../firebaseConfig";
import {
  collection,
  getDocs,
  getDoc,
  query,
  DocumentData,
  where,
  doc,
  DocumentSnapshot,
} from "firebase/firestore";
import { getCommunityInfo } from "../login/loginUser";

// Função para buscar informações do USER PROFILE
async function getProfileInfo(userId: unknown) {
  try {
    if (userId) {
      const usersCollection = collection(db, "users");
      const userQuery = query(usersCollection, where("id", "==", userId));
      const userQuerySnapshot = await getDocs(userQuery);

      if (userQuerySnapshot.size > 0) {
        const userData = userQuerySnapshot.docs[0].data();

        //console.log('Informações do usuário logado:', userData);

        if (userData.community) {
          // Usa a função getCommunityInfo para obter informações da comunidade
          const communityInfo = await getCommunityInfo(userData.community);

          if (communityInfo) {
            userData.communityInfo = communityInfo;
          }
        }

        return userData;
      } else {
        console.log("Nenhum documento encontrado para o usuário logado.");
      }
    } else {
      console.log("Nenhum usuário logado.");
    }
  } catch (error) {
    console.error("Erro ao buscar informações do usuário logado:", error);
  }
}

export { getProfileInfo };

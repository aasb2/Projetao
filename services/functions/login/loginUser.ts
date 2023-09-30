import { db, auth } from "../../firebaseConfig";
import {
  collection,
  doc,
  addDoc,
  query,
  where,
  getDocs,
  setDoc,
  DocumentReference,
  DocumentSnapshot,
  getDoc,
} from "firebase/firestore";
import { User } from "firebase/auth";

// Função para criar um novo documento de usuário no Firestore
async function createNewUserDocument(user: User) {
  const usersCollection = collection(db, "users");

  try {
    const q = query(usersCollection, where("uid", "==", user.uid));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.size === 0) {
      const communityRef = doc(db, "community", "TWTh5lGYADKjXRxAy019");

      const newUserDocRef = await addDoc(usersCollection, {
        uid: user.uid,
        email: user.email,
        name: user.displayName,
        image: user.photoURL,
        isTraining: false,
        score: 0,
        community: communityRef,
      });

      const newUserDocReference: DocumentReference = doc(
        db,
        "users",
        newUserDocRef.id
      );
      await setDoc(
        newUserDocReference,
        { id: newUserDocReference },
        { merge: true }
      );

      //getUserInfo();

      console.log("Novo documento de usuário criado com sucesso");
    } else {
      console.log("Documento de usuário já existe");
      //getUserInfo();
    }
  } catch (error) {
    console.error("Erro ao criar ou verificar o documento de usuário:", error);
  }
}

//...

// Função para buscar informações da comunidade com base na referência
async function getCommunityInfo(communityRef: any) {
  try {
    // Usa a referência da comunidade para buscar as informações da comunidade
    const communityDoc = await getDoc(communityRef);
    if (communityDoc.exists()) {
      return communityDoc.data();
    } else {
      console.log("Nenhuma informação encontrada para a comunidade.");
      return null;
    }
  } catch (error) {
    console.error("Erro ao buscar informações da comunidade:", error);
    return null;
  }
}

//..

// Função para buscar informações do usuário logado
async function getUserInfo() {
  try {
    const user = auth.currentUser;
    // if (user) {
    //   console.log('Usuário autenticado:', user);
    // } else {
    //   console.log('Nenhum usuário autenticado.');
    // }

    if (user) {
      const usersCollection = collection(db, "users");
      const userQuery = query(usersCollection, where("uid", "==", user.uid));
      const userQuerySnapshot = await getDocs(userQuery);

      if (userQuerySnapshot.size > 0) {
        const userData = userQuerySnapshot.docs[0].data();

        //console.log('Informações do usuário logado:', userData);

        if (userData.community) {
          // Usa a função getCommunityInfo para obter informações da comunidade
          const communityInfo = await getCommunityInfo(userData.community);

          // Adiciona as informações da comunidade ao objeto userData
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

async function linkToPersonal(id: string) {
  try {
    const user = auth.currentUser;
    if (user) {
      const personalCollection = collection(db, "personal");
      const personalQuery = query(
        personalCollection,
        where("checkIn", "==", id)
      );
      const personalQuerySnapshot = await getDocs(personalQuery);

      const communityId = personalQuerySnapshot.docs[0].data().community;

      const usersCollection = collection(db, "users");
      const userQuery = query(usersCollection, where("uid", "==", user.uid));
      const userQuerySnapshot = await getDocs(userQuery);

      const userDocRef = userQuerySnapshot.docs[0].ref;

      const newUserDocReference: DocumentReference = doc(
        db,
        "users",
        userDocRef.id
      );
      await setDoc(
        newUserDocReference,
        { community: communityId },
        { merge: true }
      );

      console.log("Campo feito com sucesso!");
    } else {
      console.log("Nenhum documento encontrado para o usuário logado.");
    }
  } catch (error) {
    console.error("Erro ao buscar informações do usuário logado:", error);
  }
}

export { createNewUserDocument, getUserInfo, linkToPersonal };

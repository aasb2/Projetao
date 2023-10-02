import { db } from "../../firebaseConfig";
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
import { getUserInfo } from "../login/loginUser";

// Função para pegar a lista de alunos da comunidade
async function getFriendsList() {
  try {
    const currUser = await getUserInfo();

    if (currUser && currUser.community) {
      const communityRef = currUser.community;

      // Consulta para buscar os amigos do usuário com base na comunidade
      const friendsCollection = collection(db, "users");
      const friendsQuery = query(
        friendsCollection,
        where("community", "==", communityRef)
        //where('isTraining', '==', true)
      );

      const friendsQuerySnapshot = await getDocs(friendsQuery);

      const friendsData = [];

      for (const docRef of friendsQuerySnapshot.docs) {
        const friendData = docRef.data();
        // URL da imagem do campo 'image'
        const imageURL = friendData.image;
        friendData.imageURL = imageURL;
        // Primeiro nome do user
        const fullName = friendData.name;
        const nameParts = fullName.split(" ");
        const firstName = nameParts[0];
        friendData.firstName = firstName;

        friendsData.push(friendData);
      }
      return friendsData;
    } else {
      console.log(
        "O usuário não possui informações de usuário ou de comunidade."
      );
      return [];
    }
  } catch (error) {
    console.error("Erro ao buscar a lista de amigos:", error);
    throw error;
  }
}

// ...

// Função para pegar os posts da comunidade
async function getPostsList() {
  try {
    const currUser = await getUserInfo();

    if (currUser && currUser.community) {
      const communityRef = currUser.community;

      const postsCollection = collection(db, "posts");

      // Primeira consulta: Filtra por comunidade
      const postsQueryCommunity = query(
        postsCollection,
        where("community", "==", communityRef)
      );

      const postsQuerySnapshotCommunity = await getDocs(postsQueryCommunity);

      const posts: {
        createdAt: any;
        user: DocumentData;
      }[] = [];

      // Itera sobre os documentos retornados pela primeira consulta
      for (const docRef of postsQuerySnapshotCommunity.docs) {
        const postData = docRef.data();

        const userRef = postData.user;
        const userDoc = await getDoc(userRef);

        if (userDoc.exists()) {
          const userData = userDoc.data() as DocumentData;

          // URL da imagem do campo 'image'
          const imageURL = userData.image;
          userData.imageURL = imageURL;

          const combinedData = {
            ...postData,
            createdAt: postData.createdAt,
            user: userData,
          };

          posts.push(combinedData);
        }
      }

      // Após obter os posts com base na comunidade, ordene-os por data de criação
      const orderedPosts = posts.sort(
        (a, b) => b.createdAt.toMillis() - a.createdAt.toMillis()
      );

      //console.log('Posts ordenados:', orderedPosts);

      // Retorne os posts ordenados
      return orderedPosts;
    } else {
      console.log(
        "O usuário não possui informações de usuário ou de comunidade."
      );
      return [];
    }
  } catch (error) {
    console.error("Erro ao buscar a lista de posts:", error);
    throw error;
  }
}

//...

async function getComments(postId: unknown) {
  try {
    const postsCollection = collection(db, "posts");
    const q = query(postsCollection, where("id", "==", postId));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.docs.length === 0) {
      throw new Error("Post não encontrado.");
    }

    const postDoc: DocumentSnapshot = querySnapshot.docs[0];
    const commentsData = postDoc.data()?.comments;

    if (!commentsData) {
      return [];
    }

    const commentsArray = await Promise.all(
      Object.values(commentsData).map(async (comment: any) => {
        if (comment.user) {
          const userRef = comment.user;
          const userDoc = await getDoc(userRef);
          const userData = userDoc.data();
          return {
            ...comment,
            user: userData,
          };
        } else {
          return comment;
        }
      })
    );

    return commentsArray;
  } catch (error) {
    console.error("Erro ao buscar comentários:", error);
    throw error;
  }
}

// async function getComments(postId: unknown) {
//   try {
//     const postsCollection = collection(db, "posts");
//     const q = query(postsCollection, where("id", "==", postId));
//     const querySnapshot = await getDocs(q);

//     if (querySnapshot.docs.length === 0) {
//       throw new Error("Post não encontrado.");
//     }
//     const postDoc: DocumentSnapshot = querySnapshot.docs[0];
//     const commentsData = postDoc.data()?.comments;
//     if (!commentsData) {
//       return [];
//     }
//     const commentsArray: DocumentData[] = Object.values(commentsData);
//     //console.log("AAAAAAH", commentsArray[0].content);
//     return commentsArray;
//   } catch (error) {
//     console.error("Erro ao buscar comentários:", error);
//     throw error;
//   }
// }

// async function getComments(postId: any) {
//   console.log("POSTID", postId);
//   const currUser = await getUserInfo();

//   try {
//     if (currUser && currUser.community) {
//       const postsCollection = collection(db, "posts");
//       const postsQuery = query(postsCollection, where("id", "==", postId));
//       const postsQuerySnapshot = await getDocs(postsQuery);

//       if (!postsQuerySnapshot.empty) {
//         const dataQuery = postsQuerySnapshot.docs;
//         const comments = dataQuery[0].data().comments;

//         if (comments !== undefined) {
//           console.log("comentários", comments);
//           return comments;
//         } else {
//           console.error(
//             'O documento não possui a propriedade "comments".',
//             dataQuery[0].data()
//           );
//         }
//       } else {
//         console.error("Nenhum documento encontrado para o postId:", postId);
//       }
//     }
//   } catch (error) {
//     console.error("Erro ao buscar comentários:", error);
//   }
//   console.log("ROTRNOU MERDA NENHUMA");
//   return null; // ou qualquer valor padrão que faça sentido para o seu caso
// }

export { getFriendsList, getPostsList, getComments };

// async function getPostsList() {
//   try {
//     // Obtem as informações do usuário logado, incluindo a comunidade
//     const currUser = await getUserInfo();

//     // Verifica se há informações de usuário e de comunidade
//     if (currUser && currUser.community) {
//       // Obtenha a referência da comunidade
//       const communityRef = currUser.community;

//       // Consulta para buscar dos posts com base na comunidade
//       const postsCollection = collection(db, 'posts');
//       const postsQueryCommunity = query(
//         postsCollection,
//         where('community', '==', communityRef)
//       );
//       const postsQuery = query(
//         postsQueryCommunity,
//         orderBy('createdAt', 'desc')
//       );

//       const postsQuerySnapshot = await getDocs(postsQuery);

//       const posts: { user: DocumentData; }[] = [];

//       // Use Promise.all para aguardar todas as operações assíncronas
//       await Promise.all(postsQuerySnapshot.docs.map(async (docRef) => {
//         const postData = docRef.data();

//         // Acessa a referência ao usuário associado ao post
//         const userRef = postData.user;
//         const userDoc = await getDoc(userRef);

//         if (userDoc.exists()) {
//           const userData = userDoc.data() as DocumentData; // Dados do documento de usuário

//           // URL da imagem do campo 'image'
//           const imageURL = userData.image;
//           userData.imageURL = imageURL;

//           // Combine os dados do post e do usuário
//           const combinedData = {
//             ...postData,
//             user: userData, // Substitui a referência pelo objeto de usuário
//           };

//           posts.push(combinedData);
//         }
//       }));

//       return posts;
//     } else {
//       console.log('O usuário não possui informações de usuário ou de comunidade.');
//       return [];
//     }
//   } catch (error) {
//     console.error('Erro ao buscar a lista de posts:', error);
//     throw error;
//   }
// }

//..

// async function getPostsList() {
//   try {
//     const postsRef = collection(db, 'posts'); // Referência à coleção "posts"
//     const querySnapshot = await getDocs(postsRef); // Obtém todos os documentos da coleção "posts"

//     const posts = [];

//     // Itera pelos documentos da coleção "posts"
//     for (const doc of querySnapshot.docs) {
//       const postData = doc.data(); // Dados do documento "posts"

//       // Acessa a referência ao usuário associado ao post
//       const userRef = postData.user;
//       const userDoc = await getDoc(userRef);

//       if (userDoc.exists()) {
//         const userData = userDoc.data() as DocumentData; // Dados do documento de usuário

//         const imageURL = await getDownloadURL(ref(storage, userData.image));

//         // Adicione a URL da imagem aos dados do usuário
//         userData.imageURL = imageURL;

//         // Combine os dados do post e do usuário
//         const combinedData = {
//           ...postData,
//           user: userData, // Substitui a referência pelo objeto de usuário
//         };

//         posts.push(combinedData);
//       } else {
//         console.error(`Documento de usuário não encontrado para o post: ${doc.id}`);
//       }
//     }

//     console.log(posts)
//     return posts;
//   } catch (error) {
//     console.error('Erro ao buscar a lista de posts:', error);
//     throw error; // Você pode optar por tratar o erro aqui ou lançá-lo novamente
//   }
// }

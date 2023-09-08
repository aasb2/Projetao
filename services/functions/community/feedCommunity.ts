import { db, storage } from '../../firebaseConfig';
import { collection, getDocs, getDoc, query, orderBy, DocumentData } from 'firebase/firestore';
import { ref, getDownloadURL, FirebaseStorage } from 'firebase/storage';


async function getFriendsList() {
  const friendsCollection = collection(db, 'users');
  const friendsDocs = await getDocs(friendsCollection);

  const friendsData = [];

  for (const docRef of friendsDocs.docs) {
    const friendData = docRef.data();
    // Você precisa do campo 'image' para a URL da imagem
    const imageURL = await getDownloadURL(ref(storage, friendData.image));

    // Adicione a URL da imagem aos dados do usuário
    friendData.imageURL = imageURL;

    friendsData.push(friendData);
  }

  return friendsData;
}

// ...

async function getPostsList() {
  try {
    const postsRef = collection(db, 'posts'); // Referência à coleção "posts"
    const querySnapshot = await getDocs(postsRef); // Obtém todos os documentos da coleção "posts"

    const posts = [];

    // Itera pelos documentos da coleção "posts"
    for (const doc of querySnapshot.docs) {
      const postData = doc.data(); // Dados do documento "posts"
      
      // Acessa a referência ao usuário associado ao post
      const userRef = postData.user;
      const userDoc = await getDoc(userRef);

      if (userDoc.exists()) {
        const userData = userDoc.data() as DocumentData; // Dados do documento de usuário

        const imageURL = await getDownloadURL(ref(storage, userData.image));

        // Adicione a URL da imagem aos dados do usuário
        userData.imageURL = imageURL;

        // Combine os dados do post e do usuário
        const combinedData = {
          ...postData,
          user: userData, // Substitui a referência pelo objeto de usuário
        };

        posts.push(combinedData);
      } else {
        console.error(`Documento de usuário não encontrado para o post: ${doc.id}`);
      }
    }

    console.log(posts)
    return posts;
  } catch (error) {
    console.error('Erro ao buscar a lista de posts:', error);
    throw error; // Você pode optar por tratar o erro aqui ou lançá-lo novamente
  }
}



export { getFriendsList, getPostsList };

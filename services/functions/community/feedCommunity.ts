import { db, storage } from '../../firebaseConfig';
import { collection, getDocs, query, orderBy, DocumentData } from 'firebase/firestore';
import { ref, getDownloadURL } from 'firebase/storage';

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
  const postsCollection = collection(db, 'posts');
  const postsQuery = query(postsCollection, orderBy('id', 'desc')); // Você pode ordenar os posts como desejar
  const postsDocs = await getDocs(postsQuery);

  const postsData: DocumentData[] = [];

  postsDocs.forEach((doc) => {
    const postData = doc.data();
    postData.id = doc.id; // Adicione o ID do documento aos dados do post
    postsData.push(postData);
  });

  console.log(postsData)
  return postsData;
}



// async function getPostsList() {
//   const postsCollection = collection(db, 'posts');
//   const postsDocs = await getDocs(postsCollection);

//   const postsData = [];

//   for (const docRef of postsDocs.docs) {
//     const postData = docRef.data();
//     postsData.push(postData);
//   }

//   console.log(postsData)
//   return postsData;
// }



export { getFriendsList, getPostsList };

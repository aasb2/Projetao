import { db, storage } from '../../firebaseConfig';
import { collection, addDoc, DocumentReference, setDoc, doc } from 'firebase/firestore';
import { getUserInfo } from '../login/loginUser';

// Função para criar um novo post
async function createNewPost(content: string, image: null, location: string) {
  try {
    const currentUser = await getUserInfo();

    if (currentUser && currentUser.community) {
      const postsCollection = collection(db, 'posts');

      // Cria um novo documento de post com os dados fornecidos
      const newPostRef = await addDoc(postsCollection, {
        content: content,
        image: image,
        user: currentUser.id,
        community: currentUser.community,
        isLiked: false,
        numComment: 0,
        numLike: 0,
        createdAt: new Date(),
        location: location,
      });
    
      const newPostDocReference: DocumentReference = doc(db, 'posts', newPostRef.id);
      await setDoc(newPostDocReference, { id: newPostDocReference }, { merge: true });

      return newPostRef.id;
    } else {
      throw new Error('Usuário não possui informações de comunidade');
    }
  } catch (error) {
    console.error('Erro ao criar o post:', error);
    throw error;
  }
}

export { createNewPost };

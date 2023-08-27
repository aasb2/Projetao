# UnityFit

## Getting Started

O UnityFit depende das seguintes tecnologias e bibliotecas:

- [Expo](https://expo.dev/)
- [React Native](https://reactnative.dev/)
- [NativeBase UI](https://nativebase.io/)
- [Firebase](https://firebase.google.com/)
  - [Expo and Firebase SDK](https://docs.expo.dev/guides/using-firebase/#using-firebase-js-sdk)

- [Expo Go](https://docs.expo.dev/get-started/expo-go/)

### Configuração do Firebase

Para configurar o Firebase, siga estas etapas:

1. Vá em 'Configurações do Projeto' [Firebase Console](https://console.firebase.google.com/).
2. Copie as credenciais do projeto (chave do Firebase) e cole-as no arquivo `services/firebaseConfig.js`:

```javascript
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

export default {
  apiKey: "SUA_API_KEY",
  authDomain: "SEU_AUTH_DOMAIN",
  projectId: "SEU_PROJECT_ID",
  storageBucket: "SEU_STORAGE_BUCKET",
  messagingSenderId: "SEU_MESSAGING_SENDER_ID",
  appId: "SEU_APP_ID",
  measurementId: "SEU_measurementId:"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

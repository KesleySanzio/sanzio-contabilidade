// Configuração do Firebase do sistema Sanzio.
// Copie estes valores do console do Firebase:
// Configurações do projeto (ícone de engrenagem) › Geral › Seus apps › App da Web › "SDK setup and configuration" › Config.
// Estes valores NÃO são senhas: eles identificam o projeto e podem ficar no código.
// Quem protege os dados são as regras do Firestore (arquivo firestore.rules na raiz do repositório).
export const firebaseConfig = {
  apiKey: "AIzaSyBhIg-oKxNy_Mr9xMUmCDVtkQEQUtsda2A",
  authDomain: "sanzio-contabilidade.firebaseapp.com",
  projectId: "sanzio-contabilidade",
  storageBucket: "sanzio-contabilidade.firebasestorage.app",
  messagingSenderId: "690457087720",
  appId: "1:690457087720:web:133c42d96e352d23df435d"
};

// Nome da pasta que o sistema cria no seu Google Drive para guardar os documentos dos clientes.
export const pastaDrive = "Sanzio Contabilidade";

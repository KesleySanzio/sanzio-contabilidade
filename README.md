# Sanzio Serviços Contábeis — Landing Page

Página de apresentação e captação de clientes para escritório de contabilidade especializado em MEI, abertura de CNPJ e Imposto de Renda em Belo Horizonte.

## Sobre

Site desenvolvido para o escritório Sanzio Serviços Contábeis com foco em conversão via WhatsApp. O objetivo é apresentar os serviços de forma clara e direcionar o visitante para o contato direto.

**Serviços destacados:**
- Abertura de MEI e CNPJ
- Declaração de Imposto de Renda
- Assessoria contábil para pequenos negócios
- Atendimento ágil em BH

## Identidade visual

| Elemento | Valor |
|---|---|
| Cor primária | Azul `#0033B7` |
| Cor de destaque | Verde `#00C070` |
| Tipografia | Inter |
| Logo | Sanzio. SERVIÇOS CONTÁBEIS |

## Tecnologia

HTML puro + CSS inline — sem dependências externas além do Google Fonts. Arquivo único, fácil de hospedar em qualquer servidor.

## Visualizar localmente

Abra o `index.html` diretamente no navegador, ou suba um servidor simples:

```bash
python -m http.server 3457
```

Acesse [http://localhost:3457](http://localhost:3457).

---

# Sistema Sanzio — clientes, cofre de acessos e orçamentos

Fica em [`/sistema/`](sistema/index.html). É uma página única (HTML + JavaScript, sem build) que usa:

- **Firebase Authentication**: login com a conta Google;
- **Cloud Firestore**: banco de dados (clientes, orçamentos, serviços, ajustes e cofre);
- **Google Drive**: documentos dos clientes, numa pasta "Sanzio Contabilidade" com uma subpasta por cliente.

Tudo roda no **plano gratuito (Spark)** do Firebase, porque os arquivos ficam no Drive e não no Firebase Storage.

## Segurança

- Cada conta Google só acessa a própria pasta no Firestore (`users/{uid}/...`). As regras estão em [`firestore.rules`](firestore.rules).
- Senhas gov.br, códigos do Simples e senhas municipais são **criptografadas no navegador** (AES-GCM 256, chave derivada da senha mestra com PBKDF2, 310 mil iterações) antes de irem para o Firestore. Sem a senha mestra ninguém lê os acessos, nem quem tiver acesso ao banco. **A senha mestra não tem recuperação.**
- No Drive o sistema usa o escopo `drive.file`: ele só enxerga os arquivos e pastas que ele mesmo criou.
- Os valores de `sistema/firebase-config.js` não são senhas: eles identificam o projeto. Quem protege os dados são as regras do Firestore.
- **Nunca coloque dados de clientes ou arquivos de backup neste repositório.**

## Configuração (uma vez)

1. **Criar o projeto**: em [console.firebase.google.com](https://console.firebase.google.com), "Adicionar projeto". O Google Analytics não é necessário.
2. **Login com Google**: Authentication › Começar › Método de login › Google › Ativar (escolha o e-mail de suporte) › Salvar.
   Em Authentication › Configurações › **Domínios autorizados**, adicione `kesleysanzio.github.io`.
3. **Banco de dados**: Firestore Database › Criar banco de dados › modo de produção › local `southamerica-east1 (São Paulo)`.
   Na aba **Regras**, cole o conteúdo de [`firestore.rules`](firestore.rules) e clique em Publicar.
4. **App Web**: Configurações do projeto › Geral › Seus apps › ícone `</>` › registre o app (sem Hosting).
   Copie o objeto `firebaseConfig` para [`sistema/firebase-config.js`](sistema/firebase-config.js).
5. **Google Drive**: em [console.cloud.google.com](https://console.cloud.google.com), selecione o mesmo projeto:
   - APIs e serviços › Biblioteca › **Google Drive API** › Ativar;
   - APIs e serviços › Tela de consentimento OAuth › Público-alvo › **Usuários de teste** › adicione o seu Gmail.
6. **Publicar no GitHub Pages**: Settings › Pages › Build and deployment › *Deploy from a branch* › `main` / `/ (root)`.
   O GitHub Pages em repositório **privado** exige plano GitHub Pro (ou Team). Outra opção é tornar o repositório público: só o código fica visível, os dados continuam no Firebase.

O sistema fica em `https://kesleysanzio.github.io/sanzio-contabilidade/sistema/` e a landing page continua na raiz.

## Primeiro acesso

1. Entre com a conta Google.
2. Em **Ajustes › Backup › Importar backup**, carregue o arquivo de backup exportado do protótipo (clientes, serviços e dados do PIX).
3. Em **Ajustes › Cofre de senhas**, crie a senha mestra. Depois importe a planilha de clientes (.csv) em **Clientes › Importar da planilha**: as senhas vão criptografadas para o cofre.
4. Na ficha de um cliente, aba **Documentos**, os arquivos vão para o seu Google Drive. A conexão com o Drive vale cerca de 1 hora; depois o sistema mostra o botão "Conectar Google Drive" de novo.

## Rodar localmente

```bash
python -m http.server 3457
```

Abra `http://localhost:3457/sistema/`. Sem preencher `firebase-config.js`, o sistema abre em **modo demonstração** (dados de exemplo, nada é salvo). Para o login funcionar em `localhost`, ele já vem autorizado por padrão no Firebase.

# 🎓 GUIA PARA INICIANTES ABSOLUTOS - NeuroStudy R7+

**Para quem NUNCA programou na vida**

---

## 🤔 ANTES DE COMEÇAR: O que é cada coisa?

### O que é um "aplicativo React"?
É um site/programa que roda no seu navegador (Chrome, Firefox, etc.). Igual Netflix, Gmail, YouTube.

### O que é "rodar o código"?
É fazer o programa funcionar no seu computador, igual quando você abre Word, Excel, etc.

### Eu preciso saber programar?
**NÃO!** Você só precisa seguir os passos. É tipo seguir uma receita de bolo.

---

## 🎯 ESCOLHA SEU CAMINHO

### ⭐ **CAMINHO FÁCIL** (Recomendado para iniciantes)
**SEM INSTALAR NADA** - Roda direto no navegador
→ Pule para [PARTE A: Online (Fácil)](#parte-a-online-fácil)

### 🔧 **CAMINHO COMPLETO** (Melhor experiência)
**Instala no seu computador** - Mais rápido depois de configurar
→ Continue lendo [PARTE B: Local (Completo)](#parte-b-local-completo)

---

# PARTE A: Online (Fácil)

## ✨ Rodar SEM instalar nada (5-10 minutos)

### Passo 1: Abra o StackBlitz

**O que é StackBlitz?**
É um "computador virtual" no navegador onde você pode rodar código sem instalar nada.

**Como fazer:**
1. Abra seu navegador (Chrome, Firefox, Edge, Safari)
2. Digite na barra de endereço: **stackblitz.com**
3. Aperte Enter

### Passo 2: Crie um projeto React

**Na página do StackBlitz:**
1. Procure um botão que diz **"Start a new project"** ou **"New Project"**
2. Clique nele
3. Vai aparecer uma lista de opções
4. Clique em **"React"** (tem um logo azul circular)

**O que você vai ver:**
- Uma tela preta/escura (é o "editor de código")
- Do lado direito, uma prévia do site
- Algumas pastas e arquivos do lado esquerdo

### Passo 3: Baixe os arquivos do GitHub

**Abra uma nova aba:**
1. Digite: **github.com/pesaaad-ux/Teste-2**
2. Aperte Enter
3. Você vai ver uma página com vários arquivos

**Baixe o projeto:**
1. Procure um botão VERDE que diz **"Code"**
2. Clique nele
3. Clique em **"Download ZIP"**
4. O arquivo vai baixar (procure na pasta "Downloads" do seu computador)

**Extraia o arquivo:**
1. Vá na pasta "Downloads"
2. Ache um arquivo chamado **"Teste-2-main.zip"** ou similar
3. Clique com botão direito → **"Extrair tudo"** (Windows) ou simplesmente clique 2× (Mac)
4. Uma pasta vai aparecer

### Passo 4: Copie os arquivos importantes

**Volte para o StackBlitz.**

**Arquivos que você precisa copiar:**

#### Arquivo 1: NeuroStudyEnhanced.jsx
1. Na pasta extraída, entre em: **Teste-2** → **src** → **NeuroStudyEnhanced.jsx**
2. Abra com Bloco de Notas (Windows) ou TextEdit (Mac)
3. Selecione TODO o texto (Ctrl+A no Windows, Cmd+A no Mac)
4. Copie (Ctrl+C ou Cmd+C)
5. Volte pro StackBlitz
6. Do lado esquerdo, clique com botão direito na pasta **"src"**
7. Escolha **"New File"**
8. Digite o nome: **NeuroStudyEnhanced.jsx**
9. Clique no arquivo que você acabou de criar
10. Cole o código (Ctrl+V ou Cmd+V)

#### Arquivo 2: App.js
1. No StackBlitz, do lado esquerdo, procure um arquivo chamado **"App.js"** (já existe)
2. Clique nele
3. **DELETE TODO** o conteúdo que está lá
4. Copie isto e cole:

```javascript
import React from 'react';
import NeuroStudyEnhanced from './NeuroStudyEnhanced';
import './App.css';

function App() {
  return (
    <div className="App">
      <NeuroStudyEnhanced />
    </div>
  );
}

export default App;
```

#### Arquivo 3: App.css
1. No StackBlitz, procure **"App.css"**
2. Clique nele
3. **DELETE TODO** o conteúdo
4. Na pasta extraída, abra **Teste-2** → **src** → **App.css**
5. Copie TODO o conteúdo
6. Cole no App.css do StackBlitz

### Passo 5: Instalar lucide-react

**Isto é IMPORTANTE** (resolve o erro que você teve)

**No StackBlitz:**
1. Do lado esquerdo, procure um ícone que parece uma **caixa** ou **cubo**
   (pode estar escrito "Dependencies" quando você passar o mouse)
2. Clique nele
3. Vai aparecer uma lista de "packages" ou "dependencies"
4. Procure um campo de busca ou um botão **"+"** ou **"Add dependency"**
5. Clique nele
6. Digite: **lucide-react**
7. Clique no resultado que aparecer (vai ter um ícone de download)
8. Aguarde alguns segundos

**Você vai ver:** Uma barrinha carregando e depois "lucide-react" aparece na lista.

### Passo 6: Veja funcionando!

**Olhe do lado direito do StackBlitz.**

Você DEVE ver:
- Um fundo degradê azul/roxo
- Título **"NeuroStudy R7+"**
- Botão **"Nova Sessão"**
- Cards com informações

**Se vir isso: FUNCIONOU!** 🎉

**Se der erro:**
- Procure na parte de baixo do StackBlitz uma aba **"Console"**
- Clique nela
- Veja se tem algo em vermelho
- Copie e me envie (vou te ajudar)

---

# PARTE B: Local (Completo)

## 💻 Rodar no seu computador (20-30 minutos primeira vez)

### Etapa 1: Instalar Node.js

**O que é Node.js?**
É um programa que permite rodar aplicativos JavaScript no seu computador. É tipo instalar Java ou .NET - você não usa direto, mas outros programas precisam dele.

**É seguro?**
Sim! É usado por milhões de programadores no mundo todo.

---

#### **WINDOWS:**

1. **Baixar o instalador:**
   - Abra o navegador
   - Digite: **nodejs.org**
   - Aperte Enter
   - Você vai ver a página do Node.js
   - Tem um botão VERDE grande que diz algo como **"18.x.x LTS"** ou **"20.x.x LTS"**
   - Clique nele (vai baixar um arquivo .msi)

2. **Instalar:**
   - Vá na pasta "Downloads"
   - Clique 2× no arquivo que baixou (node-vXX.XX.X-x64.msi)
   - Vai abrir um assistente de instalação
   - Clique em **"Next"** (Avançar)
   - Aceite os termos → **"Next"**
   - **"Next"** em tudo (deixe padrão)
   - Na última tela, clique **"Install"** (Instalar)
   - Vai pedir senha de administrador - digite
   - Aguarde instalar (1-2 minutos)
   - Clique **"Finish"** (Concluir)

3. **Verificar se funcionou:**
   - Aperte tecla **Windows** (aquela com logo do Windows)
   - Digite: **cmd**
   - Aperte Enter (vai abrir uma janela preta - é o "Prompt de Comando")
   - Digite: **node --version**
   - Aperte Enter
   - Deve aparecer algo tipo: **v18.16.0** ou **v20.x.x**
   - Se aparecer isso: **FUNCIONOU!** ✅

**Se der erro "comando não reconhecido":**
- Feche o cmd (X no canto)
- Abra de novo
- Tente novamente

---

#### **MAC:**

1. **Baixar o instalador:**
   - Abra Safari ou Chrome
   - Digite: **nodejs.org**
   - Clique no botão verde **"XX.x.x LTS"**
   - Vai baixar um arquivo .pkg

2. **Instalar:**
   - Vá em Downloads
   - Clique 2× no arquivo .pkg
   - Siga o assistente (Next → Next → Install)
   - Digite sua senha quando pedir
   - Aguarde
   - Clique "Fechar"

3. **Verificar:**
   - Aperte **Cmd + Espaço** (abre Spotlight)
   - Digite: **Terminal**
   - Aperte Enter (abre uma janela)
   - Digite: **node --version**
   - Aperte Enter
   - Deve aparecer: **v18.x.x** ou **v20.x.x**

---

### Etapa 2: Baixar o projeto

**O que é "clonar/baixar um repositório"?**
É baixar os arquivos do projeto do GitHub (tipo um Google Drive para programadores).

#### **OPÇÃO A: Baixar ZIP (Mais fácil)**

1. **Abra o navegador**
2. Digite: **github.com/pesaaad-ux/Teste-2**
3. Procure um botão VERDE **"Code"**
4. Clique nele
5. Clique em **"Download ZIP"**
6. Vai baixar um arquivo .zip
7. Vá em Downloads
8. Clique com botão direito no arquivo
9. **"Extrair tudo"** (Windows) ou clique 2× (Mac)
10. Pronto! Você tem uma pasta **"Teste-2-main"** ou **"Teste-2"**

**Anote onde está essa pasta!** Você vai precisar depois.

#### **OPÇÃO B: Com Git (Mais avançado - pule se não souber)**

Se você já tem Git instalado:
```
git clone https://github.com/pesaaad-ux/Teste-2.git
```

---

### Etapa 3: Abrir o "Terminal" ou "Prompt de Comando"

**O que é isso?**
É uma janela onde você digita comandos de texto para o computador. É antigo mas muito poderoso. Não se preocupe, vou te dizer exatamente o que digitar.

#### **WINDOWS:**

**Jeito 1:**
1. Aperte tecla **Windows**
2. Digite: **cmd**
3. Aperte Enter

**Jeito 2:**
1. Aperte **Windows + R** juntos
2. Digite: **cmd**
3. Aperte Enter

Vai abrir uma janela preta. É isso mesmo!

#### **MAC:**

1. Aperte **Cmd + Espaço**
2. Digite: **Terminal**
3. Aperte Enter

Vai abrir uma janela branca ou preta.

---

### Etapa 4: Ir até a pasta do projeto

**Isto é IMPORTANTE.** Você precisa "navegar" até onde está a pasta do projeto.

**Passo 1: Descobrir onde está a pasta**

Se você baixou, provavelmente está em:
- **Windows:** `C:\Users\SeuNome\Downloads\Teste-2-main`
- **Mac:** `/Users/SeuNome/Downloads/Teste-2-main`

**Passo 2: Comando "cd" (Change Directory)**

**WINDOWS:**

No Prompt de Comando (janela preta), digite:

```
cd C:\Users\SeuNome\Downloads\Teste-2-main
```

**⚠️ IMPORTANTE:** Troque "SeuNome" pelo seu nome de usuário real!

**Dica:** Se não sabe seu nome de usuário, digite só:
```
cd Downloads
```
Aperte Enter. Depois:
```
cd Teste-2-main
```
(ou Teste-2, dependendo do nome da pasta)

**MAC:**

No Terminal, digite:
```
cd ~/Downloads/Teste-2-main
```

**Como saber se deu certo?**

Depois de apertar Enter, digite:
```
dir
```
(Windows) ou
```
ls
```
(Mac)

Você DEVE ver uma lista de arquivos incluindo:
- package.json
- README.md
- src
- public

**Se vir isso: você está no lugar certo!** ✅

---

### Etapa 5: Instalar as dependências

**O que são "dependências"?**
São outros programas/bibliotecas que o app precisa para funcionar. Tipo quando você instala um jogo e ele baixa DirectX, Visual C++, etc.

**No Terminal/Prompt de Comando** (certifique-se que está na pasta certa), digite:

```
npm install
```

Aperte Enter.

**O que vai acontecer:**
- Vai aparecer um monte de texto
- Vai dizer "downloading..." ou "installing..."
- Vai criar uma pasta chamada **"node_modules"** (não mexa nela!)
- Vai levar **2-5 minutos** dependendo da internet

**Você vai ver coisas como:**
```
added 1500 packages in 2m
```

**Se tudo terminar sem erro vermelho grande: FUNCIONOU!** ✅

**Possíveis problemas:**

**"npm: command not found" (Windows/Mac):**
→ Node.js não foi instalado direito
→ Volte na Etapa 1

**"EACCES: permission denied" (Mac/Linux):**
→ Digite antes: `sudo npm install`
→ Vai pedir sua senha

**"Port está ocupado" ou similar:**
→ Ignore por enquanto, não é problema ainda

---

### Etapa 6: RODAR o aplicativo!

**Ainda no Terminal/Prompt de Comando**, digite:

```
npm start
```

Aperte Enter.

**O que vai acontecer:**
1. Vai aparecer um monte de texto
2. Vai dizer "Compiling..." (Compilando)
3. Depois **"Compiled successfully!"** (Compilou com sucesso!)
4. **O NAVEGADOR VAI ABRIR SOZINHO** em http://localhost:3000

**Se o navegador não abrir:**
- Abra manualmente
- Digite na barra: **localhost:3000**
- Aperte Enter

---

### Etapa 7: VER FUNCIONANDO! 🎉

**Você DEVE ver:**

1. **Um fundo bonito** azul/roxo degradê
2. **Título grande:** "NeuroStudy R7+"
3. **Botão grande:** "Nova Sessão"
4. **Cards coloridos** com informações sobre otimização circadiana
5. **Badges** (etiquetas) com "LTP Optimization", "Theta-Gamma Coupling", etc.

**Se vir isso: FUNCIONOU PERFEITAMENTE!** 🎊🎊🎊

---

### Etapa 8: Usar o aplicativo

**Clique no botão "Nova Sessão".**

Vai aparecer um formulário perguntando:
- Qual o tópico? (digite algo tipo "Biologia")
- Quantas páginas?
- Complexidade?
- Etc.

Preencha e clique **"Iniciar Sessão"**.

O aplicativo vai te guiar passo-a-passo!

**Para aprender a USAR o protocolo de estudo:**
→ Leia o arquivo **GUIA_DE_USO.md** (tem 20.000 palavras de instruções)

---

## 🐛 PROBLEMAS COMUNS E SOLUÇÕES

### Problema 1: "npm: command not found"

**Causa:** Node.js não instalado ou não no PATH.

**Solução:**
1. Instale Node.js (veja Etapa 1)
2. **FECHE e ABRA de novo** o Terminal/Prompt
3. Tente: `node --version`
4. Se funcionar, tente: `npm install` de novo

---

### Problema 2: "Port 3000 is already in use"

**Causa:** Já tem algo rodando na porta 3000.

**Solução:**

**Windows:**
1. Feche todos navegadores
2. No Prompt, aperte **Ctrl+C** (para tudo)
3. Digite: `npm start` de novo

**Mac:**
1. No Terminal, aperte **Ctrl+C**
2. Digite: `lsof -ti:3000 | xargs kill -9`
3. Digite: `npm start` de novo

**Ou use outra porta:**
```
PORT=3001 npm start
```

---

### Problema 3: Página em branco

**Causa:** Erro de JavaScript.

**Solução:**
1. Aperte **F12** no navegador (abre Developer Tools)
2. Clique na aba **"Console"**
3. Veja se tem texto em vermelho
4. Copie TUDO e me envie
5. Vou te ajudar!

**Fix rápido:**
```
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
npm start
```

---

### Problema 4: "Cannot find module 'lucide-react'"

**Causa:** Dependência não instalou.

**Solução:**
```
npm install lucide-react
npm start
```

---

### Problema 5: Erro de permissão (Mac/Linux)

**Solução:**
```
sudo chown -R $(whoami) ~/.npm
npm install
```

---

## 📝 COMANDOS RESUMIDOS

**Se você perdeu ou fechou:**

```bash
# 1. Ir até a pasta
cd caminho/da/pasta/Teste-2

# 2. Instalar (só primeira vez)
npm install

# 3. Rodar
npm start

# 4. Parar (quando quiser fechar)
Ctrl+C
```

---

## 🎥 O QUE VOCÊ VAI VER

**No Terminal quando rodar `npm start`:**
```
Compiled successfully!

You can now view neurostudy-r7-plus in the browser.

  Local:            http://localhost:3000
  On Your Network:  http://192.168.1.5:3000

Note that the development build is not optimized.
To create a production build, use npm run build.
```

**No navegador:**

```
╔══════════════════════════════════════════════════════╗
║                                                      ║
║  🧠 NeuroStudy R7+                                  ║
║                                                      ║
║  Protocolo Neurofisiológico Avançado de Aprendizado ║
║                                                      ║
║  [LTP Optimization] [Theta-Gamma Coupling] ...      ║
║                                                      ║
║  ┌─────────────────────────────────────────┐       ║
║  │                                         │       ║
║  │    ⚡ Nova Sessão                       │       ║
║  │    Iniciar protocolo                    │       ║
║  │                                         │       ║
║  └─────────────────────────────────────────┘       ║
║                                                      ║
║  ⏰ Otimização Circadiana                          ║
║  [Seu horário: 10:30 - PICO DE APRENDIZADO]        ║
║                                                      ║
╚══════════════════════════════════════════════════════╝
```

---

## ⏱️ TEMPO NECESSÁRIO

**Primeira vez (instalando tudo):**
- Instalar Node.js: 5 minutos
- Baixar projeto: 1 minuto
- Instalar dependências: 2-5 minutos
- Rodar: 30 segundos
**TOTAL: ~15 minutos**

**Próximas vezes:**
```
cd Teste-2
npm start
```
**TOTAL: 30 segundos**

---

## 🎓 GLOSSÁRIO (Palavras que você vai ver)

**Terminal/Prompt de Comando:** Janela onde você digita comandos de texto

**Node.js:** Programa que permite rodar JavaScript no computador

**npm:** Gerenciador de pacotes (instala bibliotecas automaticamente)

**npm install:** Comando que baixa todas as dependências

**npm start:** Comando que roda o aplicativo

**localhost:3000:** Endereço local do seu computador (como 127.0.0.1:3000)

**Dependências:** Bibliotecas/programas que o app precisa

**React:** Biblioteca JavaScript para criar interfaces (tipo o app)

**lucide-react:** Biblioteca de ícones bonitinhos

**src:** Pasta com código-fonte (source)

**public:** Pasta com arquivos públicos (HTML, etc.)

**package.json:** Arquivo com lista de dependências

**node_modules:** Pasta GIGANTE com todas as dependências (não mexa!)

---

## ✅ CHECKLIST FINAL

Antes de pedir ajuda, verifique:

- [ ] Node.js instalado? (`node --version` funciona?)
- [ ] npm instalado? (`npm --version` funciona?)
- [ ] Está na pasta certa? (`ls` ou `dir` mostra package.json?)
- [ ] Instalou dependências? (existe pasta `node_modules`?)
- [ ] Rodou `npm start`?
- [ ] Viu "Compiled successfully!"?
- [ ] Navegador abriu em localhost:3000?
- [ ] Console do navegador (F12) sem erros?

---

## 🆘 PRECISA DE AJUDA?

**Me envie:**

1. **Seu sistema:** Windows 10? Windows 11? Mac? Linux?
2. **O que você tentou:** Qual etapa parou?
3. **Resultado de:**
   ```
   node --version
   npm --version
   ```
4. **Erro completo:** Copie TUDO que apareceu em vermelho
5. **Screenshot:** Se possível

**Eu respondo e te ajudo!**

---

## 🎯 ALTERNATIVA SUPER FÁCIL

**Se nada funcionar, use o StackBlitz (online):**

1. Vá em: **stackblitz.com**
2. Clique "Start new project" → "React"
3. Siga a [PARTE A](#parte-a-online-fácil) deste guia
4. **Funciona 100% no navegador, sem instalar NADA**

---

## 🎉 VOCÊ CONSEGUE!

Parece complicado, mas **é só seguir os passos um por vez.**

É tipo:
1. Instalar um programa (Node.js)
2. Baixar uma pasta (projeto)
3. Apertar alguns botões (comandos)
4. Ver funcionando!

**Milhões de pessoas fizeram isso pela primeira vez.**
**Você também consegue!**

**Boa sorte! E qualquer dúvida, me chame!** 🚀🧠

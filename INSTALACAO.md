# 🚀 GUIA DE INSTALAÇÃO - NeuroStudy R7+

## 📋 Pré-requisitos

Antes de começar, você precisa ter instalado no seu computador:

### 1. **Node.js** (versão 16 ou superior)

**Verificar se já tem instalado:**
```bash
node --version
```

Se retornar algo como `v16.x.x` ou superior, você já tem! Pule para o passo 2.

**Se não tiver, instale:**

- **Windows/Mac:** https://nodejs.org/ (baixe o instalador LTS)
- **Linux (Ubuntu/Debian):**
  ```bash
  curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
  sudo apt-get install -y nodejs
  ```
- **Linux (outras distros):** https://nodejs.org/en/download/package-manager/

### 2. **npm** (geralmente vem com Node.js)

**Verificar:**
```bash
npm --version
```

Deve retornar algo como `8.x.x` ou superior.

---

## 🎯 INSTALAÇÃO RÁPIDA (Passo a Passo)

### Opção 1: Se você já tem este repositório clonado

**Passo 1: Navegue até a pasta do projeto**
```bash
cd /home/user/Teste-2
# Ou no seu caso, o caminho onde você clonou o repo
```

**Passo 2: Instale as dependências**
```bash
npm install
```

Isso vai instalar:
- React
- React-DOM
- React-Scripts
- Lucide-React (ícones)

**Aguarde...** pode levar 2-5 minutos dependendo da sua conexão.

**Passo 3: Inicie o aplicativo**
```bash
npm start
```

**Pronto!** O navegador deve abrir automaticamente em `http://localhost:3000`

Se não abrir, abra manualmente: http://localhost:3000

---

### Opção 2: Instalação do Zero (Sem o repositório)

**Passo 1: Clone o repositório**
```bash
git clone https://github.com/pesaaad-ux/Teste-2.git
cd Teste-2
```

**Passo 2: Instale as dependências**
```bash
npm install
```

**Passo 3: Inicie o aplicativo**
```bash
npm start
```

---

## 🛠️ COMANDOS DISPONÍVEIS

### `npm start`
Inicia o app em modo de desenvolvimento.
- Abre automaticamente em http://localhost:3000
- A página recarrega automaticamente quando você edita o código
- Erros aparecem no console do navegador

### `npm run build`
Cria uma versão otimizada para produção na pasta `build/`
- Minifica o código
- Otimiza performance
- Pronto para deploy

### `npm test`
Executa testes (se houverem)

---

## 🐛 PROBLEMAS COMUNS E SOLUÇÕES

### Erro: "Cannot find module 'lucide-react'"

**Causa:** A dependência não foi instalada.

**Solução:**
```bash
npm install lucide-react
```

Ou reinstale tudo:
```bash
rm -rf node_modules package-lock.json
npm install
```

---

### Erro: "Port 3000 is already in use"

**Causa:** Já existe algo rodando na porta 3000.

**Solução A:** Use outra porta
```bash
PORT=3001 npm start
```

**Solução B:** Mate o processo na porta 3000
```bash
# Linux/Mac:
lsof -ti:3000 | xargs kill -9

# Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

---

### Erro: "npm: command not found"

**Causa:** Node.js não está instalado ou não está no PATH.

**Solução:**
1. Instale o Node.js: https://nodejs.org/
2. Reinicie o terminal
3. Teste: `node --version` e `npm --version`

---

### Erro: "EACCES: permission denied"

**Causa:** Permissões incorretas (comum no Linux/Mac).

**Solução:**
```bash
sudo chown -R $(whoami) ~/.npm
sudo chown -R $(whoami) /usr/local/lib/node_modules
```

---

### Página em branco após `npm start`

**Causa:** Possível erro de JavaScript no console.

**Solução:**
1. Abra o DevTools do navegador (F12)
2. Vá na aba "Console"
3. Veja o erro
4. Copie o erro e me envie

**Possíveis fixes:**
```bash
# Limpar cache
npm cache clean --force

# Reinstalar
rm -rf node_modules package-lock.json
npm install

# Tentar de novo
npm start
```

---

### Erro: "Cannot read property 'AdvancedLearningAlgorithms' of undefined"

**Causa:** Problema com exportação/importação do componente.

**Solução:**
Verifique se o arquivo `src/NeuroStudyEnhanced.jsx` tem no final:
```javascript
export default function NeuroStudyEnhanced() {
  // ...
}
```

E não:
```javascript
export { NeuroStudyEnhanced };
```

---

## 📱 RODAR EM DISPOSITIVOS MÓVEIS (Mesma Rede)

**Passo 1:** Descubra seu IP local
```bash
# Linux/Mac:
ifconfig | grep "inet "

# Windows:
ipconfig
```

Procure por algo como `192.168.x.x`

**Passo 2:** Inicie o app
```bash
npm start
```

**Passo 3:** No celular/tablet, abra o navegador e acesse:
```
http://192.168.x.x:3000
```
(substitua pelo seu IP)

---

## 🌐 DEPLOY (Colocar Online)

### Opção 1: Netlify (Gratuito e Fácil)

**Passo 1:** Crie build
```bash
npm run build
```

**Passo 2:** Vá em https://app.netlify.com/drop

**Passo 3:** Arraste a pasta `build/` para o site

**Pronto!** Você terá um link público tipo `nome-aleatorio.netlify.app`

---

### Opção 2: Vercel (Gratuito e Fácil)

**Passo 1:** Instale Vercel CLI
```bash
npm install -g vercel
```

**Passo 2:** Deploy
```bash
vercel
```

Siga as instruções e pronto!

---

### Opção 3: GitHub Pages

**Passo 1:** Instale o pacote
```bash
npm install --save gh-pages
```

**Passo 2:** Adicione no `package.json`:
```json
"homepage": "https://seu-usuario.github.io/Teste-2",
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d build"
}
```

**Passo 3:** Deploy
```bash
npm run deploy
```

---

## 🔧 DESENVOLVIMENTO (Para Modificar o Código)

### Estrutura de Pastas

```
Teste-2/
├── public/
│   └── index.html          # HTML base
├── src/
│   ├── App.js              # Componente principal
│   ├── App.css             # Estilos globais
│   ├── index.js            # Ponto de entrada
│   ├── index.css           # Estilos base
│   └── NeuroStudyEnhanced.jsx  # Componente do app
├── package.json            # Dependências
├── GUIA_DE_USO.md         # Como usar o app
├── MELHORIAS_IMPLEMENTADAS.md  # Documentação técnica
└── README.md              # Overview
```

### Editando o Código

**Editor recomendado:** VS Code (https://code.visualstudio.com/)

**Extensões úteis:**
- ES7+ React/Redux/React-Native snippets
- Prettier - Code formatter
- ESLint

**Para editar:**
1. Abra a pasta no VS Code
2. Edite `src/NeuroStudyEnhanced.jsx`
3. Salve (Ctrl+S)
4. O navegador recarrega automaticamente

---

## 🧪 TESTANDO SE FUNCIONOU

Após `npm start`, você deve ver:

**No terminal:**
```
Compiled successfully!

You can now view neurostudy-r7-plus in the browser.

  Local:            http://localhost:3000
  On Your Network:  http://192.168.x.x:3000
```

**No navegador:**
- Dashboard com "NeuroStudy R7+"
- Botão "Nova Sessão"
- Cards com informações sobre otimização circadiana
- Sem erros no console (F12)

**Se vir isso, está funcionando!** ✅

---

## 💾 SALVANDO DADOS (Opcional)

O app atualmente usa apenas memória (dados perdidos ao recarregar).

**Para persistir dados, você pode:**

### Opção 1: LocalStorage (Simples)
Adicione no componente:
```javascript
// Salvar
localStorage.setItem('neurostudy-sessions', JSON.stringify(sessions));

// Carregar
const saved = localStorage.getItem('neurostudy-sessions');
if (saved) {
  setSessions(JSON.parse(saved));
}
```

### Opção 2: IndexedDB (Mais robusto)
Use bibliotecas como:
- Dexie.js
- localForage

### Opção 3: Backend (Sync entre dispositivos)
- Firebase
- Supabase
- Backend próprio

---

## 📊 PERFORMANCE

**Build size esperado:**
- ~500KB gzipped (otimizado)
- Tempo de load: <2s em conexão boa

**Otimizações aplicadas:**
- Code splitting
- Tree shaking
- Minificação
- Lazy loading (pode adicionar)

---

## 🆘 AINDA COM PROBLEMAS?

### Checklist Final:

- [ ] Node.js instalado? (`node --version`)
- [ ] npm instalado? (`npm --version`)
- [ ] Dentro da pasta do projeto? (`pwd` ou `cd`)
- [ ] Dependências instaladas? (`ls node_modules`)
- [ ] Arquivos corretos? (`ls src/`)
- [ ] Porta 3000 livre?
- [ ] Console do navegador sem erros? (F12)

### Logs Úteis:

Se nada funcionar, rode:
```bash
npm install --verbose
npm start 2>&1 | tee debug.log
```

E me envie o arquivo `debug.log`.

---

## 📞 CONTATO

**Se continuar com problemas:**

1. **Descreva exatamente:**
   - Sistema operacional (Windows/Mac/Linux)
   - Versão do Node (`node --version`)
   - Comando que rodou
   - Erro completo (copie tudo)
   - Screenshot se possível

2. **Cole aqui o erro**

3. **Eu te ajudo!**

---

## 🎉 PRONTO!

Se você chegou até aqui e está funcionando:

**PARABÉNS!** 🎊

Agora leia o **GUIA_DE_USO.md** para aprender a usar o protocolo de estudo.

**Próximos passos:**
1. ✅ Leia GUIA_DE_USO.md (20.000 palavras)
2. ✅ Execute sua primeira sessão
3. ✅ Agende revisões no calendário
4. ✅ Durma 7-9h hoje à noite

**A ciência funciona. Comece agora!** 🧠🚀

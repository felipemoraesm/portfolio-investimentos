# API de Gerenciamento de Portfólio de Investimentos

Este projeto consiste em uma API REST desenvolvida para a gestão de ativos financeiros, permitindo o registro, a listagem e a exclusão de investimentos em tempo real. O sistema foi construído com foco em escalabilidade e segurança de tipos, utilizando o ecossistema moderno do Node.js.

## Tecnologias e Ferramentas
- **Node.js & TypeScript**: Ambiente de execução e linguagem com tipagem estática para maior robustez do código.
- **Express**: Framework web para gerenciamento de rotas e middlewares.
- **MongoDB Atlas**: Banco de dados NoSQL em nuvem, utilizando o **Driver Nativo** para operações de alta performance.
- **Git Flow**: Gerenciamento de versionamento utilizando branches e revisões via Pull Requests.
- **dotenv**: Credenciais do banco lidas de variáveis de ambiente, fora do código-fonte.
- **REST Client**: Utilizado para testes de integração e validação das rotas diretamente no VS Code.

## Funcionalidades (CRUD)
- **POST `/investimentos`**: Realiza a persistência de novos ativos (Ticker, Quantidade, Preço) no MongoDB.
- **GET `/investimentos`**: Recupera a lista completa de ativos cadastrados no banco de dados.
- **DELETE `/investimentos/:id`**: Remove um ativo específico utilizando o `ObjectId` único gerado pelo MongoDB.

## Como Rodar o Projeto
1. Clone este repositório.
2. Instale as dependências: `npm install`.
3. Copie o arquivo `.env.example` para `.env` e preencha a variável `MONGO_URI` com a string de conexão do seu cluster no MongoDB Atlas. O arquivo `.env` não é enviado ao GitHub.
4. Execute o servidor em modo de desenvolvimento: `npm run dev` (por padrão na porta 3000).
5. Utilize o arquivo `testes.http` (extensão REST Client do VS Code) para fazer as requisições às rotas.

Para gerar a versão compilada: `npm run build` e depois `npm start`.

## Diferenciais Técnicos
- **Tratamento de Erros**: Implementação de blocos try/catch para garantir a estabilidade da API e retornar status codes apropriados (201, 200, 404, 500).
- **Módulos ECMAScript (ESM)**: Uso de padrões modernos de módulos do JavaScript para melhor organização do projeto.
- **Manipulação de ID Único**: Uso da classe `ObjectId` do driver nativo para operações precisas de exclusão no banco de dados.

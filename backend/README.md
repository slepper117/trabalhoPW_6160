# trabalhoPW_6160 - Backend

Backend do projeto Programação Web, utilizando a framework Express.js e Node.JS.

## Funcionalidades

- Uso de ES6
- Uso de async/await para as chamadas assíncronas
- Uso do Eslint e Prettier para formatação e validação do código
- Validação de inputs e business rules
- Código documentado

## Desenvolvimento

Os seguintes scripts, podem ser utilizados neste projeto:

| Script          | Descrição                                                           |
| --------------- | ------------------------------------------------------------------- |
| `npm start`     | Inicia um servidor                                                  |
| `npm run watch` | Reinicia automaticamente o servidor sempre que houver uma alteração |
| `npm run lint`  | Corre o Linter no código                                            |
| `npm run fix`   | Corrige erros e formata o código                                    |

## Documentação

Todas as respostas são fornecidas no formato JSON, acompanhados de um código HTTP `200 Ok`.

Outras considerações:

- Datas usam o formato ISO8601
- ID's e contagens, são inteiros
- Valores nulos, são devolvidos como null ou empty

### Erros

A API devolve os seguintes erros:

| Código HTTP                 | Tipo de Erro                        |
| --------------------------- | ----------------------------------- |
| `400 Bad Request`           | Pedido inválido                     |
| `401 Unauthorized`          | Erro de autenticação ou autorização |
| `404 Not Found`             | Recursos não existem                |
| `500 Internal Server Error` | Erro de Servidor                    |

### Parâmetros

Alguns endpoints suportam parâmetros no seguinte formato: `GET /posts?status=draft`. Os parâmetros disponíveis encontram-se documentados.

### Paginação

Respostas que tem mais de um objeto, serão paginadas por padrão com um limite de 10.

Adicionalmente são incluídos 3 headers:

- `X-BTH-Total` - Retorna o total de objetos
- `X-BTH-TotalPages` - Retorna o total de páginas
- `Link` - Retorna os Links com as próximas páginas

### Autenticação

Esta API suporta autenticação através de cookies utilizando email e password.

| Endpoint              | Método | Descrição                                 |
| --------------------- | ------ | ----------------------------------------- |
| /auth/login           | Post   | Efetua Login                              |
| /auth/logout          | Post   | Efetua Logout                             |
| /auth/isAuthenticated | Get    | Verifica se o Utilizador está autenticado |

### Artigos

Esta API suporta a gestão de artigos.

#### Propriedades

| Atributo      | Tipo     | Meta           | Descrição                                                        |
| ------------- | -------- | -------------- | ---------------------------------------------------------------- |
| id            | integer  | Apenas Leitura | Identificador único do artigo.                                   |
| author        | integer  | Obrigatório    | O ID do autor do artigo.                                         |
| category      | integer  |                | O ID da categoria do artigo. Padrão: 1                           |
| date          | datetime |                | A data de publicação do artigo. Padrão: Data Atual               |
| title         | string   | Obrigatório    | O título do artigo.                                              |
| excerpt       | string   | Obrigatório    | O excerto do artigo.                                             |
| content       | string   | Obrigatório    | O conteúdo do artigo.                                            |
| status        | string   |                | O estado do artigo. Um dos: publish, draft                       |
| featured      | boolean  |                | Se o artigo deve ser tratado como featured ou não. Padrão: false |
| date_modified | datetime | Apenas Leitura | A data no qual o artigo foi modificado pela ultima vez           |

#### Endpoints

| Endpoint   | Método | Autenticação | Descrição          |
| ---------- | ------ | ------------ | ------------------ |
| /posts/    | Get    |              | Lista artigos      |
| /posts/    | Post   | Sim          | Cria um artigo     |
| /posts/:id | Get    |              | Lê um artigo       |
| /posts/:id | Put    | Sim          | Atualiza um artigo |
| /posts/:id | Del    | Sim          | Apaga um artigo    |

#### Parâmetros

O endpoint `GET /posts/` suporta os seguintes parâmetros:

| Parâmetro  | Tipo    | Descrição                                                                            |
| ---------- | ------- | ------------------------------------------------------------------------------------ |
| page       | integer | Página atual da coleção. Padrão: 1                                                   |
| limit      | integer | Número máximo de objetos a ser devolvido por página. Padrão: 10                      |
| authors    | integer | O ID ou ID's dos autores dos artigos.                                                |
| order      | string  | Ordenação dos objetos. Um de: asc, desc. Padrão: desc                                |
| orderby    | string  | Artibuto pelo qual aplicar a ordenação. Um de: id, date, title. Padrão: date         |
| status     | string  | Limitar os objetos ao estado. Um ou mais de: publish, future, draft. Padrão: publish |
| featured   | boolean | Limitar resultados ao featured. Um de: true, false                                   |
| categories | integer | O ID ou ID's para a categoria de artigos.                                            |

O endpoint `DEL /posts/:id` suporta o seguinte parâmetro:

| Parâmetro | Tipo    | Descrição                               |
| --------- | ------- | --------------------------------------- |
| force     | boolean | Força ou não a destruição de um artigo. |

### Categorias de Artigos

Esta API suporta a gestão das categorias de artigos.

#### Propriedades

| Atributo | Tipo    | Meta           | Descrição                      |
| -------- | ------- | -------------- | ------------------------------ |
| id       | integer | Apenas Leitura | Identificador único do artigo. |
| name     | string  | Obrigatório    | O nome da categoria.           |

#### Endpoints

| Endpoint              | Método | Autenticação | Descrição              |
| --------------------- | ------ | ------------ | ---------------------- |
| /posts/categories/    | Get    |              | Lista categorias       |
| /posts/categories/    | Post   | Sim          | Cria uma categoria     |
| /posts/categories/:id | Get    |              | Lê uma categoria       |
| /posts/categories/:id | Put    | Sim          | Atualiza uma categoria |
| /posts/categories/:id | Del    | Sim          | Apaga uma categoria    |

#### Parâmetros

O endpoint `GET /posts/categories/` suporta os seguintes parâmetros:

| Parâmetro | Tipo    | Descrição                                                                    |
| --------- | ------- | ---------------------------------------------------------------------------- |
| page      | integer | Página atual da coleção. Padrão: 1                                           |
| limit     | integer | Número máximo de objetos a ser devolvido por página. Padrão: 10              |
| order     | string  | Ordenação dos objetos. Um de: asc, desc. Padrão: desc                        |
| orderby   | string  | Atributo pelo qual aplicar a ordenação. Um de: id, date, title. Padrão: date |

### Utilizadores

Esta API suporta a gestão de utilizadores.

#### Propriedades

| Atributo      | Tipo     | Meta           | Descrição                                                               |
| ------------- | -------- | -------------- | ----------------------------------------------------------------------- |
| id            | integer  | Apenas Leitura | Identificador único do artigo.                                          |
| email         | string   | Obrigatório    | Email do utilizador.                                                    |
| name          | string   | Obrigatório    | Nome do utilizador.                                                     |
| status        | string   |                | Estado do utilizador. Um de: active, suspended, inactive Padrão: active |
| date_modified | datetime | Apenas Leitura | Data em que registo foi modificado pela última vez.                     |
| date_created  | datetime | Apenas Leitura | Data em que o registo foi criado.                                       |

#### Endpoints

| Endpoint   | Método | Autenticação | Descrição          |
| ---------- | ------ | ------------ | ------------------ |
| /users/    | Get    | Sim          | Lista Artigos      |
| /users/    | Post   | Sim          | Cria um Artigo     |
| /users/:id | Get    | Sim          | Lê um Artigo       |
| /users/:id | Put    | Sim          | Atualiza um Artigo |
| /users/:id | Del    | Sim          | Apaga um Artigo    |

#### Parâmetros

O endpoint `DEL /users/:id` suporta o seguinte parâmetro:

| Parâmetro | Tipo    | Descrição                               |
| --------- | ------- | --------------------------------------- |
| force     | boolean | Força ou não a destruição de um artigo. |

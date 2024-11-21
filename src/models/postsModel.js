import conectarAoBanco from "../config/dbConfig.js";

// Conecta ao banco de dados MongoDB usando a string de conexão obtida do ambiente.
// Essa string de conexão contém informações como o endereço do banco, nome do usuário e senha.
const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);

// Função assíncrona para buscar todos os posts em um banco de dados.
export async function getTodosPosts() {
  // Seleciona o banco de dados chamado "imersao_instabytes".
  const db = conexao.db("imersao_instabytes");
  // Seleciona a coleção dentro do banco de dados onde os posts estão armazenados.
  const colecao = db.collection("posts");
  // Busca todos os documentos (posts) dentro da coleção e retorna um array com os resultados.
  return colecao.find().toArray();
}

// Função assíncrona para criar um novo post no banco de dados.
export async function criarPost(novoPost) {
  // Seleciona o banco de dados e a coleção onde os posts serão armazenados.
  const db = conexao.db("imersao_instabytes");
  const colecao = db.collection("posts");
  // Insere um novo documento (post) na coleção e retorna um objeto com informações sobre a inserção.
  return colecao.insertOne(novoPost);
}

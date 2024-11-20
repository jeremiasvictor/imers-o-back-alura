import conectarAoBanco from "../config/dbConfig.js";

// Conecta ao banco de dados usando a string de conexão do ambiente
const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);

// Função assíncrona para obter todos os posts
export default async function getTodosPosts() {
  // Seleciona o banco de dados "imersao_instabytes"
  const db = conexao.db("imersao_instabytes");
  // Seleciona a coleção "posts"
  const colecao = db.collection("posts");
  // Busca todos os documentos da coleção e retorna como um array
  return colecao.find().toArray();
}

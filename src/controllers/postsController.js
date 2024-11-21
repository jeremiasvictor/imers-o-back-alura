import { getTodosPosts, criarPost } from "../models/postsModel.js";
import fs from "fs";

// Define a função assíncrona para listar os posts
export async function listarPosts(req, res) {
  // Obtém todos os posts da camada de modelo (postsModel.js)
  const posts = await getTodosPosts();
  // Envia uma resposta HTTP com status 200 (OK) e os posts no formato JSON
  res.status(200).json(posts);
}

export async function postarNovoPost(req, res) {
  const novoPost = req.body; // Obtém os dados do novo post do corpo da requisição
  try {
    // Chama a função criarPost no modelo para inserir o novo post
    const postCriado = await criarPost(novoPost);
    // Envia uma resposta HTTP com status 200 (OK) e o post criado
    res.status(200).json(postCriado);
  } catch (erro) {
    // Caso ocorra um erro, loga o erro no console e envia uma resposta com status 500 (Erro interno do servidor)
    console.error(erro.message);
    res.status(500).json({"Erro":"Falha na requisição"});
  }
}

export async function uploadImagem(req, res) {
  // Cria um objeto com os dados do novo post, incluindo o nome do arquivo da imagem
  const novoPost = {
    descricao: "", // Assumindo que a descrição é opcional
    imgUrl: req.file.originalname,
    alt: "" // Texto alternativo para a imagem
  };

  try {
    // Cria o post no banco de dados
    const postCriado = await criarPost(novoPost);
    // Renomeia o arquivo da imagem para incluir o ID do post
    const imagemAtualizada = `uploads/${postCriado.insertedId}.png`;
    fs.renameSync(req.file.path, imagemAtualizada);
    // Envia uma resposta HTTP com status 200 (OK) e o post criado
    res.status(200).json(postCriado);
  } catch (erro) {
    // Caso ocorra um erro, loga o erro no console e envia uma resposta com status 500 (Erro interno do servidor)
    console.error(erro.message);
    res.status(500).json({"Erro":"Falha na requisição"});
  }
}

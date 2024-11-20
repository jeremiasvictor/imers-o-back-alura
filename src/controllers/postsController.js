import getTodosPosts from "../models/postsModel.js";

// Define a função assíncrona para listar os posts
export async function listarPosts(req, res) {
  // Obtém todos os posts usando a função importada
  const posts = await getTodosPosts();
  // Envia uma resposta HTTP com status 200 (OK) e os posts no formato JSON
  res.status(200).json(posts);
}
